import { z } from "zod";

// Tiled tilemap schemas

export const TilesetConfig = z.object({
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