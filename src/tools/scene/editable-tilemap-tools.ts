import { z } from "zod";
import { SceneId } from "./common.js";
import { IToolsManager } from "../IToolsManager.js";

const EditableTilesetConfig = z.object({
    name: z.string().describe("The name of the tileset, as it appears in the map data."),
    imageKey: z.string().describe("The key of an asset image or spritesheet to associate with the tileset."),
    tileWidth: z.number().describe("The width of each tile in pixels."),
    tileHeight: z.number().describe("The height of each tile in pixels."),
    tileMargin: z.number().default(0).describe("The margin around each tile in pixels."),
    tileSpacing: z.number().default(0).describe("The spacing between tiles in pixels."),
});

export function defineEditableTilemapTools(manager: IToolsManager) {

    manager.defineTool("scene-add-editable-tilemap", "Add an editable tilemap to the scene. An editable tilemap is different to a Tiled map because all the data can be edited by the user in the scene editor. However, it follows many of the concepts of Tiled. The editable tilemap is also a plain object so you can manipulate it using most of the plain object tools.", {
        ...SceneId(),
        label: z.string().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
        width: z.number().describe("The width of the editable tilemap in tiles."),
        height: z.number().describe("The height of the editable tilemap in tiles."),
        tileWidth: z.number().describe("The width of each tile in pixels."),
        tileHeight: z.number().describe("The height of each tile in pixels."),
        tilesets: z.array(EditableTilesetConfig).describe("The tilesets used by the tilemap."),
    });

    manager.defineTool("scene-add-tileset-to-editable-tilemap", "Add a tileset to an editable tilemap. This will add the tileset to the tilemap data, but it will not add the tileset asset itself. It also will update the ID of the tiles of every layer in the map.", {
        ...SceneId(),
        tilemapId: z.string().describe("The `id` of the editable tilemap to add the tileset to."),
        tileset: z.object({
            imageKey: z.string().describe("The key of an asset image or spritesheet to associate with the tileset."),
        })
    });

    manager.defineTool("scene-delete-tileset-from-editable-tilemap", "Delete a tileset from an editable tilemap. This will remove the tileset from the tilemap data, but it will not delete the tileset asset itself. It also will update the ID of the tiles of every layer in the map.", {
        ...SceneId(),
        tilemapId: z.string().describe("The `id` of the editable tilemap to delete the tileset from. An 'editable tilemap' is not the same as a Tiled tilemap."),
        tilesetName: z.string().describe("The name of the tileset to delete from the editable tilemap. This should match the name defined in the tilemap's tilesets."),
    });

    manager.defineTool("scene-add-editable-tilemap-layer", "Add an editable tilemap layer to an editable tilemap. Because the complexity of the editable tilemaps, we provide a couple of dedicated tools. An editable tilemap is different to a Tiled map because all the data can be edited by the user in the scene editor. This method adds a layer to the tilemap data but also it adds an EditableLayer game object to the scene.", {
        ...SceneId(),
        tilemapId: z.string().describe("The `id` of the editable tilemap to add the layer to. An 'editable tilemap' is not the same as a Tiled tilemap."),
        layer: z.object({
            name: z.string().describe("The name of the layer in the editable tilemap. The name is also used to generate a variable name in code, so it should be a valid variable name."),
            width: z.number().describe("The width of the layer in tiles."),
            height: z.number().describe("The height of the layer in tiles."),
            tileWidth: z.number().describe("The width of each tile in pixels."),
            tileHeight: z.number().describe("The height of each tile in pixels."),
        })
    });

    manager.defineTool("scene-resize-editable-tilemap-layer", "Resize an editable tilemap layer. This will resize the layer data, but it will not resize the layer game object itself. It also will update the ID of the tiles of every layer in the map.", {
        ...SceneId(),
        layerId: z.string().describe("The `id` of the editable tilemap layer to resize. An editable tilemap layer is also a game object, so you can use the `id` of the EditableLayer game object."),
        width: z.number().describe("The new width of the layer in tiles."),
        height: z.number().describe("The new height of the layer in tiles.")
    });

    manager.defineTool("scene-write-editable-tilemap-layer-data", "Write part of the tile data of an editable tilemap layer. This is useful to update a layer's data without having to send the whole layer data again.", {
        ...SceneId(),
        layerId: z.string().describe("The `id` of the editable tilemap layer to write to. An editable tilemap layer is also a game object, so you can use the `id` of the EditableLayer game object."),
        data: z.array(z.array(z.number())).describe("The tile data to write to the layer. Each item is a tile ID, or -1 for an empty tile. The tile ID is a global ID that is computed by the index (starting from 1) of the tile in the tileset. If there are more than one tileset, then the global ID is computed by adding the length of each tileset. The data is a 2D array, where each inner array represents a row of tiles."),
        x: z.number().describe("The x coordinate of the top left corner of the data to write."),
        y: z.number().describe("The y coordinate of the top left corner of the data to write."),
    });

    manager.defineTool("scene-fill-editable-tilemap-layer-data", "Fill a region of the tile data of an editable tilemap layer with a single tile ID. This is useful to do things like clear the layer (fill the full layer with a -1 tile), or to paint backgrounds, filling the layer with the background tile, or filling just a part of the layer like for making a floor, or any other level element.", {
        ...SceneId(),
        layerId: z.string().describe("The `id` of the editable tilemap layer to fill. An editable tilemap layer is also a game object, so you can use the `id` of the EditableLayer game object."),
        x: z.number().describe("The x coordinate of the top left corner of the region to fill."),
        y: z.number().describe("The y coordinate of the top left corner of the region to fill."),
        width: z.number().describe("The width of the region to fill in tiles."),
        height: z.number().describe("The height of the region to fill in tiles."),
        tileId: z.number().describe("The tile ID to fill the region with. The tile ID is a global ID that is computed by the index (starting from 1) of the tile in the tileset. If there are more than one tileset, then the global ID is computed by adding the length of each tileset.")
    });

    manager.defineTool("scene-get-editable-tilemap-layer-selection-data", "Get the selected tile data of an editable tilemap layer. It returns a 2D array with the tile IDs. The selection is always a rectangular region of the tilemap layer.", {
        ...SceneId(),
    });
}