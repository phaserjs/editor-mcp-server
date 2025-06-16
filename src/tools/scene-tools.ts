// Scene

import { z } from "zod";
import { defineTool } from "../utils.js";
import { SceneId } from "../schemas/components.js";
import { GameObjectTypes } from "../schemas/gameobjects.js";
import { PlainObjectTypes } from "../schemas/plainobjects.js";
import { EditableTilemapComponent, EditableTilemapLayerSchema } from "../schemas/tilemap.js";

export function defineSceneTools() {

    defineTool("scene-clear-scene", "Clear the current scene.", {
        ...SceneId()
    });

    defineTool("scene-get-scene-dimension", "Get the dimensions of the current scene.", {
        ...SceneId()
    });

    defineTool("scene-get-screenshot", "Get a screenshot of the scene.", {
        ...SceneId(),
        x: z.number().describe("The x coordinate of the top left corner of the screenshot."),
        y: z.number().describe("The y coordinate of the top left corner of the screenshot."),
        width: z.number().describe("The width of the screenshot."),
        height: z.number().describe("The height of the screenshot."),
    });

    defineTool("scene-get-scene-data", "Get all objects in the current scene, including their properties.", {
        ...SceneId()
    });

    defineTool("scene-move-game-object-in-render-list", "Sort objects in the current scene.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to sort."),
        move: z.enum(["Up", "Down", "Top", "Bottom"]).describe("Move the objects upm down, top, or bottom in the render list."),
    });

    defineTool("scene-delete-game-objects", "Delete the given game objects from the scene.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the game objects to delete.")
    });

    defineTool("scene-move-game-objects-to-parent", "Move the given objects to the given parent.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
        parentId: z.string().optional().describe("The `id` of the parent to move the objects to. If no parent is given, the objects will be moved to the root of the scene."),
    });

    defineTool("scene-pack-objects-in-container", "Create a container to group the given objects. The container and objects are positioned so the container size is minimal.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
    });

    // editable tilemaps tools

    defineTool("scene-add-editable-tilemap-layer", "Add an editable tilemap layer to an editable tilemap. Because the complexity of the editable tilemaps, we provide a couple of dedicated tools. An editable tilemap is different to a Tiled map because all the data can be edited by the user in the scene editor.", {
        ...SceneId(),
        tilemapId: z.string().describe("The `id` of the editable tilemap to add the layer to. An 'editable tilemap' is not the same as a Tiled tilemap."),
        layer: EditableTilemapLayerSchema
    });

    defineTool("scene-write-editable-tilemap-layer-data", "Write part of the tile data of an editable tilemap layer. This is useful to update a layer's data without having to send the whole layer data again.", {
        ...SceneId(),
        layerId: z.string().describe("The `id` of the editable tilemap layer to write to. An editable tilemap layer is also a game object, so you can use the `id` of the EditableLayer game object."),
        data: z.array(z.array(z.number())).describe("The tile data to write to the layer. Each item is a tile ID, or -1 for an empty tile. The tile ID is a global ID that is computed by the index (starting from 1) of the tile in the tileset. If there are more than one tileset, then the global ID is computed by adding the length of each tileset. The data is a 2D array, where each inner array represents a row of tiles."),
        x: z.number().describe("The x coordinate of the top left corner of the data to write."),
        y: z.number().describe("The y coordinate of the top left corner of the data to write."),        
    });

    defineTool("scene-fill-editable-tilemap-layer-data", "Fill a region of the tile data of an editable tilemap layer with a single tile ID. This is useful to do things like clear the layer (fill the full layer with a -1 tile), or to paint backgrounds, filling the layer with the background tile, or filling just a part of the layer like for making a floor, or any other level element.", {
        ...SceneId(),
        layerId: z.string().describe("The `id` of the editable tilemap layer to fill. An editable tilemap layer is also a game object, so you can use the `id` of the EditableLayer game object."),
        x: z.number().describe("The x coordinate of the top left corner of the region to fill."),
        y: z.number().describe("The y coordinate of the top left corner of the region to fill."),
        width: z.number().describe("The width of the region to fill in tiles."),
        height: z.number().describe("The height of the region to fill in tiles."),
        tileId: z.number().describe("The tile ID to fill the region with. The tile ID is a global ID that is computed by the index (starting from 1) of the tile in the tileset. If there are more than one tileset, then the global ID is computed by adding the length of each tileset.")
    });

    defineTool("scene-get-editable-tilemap-layer-selection-data", "Get the selected tile data of an editable tilemap layer. It returns a 2D array with the tile IDs. The selection is always a rectangular region of the tilemap layer.", {
        ...SceneId(),
    });


    // Plain objects tools

    defineTool("scene-delete-plain-objects", "Delete the given plain objects from the scene.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the plain objects to delete.")
    });

    // Define the scene add many game objects tool

    {
        const unionElements_add = GameObjectTypes.filter(t => !t.updateOnly).map((gameObjectType) => {

            return z.object({
                type: z.literal(gameObjectType.type),
                args: z.object({
                    label: z.string().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
                    ...gameObjectType.schema as any
                })
            })
        });

        defineTool("scene-add-game-objects", "Add multiple new game objects to the scene", {
            ...SceneId(),
            objects: z.array(z.discriminatedUnion("type", unionElements_add as any)).describe("The game objects to add to the scene.")
        });

        const unionElements_update = GameObjectTypes.map((gameObjectType) => {

            const type = gameObjectType.type;

            return z.object({
                type: z.literal(type),
                args: z.object({
                    id: z.string().describe(`The \`id\` of the ${type} game object to update.`),
                    label: z.string().optional().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
                    ...gameObjectType.schema as any
                })
            })
        });

        defineTool("scene-update-game-objects", "Update multiple game objects in the scene.", {
            ...SceneId(),
            objects: z.array(z.discriminatedUnion("type", unionElements_update as any)).describe("The game objects to add to the scene.")
        });
    }

    // Define the scene add many plain objects tool

    {
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
}