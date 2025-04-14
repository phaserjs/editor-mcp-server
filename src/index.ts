import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z, ZodRawShape } from "zod";
import { sendRequestToPhaserEditor } from "./bridge.js";
import { GameObjectComponent, TextComponent, TextureComponent, TransformComponent } from "./components.js";

// Create server instance
const server = new McpServer({
    name: "phaser-editor-mcp",
    version: "1.0.0",
    capabilities: {
        prompts: {},
        resources: {},
        tools: {},
    },
});

defineTool("project-get-available-textures", "Get all available textures in the project.", {});

defineTool("project-get-texture-binary", "Get the binary data of a texture.", {
    ...TextureComponent()
});

defineTool("scene-get-scene-dimension", "Get the dimensions of the current scene.", {});

defineTool("scene-get-screenshot", "Get a screenshot of the scene.", {
    x: z.number().describe("The x coordinate of the top left corner of the screenshot."),
    y: z.number().describe("The y coordinate of the top left corner of the screenshot."),
    width: z.number().describe("The width of the screenshot."),
    height: z.number().describe("The height of the screenshot."),
});

defineTool("scene-get-scene-data", "Get all objects in the current scene, including their properties.", {});

defineTool("scene-move-object-in-render-list", "Sort objects in the current scene.", {
    objectIds: z.array(z.string()).describe("The `id`s of the objects to sort."),
    move: z.enum(["Up", "Down", "Top", "Bottom"]).describe("Move the objects upm down, top, or bottom in the render list."),
});

defineTool("scene-delete-objects", "Delete the given objects from the scene.", {
    objectIds: z.array(z.string()).describe("The `id`s of the objects to delete.")
});

// Game Objects

defineGameObjectTool("image", {
    ...GameObjectComponent(),
    ...TransformComponent(),
    ...TextureComponent(),
});

defineGameObjectTool("text", {
    ...GameObjectComponent(),
    ...TransformComponent(),
    ...TextComponent(),
});

defineGameObjectTool("layer", {
    ...GameObjectComponent(),
    ...TransformComponent(),
});

defineGameObjectTool("container", {
    ...GameObjectComponent(),
    ...TransformComponent(),
});

function defineGameObjectTool(name: string, args: ZodRawShape) {

    defineTool(`scene-add-${name}`, `Add a new ${name} game object to the scene.`, args);

    defineTool(`scene-update-${name}`, `Update the given ${name} game object in the scene.`, {
        id: z.string().describe(`The \`id\` of the ${name} game object to update.`),
        ...args
    });
}

function defineTool(name: string, description: string, args: ZodRawShape) {

    return server.tool(name, description, args, async args => {

        const response = await sendRequestToPhaserEditor({
            tool: name,
            args
        });

        return {
            content: response
        };
    });
}

async function main() {

    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error("Phaser Editor MCP Server running on stdio");
}

main().catch((error) => {

    console.error("Fatal error in main():", error);

    process.exit(1);
});