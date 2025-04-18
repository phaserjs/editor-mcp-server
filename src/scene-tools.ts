// Scene

import { z, ZodRawShape } from "zod";
import { defineTool } from "./utils.js";
import { GameObjectTypes } from "./gameobjects.js";
import { defineAssetTools } from "./assets-tools.js";

export function defineSceneTools() {

    defineTool("scene-clear-scene", "Clear the current scene.", {
        sceneId: z.string().describe("The `id` of the scene")
    });

    defineTool("scene-get-scene-dimension", "Get the dimensions of the current scene.", {
        sceneId: z.string().describe("The `id` of the scene")
    });

    defineTool("scene-get-screenshot", "Get a screenshot of the scene.", {
        sceneId: z.string().describe("The `id` of the scene"),
        x: z.number().describe("The x coordinate of the top left corner of the screenshot."),
        y: z.number().describe("The y coordinate of the top left corner of the screenshot."),
        width: z.number().describe("The width of the screenshot."),
        height: z.number().describe("The height of the screenshot."),
    });

    defineTool("scene-get-scene-data", "Get all objects in the current scene, including their properties.", {
        sceneId: z.string().describe("The `id` of the scene")
    });

    defineTool("scene-move-object-in-render-list", "Sort objects in the current scene.", {
        sceneId: z.string().describe("The `id` of the scene"),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to sort."),
        move: z.enum(["Up", "Down", "Top", "Bottom"]).describe("Move the objects upm down, top, or bottom in the render list."),
    });

    defineTool("scene-delete-objects", "Delete the given objects from the scene.", {
        sceneId: z.string().describe("The `id` of the scene"),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to delete.")
    });

    defineTool("scene-move-objects-to-parent", "Move the given objects to the given parent.", {
        sceneId: z.string().describe("The `id` of the scene"),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
        parentId: z.string().optional().describe("The `id` of the parent to move the objects to. If no parent is given, the objects will be moved to the root of the scene."),
    });

    defineTool("scene-pack-objects-in-container", "Create a container to group the given objects. The container and objects are positioned so the container size is minimal.", {
        sceneId: z.string().describe("The `id` of the scene"),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
    });

    // Define the scene add many game objects tool

    {
        const unionElements_add = GameObjectTypes.map((gameObjectType) => {

            return z.object({
                type: z.literal(gameObjectType.type),
                args: z.object({
                    label: z.string().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
                    ...gameObjectType.schema
                })
            })
        });

        defineTool("scene-add-objects", "Add multiple new game objects to the scene", {
            sceneId: z.string().describe("The `id` of the scene"),
            objects: z.array(z.discriminatedUnion("type", unionElements_add as any)).describe("The game objects to add to the scene.")
        });

        const unionElements_update = GameObjectTypes.map((gameObjectType) => {

            const type = gameObjectType.type;

            return z.object({
                type: z.literal(type),
                args: z.object({
                    id: z.string().describe(`The \`id\` of the ${type} game object to update.`),
                    label: z.string().optional().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
                    ...gameObjectType.schema
                })
            })
        });

        defineTool("scene-update-objects", "Update multiple game objects in the scene.", {
            sceneId: z.string().describe("The `id` of the scene"),
            objects: z.array(z.discriminatedUnion("type", unionElements_update as any)).describe("The game objects to add to the scene.")
        });
    }
}