import z from "zod";
import { defineTool } from "../../utils.js";
import { SceneId } from "./common.js";
import { TilemapComponent } from "./tilemap.js";
import { ColliderComponent } from "./arcade.js";

export const PlainObjectTypes = [
    {
        type: "Tilemap",
        schema: {
            ...TilemapComponent()
        }
    }, {
        type: "Collider",
        schema: {
            ...ColliderComponent()
        }
    }
];

export function definePlainObjectTools() {

    defineTool("scene-delete-plain-objects", "Delete the given plain objects from the scene. Plain objects are Tilemap, Key, Collider...", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the plain objects to delete.")
    });

    const unionElements_add = PlainObjectTypes.map((plainObjectType) => {

        return z.object({
            type: z.literal(plainObjectType.type),
            args: z.object({
                label: z.string().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
                ...plainObjectType.schema as any
            })
        })
    });

    defineTool("scene-add-plain-objects", "Add multiple new plain objects to the scene", {
        ...SceneId(),
        objects: z.array(z.discriminatedUnion("type", unionElements_add as any)).describe("The plain objects to add to the scene.")
    });

    const unionElements_update = PlainObjectTypes.map((plainObjectType) => {

        const type = plainObjectType.type;

        return z.object({
            type: z.literal(type),
            args: z.object({
                id: z.string().describe(`The \`id\` of the ${type} plain object to update.`),
                label: z.string().optional().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
                ...plainObjectType.schema as any
            })
        })
    });

    defineTool("scene-update-plain-objects", "Update multiple plain objects in the scene.", {
        ...SceneId(),
        objects: z.array(z.discriminatedUnion("type", unionElements_update as any)).describe("The plain objects to add to the scene.")
    });
}