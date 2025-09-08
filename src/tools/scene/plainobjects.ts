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

    const TYPES = PlainObjectTypes.map(po => po.type) as any;

    defineTool(`scene-add-plain-objects`, `Add multiple new plain objects to the scene.`, {
        ...SceneId(),
        objects: z.array(z.object({
            type: z.enum(TYPES),
            properties: z.record(z.any()).describe("The properties of the plain object to add. You should provide all the required properties for creating the object. The required properties are part of the class constructor of the object class defined in the system prompt. You can provide a subset of the optional properties plus the required properties."),
        }))
    },
        z.object({
            ...SceneId(),
            objects: z.array(
                z.discriminatedUnion("type",
                    PlainObjectTypes.map(po => z.object({
                        type: z.literal(po.type),
                        properties: z.object(po.schema)
                    })) as any))
        }));

    defineTool(`scene-update-plain-objects`, `Update multiple plain objects in the scene.`, {
        ...SceneId(),
        objects: z.array(z.object({
            type: z.enum(TYPES), // for validation only
            id: z.string().describe("The `id` of the object to update."),
            properties: z.record(z.any()).describe("The properties of the plain object to add. You should provide all the required properties for creating the object. The required properties are part of the class constructor of the object class defined in the system prompt. You can provide a subset of the optional properties plus the required properties."),
        }))
    },
        z.object({
            ...SceneId(),
            objects: z.array(
                z.discriminatedUnion("type",
                    PlainObjectTypes.map(go => z.object({
                        type: z.literal(go.type),
                        id: z.string(),
                        properties: z.object(go.schema)
                    })) as any))
        }));
}