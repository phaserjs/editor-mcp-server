import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z, { ZodRawShape } from "zod";
import { sendRequestToPhaserEditor } from "./bridge.js";
import packageJson from "../package.json" with { type: "json" };
import { SceneId } from "./schemas/components.js";

const title = `Phaser Editor MCP Server v${packageJson.version}`;

export let mcpServer = new McpServer({
    title,
    name: "phaser-editor-mcp",
    version: packageJson.version,
}, {
    capabilities: {
        tools: {}
    },
    instructions: "The Phaser Editor MCP server exposes a set of tools for automating and extending Phaser Editor v5 through the Model Context Protocol (MCP). To use these tools, ensure Phaser Editor is running and accessible. This server enables integration with LLMs and external clients, allowing you to query, modify, and automate game scenes, assets, tilemaps, and more directly from your MCP-compatible environment.",
});

export async function startServer() {

    const transport = new StdioServerTransport();

    await mcpServer.connect(transport);

    console.error(`${title} running on stdio`);
}

export function defineTool(name: string, description: string, args: ZodRawShape) {

    return mcpServer.tool(name, description, args, async args => {

        const response = await sendRequestToPhaserEditor({
            tool: name,
            args
        });

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
            objectId: z.string().describe("The ID of the game object to update hit area properties for."),
            props: z.object(props).describe(`The properties to set on the ${componentDisplayName}.`),
        }))
    });
}