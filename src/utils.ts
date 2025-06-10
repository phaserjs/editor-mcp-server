import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ZodRawShape } from "zod";
import { sendRequestToPhaserEditor } from "./bridge.js";

export let mcpServer = new McpServer({
    name: "phaser-editor-mcp",
    version: "1.0.0",
    capabilities: {
        tools: {},
    },
}, {
    instructions: "TODO: add instructions",
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