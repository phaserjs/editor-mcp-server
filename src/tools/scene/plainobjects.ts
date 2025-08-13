import { TilemapComponent } from "./tilemap.js";

export const PlainObjectTypes = [
    {
        type: "Tilemap",
        schema: {
            ...TilemapComponent()
        }
    }
];