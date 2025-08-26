import { env } from "process";

const BRIDGE_PORT = 1902;

export async function sendRequestToPhaserEditor(data: any) {

    // make POST http request to http://127.0.0.1:1902 and get JSON response with data as body

    // get hostname from args 0
    const hostname = env["phaser-editor-mcp-hostname"] || "127.0.0.1";
    const port = env["phaser-editor-mcp-port"] || BRIDGE_PORT;

    try {

        const response = await fetch(`http://${hostname}:${port}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        return result;

    } catch (e) {

        return {
            error: `Could not connect to Phaser Editor at http://${hostname}:${BRIDGE_PORT}. Ensure Phaser Editor is running and the MCP Bridge is enabled in the settings.`,
            details: (e as Error).message
        }
    }
}