import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";
import { sendRequestToPhaserEditor } from "./bridge.js";
import packageJson from "../package.json" with { type: "json" };
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import { IToolsManager } from "./tools/IToolsManager.js";

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


    const text1 = readFileSync(
        join(dirname(__filename), "tools/prompts/system.md"), "utf-8");

    const text2 = readFileSync(
        join(dirname(__filename), "tools/prompts/tools.md"), "utf-8");

    return {
        content: [
            { type: "text", text: `${text1}\n${text2}` }
        ],
    }
});

export async function startServer() {

    const transport = new StdioServerTransport();

    await mcpServer.connect(transport);

    console.error(`${title} running on stdio`);
}

export class ToolsManager implements IToolsManager {

    defineTool(name: string, description: string, args: z.ZodRawShape, validator?: z.Schema): void {

        mcpServer.tool(name, description, args, async input => {

            let response: any;

            if (validator) {

                const { error } = validator.safeParse(input);

                if (error) {

                    const issues = error.issues.map((issue) => `- [path=${issue.path}] [${issue.code}]: ${issue.message}`).join("\n");

                    response = [{
                        type: "text",
                        text: `Tool '${name}' validation error:\n${issues}\nPlease fix the input and try again.`
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

}
