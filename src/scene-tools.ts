// Scene

import { z, ZodRawShape } from "zod";
import { defineTool } from "./utils.js";
import { BitmapTextComponent, SpriteComponent, TextComponent, TextureComponent, TileSpriteComponent, TransformComponent } from "./components.js";

export function defineSceneTools() {

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

    defineTool("scene-move-objects-to-parent", "Move the given objects to the given parent.", {
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
        parentId: z.string().optional().describe("The `id` of the parent to move the objects to. If no parent is given, the objects will be moved to the root of the scene."),
    });

    defineTool("scene-pack-objects-in-container", "Create a container to group the given objects. The container and objects are positioned so the container size is minimal.", {
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
    });

    // Game Objects

    defineGameObjectTool("image", {
        ...TransformComponent(),
        ...TextureComponent(),
    });

    defineGameObjectTool("sprite", {
        ...TransformComponent(),
        ...TextureComponent(),
        ...SpriteComponent()
    });

    defineGameObjectTool("tilesprite", {
        ...TransformComponent(),
        ...TextureComponent(),
        ...TileSpriteComponent()
    });

    defineGameObjectTool("text", {
        ...TransformComponent(),
        ...TextComponent(),
    });

    defineGameObjectTool("layer", {
        ...TransformComponent(),
    });

    defineGameObjectTool("container", {
        ...TransformComponent(),
    });

    defineGameObjectTool("bitmaptext", {
        ...TransformComponent(),
        ...BitmapTextComponent(),
    });

    function defineGameObjectTool(name: string, args: ZodRawShape) {

        defineTool(`scene-add-${name}`, `Add a new ${name} game object to the scene.`, {
            label: z.string().describe("Label of the image. It is used to identify the image in the scene and in code."),
            ...args
        });

        defineTool(`scene-update-${name}`, `Update the given ${name} game object in the scene.`, {
            id: z.string().describe(`The \`id\` of the ${name} game object to update.`),
            label: z.string().optional().describe("Label of the image. It is used to identify the image in the scene and in code."),
            ...args
        });
    }
}