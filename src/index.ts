import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z, ZodRawShape } from "zod";
import { sendRequestToPhaserEditor } from "./bridge.js";
import { GameObjectComponent, TextureComponent, TransformComponent } from "./components.js";

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

defineTool("scene-get-scene-data", "Get all objects in the current scene, including their properties.", {});

defineTool("scene-move-object-in-render-list", "Sort objects in the current scene.", {
    objectIds: z.array(z.string()).describe("The `id`s of the objects to sort."),
    move: z.enum(["Up", "Down", "Top", "Bottom"]).describe("Move the objects upm down, top, or bottom in the render list."),
});

// TODO: maybe we don't need this since we provide the tool to get all the objects in the scene
// defineTool("scene-get-object-properties", "Get properties of the given object.", {});

defineTool("scene-add-image", "Add image to the current scene", {
    ...GameObjectComponent(),
    ...TransformComponent(),
    ...TextureComponent(),
});

defineTool("scene-update-image", "Set properties of an image in the current scene", {
    id: z.string().describe("The `id` of the image to update."),
    ...GameObjectComponent(),
    ...TransformComponent(),
    ...TextureComponent(),
});

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

// server.tool("make-rectangle-shape", "Make a rectangle shape with Phaser Editor", {
//     x: z.number().describe("X position of the rectangle"),
//     y: z.number().describe("Y position of the rectangle"),
//     width: z.number().describe("Width of the rectangle"),
//     height: z.number().describe("Height of the rectangle"),
//     color: z.string().describe("Color of the rectangle. The color is in css hex format. For example: #FF0000"),
// }, async (args) => {

//     return {
//         content: [
//             {
//                 type: "text",
//                 text: `this.add.rectangle(${args.width}, ${args.height}, "${args.color}")`,
//             }
//         ]
//     };
// });

// server.prompt("my-prompt-make-a-rect", "Make a rectangle shape with Phaser Editor, with an horizontal or vertical orientation", {
//     orientation: z.enum(["horizontal", "vertical"]).describe("Orientation of the rectangle. It could be 'horizontal' or 'vertical'"),
// }, async (args) => {

//     const width = args.orientation === "horizontal" ? 100 : 50;
//     const height = args.orientation === "horizontal" ? 50 : 100;

//     return {
//         messages: [
//             {
//                 role: "assistant",
//                 content: {
//                     type: "text",
//                     text: `Create a rectangle with width ${width} and height ${height}`,
//                 }
//             }
//         ]
//     };
// });

async function main() {

    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error("Phaser Editor MCP Server running on stdio");
}

main().catch((error) => {

    console.error("Fatal error in main():", error);

    process.exit(1);
});