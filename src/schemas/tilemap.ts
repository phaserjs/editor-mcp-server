import { z } from "zod";

// Tiled tilemap schemas

const TilesetConfig = z.object({
    name: z.string().describe("The name of the tileset, as it appears in the map data."),
    imageKey: z.string().describe("The key of an asset image or spritesheet to associate with the tileset."),
});

export function TilemapComponent() {

    return {
        key: z.string().describe("The key of the tilemap."),
        tilesets: z.array(TilesetConfig).describe("The tilesets used by the tilemap."),
    };
}

export function TilemapLayerComponent() {

    return {
        tilemapId: z.string().describe("The `id` of the Tiled tilemap this layer belongs to. There are two type of tilemaps: Tiled tilemaps and EditableTilemaps. This is the `id` of the Tiled tilemap."),
        layerName: z.string().describe("The name of the layer in the Tiled tilemap."),
        tilesets: z.array(z.string()).describe("The name of the tilesets used by this layer. These should match the names defined in the tilemap's tilesets."),
    };
}

// Editable tilemap schemas

export function EditableTilemapLayerComponent() {

    return {
        tilemapId: z.string().describe("The `id` of the EditableTilemap this layer belongs to. There are two type of tilemaps: Tiled tilemaps and EditableTilemaps. This is the `id` of the EditableTilemap."),        
    };
}

export const EditableTilemapLayerSchema = z.object({
    name: z.string().describe("The name of the layer in the editable tilemap. It will be always the same of the label of the EditableLayer game object. The name is also used to generate a variable name in code, so it should be a valid variable name."),
    data: z.array(z.array(z.number())).describe("The tile data of the layer. Each item is a tile ID, or -1 for an empty tile. The tile ID is a global ID that is computed by the index (starting from 1) of the tile in the tileset. If there are more than one tileset, then the global ID is computed by adding the length of each tileset."),
    width: z.number().describe("The width of the layer in tiles."),
    height: z.number().describe("The height of the layer in tiles."),
    tileWidth: z.number().describe("The width of each tile in pixels."),
    tileHeight: z.number().describe("The height of each tile in pixels."),
});

const EditableTilesetConfig = z.object({
    name: z.string().describe("The name of the tileset, as it appears in the map data."),
    imageKey: z.string().describe("The key of an asset image or spritesheet to associate with the tileset."),
    tileWidth: z.number().describe("The width of each tile in pixels."),
    tileHeight: z.number().describe("The height of each tile in pixels."),
    tileMargin: z.number().default(0).describe("The margin around each tile in pixels."),
    tileSpacing: z.number().default(0).describe("The spacing between tiles in pixels."),
});

export function EditableTilemapComponent() {

    return {
        width: z.number().describe("The width of the editable tilemap in tiles."),
        height: z.number().describe("The height of the editable tilemap in tiles."),
        tileWidth: z.number().describe("The width of each tile in pixels."),
        tileHeight: z.number().describe("The height of each tile in pixels."),
        tilesets: z.array(EditableTilesetConfig).describe("The tilesets used by the editable tilemap."),
    };
}