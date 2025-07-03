import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ZodRawShape } from "zod";
import { sendRequestToPhaserEditor } from "./bridge.js";

export let mcpServer = new McpServer({
    title: "Phaser Editor MCP Server",
    name: "phaser-editor-mcp",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {}
    },
    instructions: "The Phaser Editor MCP server exposes a set of tools for automating and extending Phaser Editor v5 through the Model Context Protocol (MCP). To use these tools, ensure Phaser Editor is running and accessible. This server enables integration with LLMs and external clients, allowing you to query, modify, and automate game scenes, assets, tilemaps, and more directly from your MCP-compatible environment.",
});

export async function startServer() {

    const transport = new StdioServerTransport();

    await mcpServer.connect(transport);

    console.error("Phaser Editor MCP Server running on stdio");
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