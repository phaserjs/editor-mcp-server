import z from "zod";
import { LabelComponent, SceneId, VariableComponent } from "./common.js";
import { TilemapComponent } from "./tilemap.js";
import { ColliderComponent } from "./arcade.js";
import { IToolsManager } from "../IToolsManager.js";

export const PlainObjectTypes = [
    {
        type: "Tilemap",
        schema: {
            ...VariableComponent(),
            ...TilemapComponent()
        }
    }, {
        type: "Collider",
        schema: {
            ...VariableComponent(),
            ...ColliderComponent()
        }
    }
];

export function definePlainObjectTools(manager: IToolsManager) {

    manager.defineTool("scene-delete-plain-objects", "Delete the given plain objects from the scene. Plain objects are Tilemap, Key, Collider...", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the plain objects to delete.")
    });

    const TYPES = PlainObjectTypes.map(po => po.type) as any;

    manager.defineTool(`scene-add-plain-objects`, `Add multiple new plain objects to the scene.`, {
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
                        properties: z.object({
                            ...LabelComponent("required"),
                            ...po.schema
                        })
                    })) as any))
        }));

    manager.defineTool(`scene-update-plain-objects`, `Update multiple plain objects in the scene.`, {
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
                        properties: z.object(
                            {
                                ...LabelComponent("optional"),
                                ...go.schema
                            })
                    })) as any))
        }));
}