import { EditableTilemapComponent, TilemapComponent } from "./tilemap.js";

export const PlainObjectTypes = [
    {
        type: "Tilemap",
        schema: {
            ...TilemapComponent()
        }
    },
    {
        type: "EditableTilemap",
        schema: {
            ...EditableTilemapComponent()
        }
    }
];