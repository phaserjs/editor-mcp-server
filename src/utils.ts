import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z, { ZodRawShape } from "zod";
import { sendRequestToPhaserEditor } from "./bridge.js";
import packageJson from "../package.json" with { type: "json" };
import { SceneId } from "./tools/scene/common.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const title = `Phaser Editor MCP Server v${packageJson.version}`;

export let mcpServer = new McpServer({
    title,
    name: "phaser-editor-mcp",
    version: packageJson.version,
}, {
    capabilities: {
        tools: {},
    },
    instructions: "The Phaser Editor MCP server exposes a set of tools for automating and extending Phaser Editor v5 through the Model Context Protocol (MCP). To use these tools, ensure Phaser Editor is running and accessible. This server enables integration with LLMs and external clients, allowing you to query, modify, and automate game scenes, assets, tilemaps, and more directly from your MCP-compatible environment.",
});

mcpServer.tool("get-system-instructions", "Get the system instructions. This is fully required for the LLM to know how to build the arguments of this MCP server tools. Tools like `scene-add-game-objects`, `scene-update-game-objects`, `scene-add-game-object-filters`, `scene-update-game-object-filters`, `scene-add-plain-objects`, and `scene-update-plain-objects` requires that the LLM get the system instructions first to know the tool arguments structure.", () => {

    const __filename = fileURLToPath(import.meta.url);

    const file = join(dirname(__filename), "system-prompt.md");

    const text = readFileSync(file, "utf-8");

    return {
        content: [
            { type: "text", text }
        ],
    }
});

export async function startServer() {

    const transport = new StdioServerTransport();

    await mcpServer.connect(transport);

    console.error(`${title} running on stdio`);
}

export function defineTool(name: string, description: string, args: ZodRawShape, validator?: z.Schema) {

    return mcpServer.tool(name, description, args, async input => {

        let response: any;

        if (validator) {

            const { error } = validator.safeParse(input);

            if (error) {

                const issues = error.issues.map((issue) => `- [path=${issue.path}] [${issue.code}]: ${issue.message}`).join("\n");

                response = [{
                    type: "text",
                    content: `Tool '${name}' validation error:\n${issues}\nPlease fix the input and try again.`,
                }];
            }
        }

        if (!response) {

            response = await sendRequestToPhaserEditor({
                tool: name,
                args: input
            });
        }

        return {
            content: response
        };
    });
}

export function defineUpdatePropertiesTool(componentName: string, componentDisplayName: string, props: any) {

    defineTool(`scene-update-game-object-${componentName}`,
        `Update the ${componentDisplayName} properties of the given game objects.`, {
        ...SceneId(),
        updates: z.array(z.object({
            objectId: z.string().describe("The ID of the game object to update properties for."),
            props: z.object(props).describe(`The properties to set on the ${componentDisplayName}.`),
        }))
    });
}