import { z } from "zod";
import { defineTool } from "../utils.js";
import { TextureComponent } from "./scene/common.js";

export function defineAssetTools() {

    defineTool("assets-get-available-asset-packs", "Get all available asset packs in the project. An asset pack is a collection of assets, like images, audio files, and other resources that can be used in the game. The asset pack contains information like the key of the assets, the url to the file, and other parameters.", {});

    defineTool("assets-get-available-textures", "Get all available textures in the project. It includes the name of the texture and the size.", {});

    defineTool("assets-get-texture-binary", "Get the size of the texture. If you need to get the real size of the object inside the texture (without the transparent margin), then you can use the `assets-get-texture-content-bounding-box` tool.", {
        ...TextureComponent()
    });

     defineTool("assets-get-texture-size", "Get the binary data of a texture.", {
        ...TextureComponent()
    });

    defineTool("assets-get-available-bitmapfonts", "Get all available bitmap fonts in the project.", {});

    defineTool("assets-get-bitmapfont-image", "Get the PNG image/texture of the given bitmap font.", {
        key: z.string().describe("The key of the bitmap font."),
    });

    defineTool("assets-get-spritesheet-image", "Get the PNG image/texture of the given spritesheet. You can use this tool to get a better understanding of the position of tiles/frames.", {
        key: z.string().describe("The key of the bitmap font."),
    });

    defineTool("assets-get-texture-content-bounding-box", "Get the bounding box of the content of the given texture. Many textures has transparent padding but we need the exact offset and size of the content/object of the texture to place them in the right positions in the scene. Like when placing different objects one next to the other, with touching edges. If you need to know the size of the whole image, use the `assets-get-texture-size` tool.", {
        ...TextureComponent()
    });

    defineTool("assets-get-available-animations", "Get all available sprite animations in the project.", {});

    defineTool("assets-get-available-spine-skeletons", "Get the all the Spine skeletons in the project. It only returns the key of the skeleton.", {});
    
    defineTool("assets-get-available-spine-atlases", "Get the all the Spine atlases in the project.", {});

    defineTool("assets-get-spine-skeleton-info", "Get the skeleton info (animations and skins) of the given Spine skeleton key. To build the info of a skeleton it requires also the Spine atlas key. The user can select a different atlas key, but it is common that the user also define a 'preview' atlas key for each skeleton. You can use it if it exists or ask for a different atlas key to the user.", {
        dataKey: z.string().describe("The key of the spine data (skeleton) asset."),
        atlasKey: z.string().describe("The key of the spine atlas asset."),
    });

    defineTool("assets-get-spine-skin-image", "Get the PNG image of the given Spine skin. You can use this tool to get a better understanding of the appearance of a Spine skeleton with a given skin. The image may be scaled or not. You can the skeleton data to get more info about the size of a skeleton.", {
        dataKey: z.string().describe("The key of the spine data (skeleton) asset."),
        atlasKey: z.string().describe("The key of the spine atlas asset."),
        skinName: z.string().describe("The name of the skin to use. A skeleton can have multiple skins."),
        animationName: z.string().describe("The name of the animation to use. A skeleton can have multiple animations."),
    });

    defineTool("assets-get-available-tilemaps", "Search for the available Tiled tilemap files in the asset packs and return the list of tilemap keys. A Tiled tilemap file contains the data of a tilemap. It is used by the scene editor to create the Tilemap and TilemapLayer objects. These maps are created by the third party tool Tiled. Like the other assets in the asset packs, Phaser Editor uses the tilemap key to identify the tilemap.", {});

    defineTool("assets-get-tilemap-data", "Get the data of a Tiled tilemap file. It returns the data of the tilemap, including the layers, tilesets, and objects. The data is used by the scene editor to create the Tilemap and TilemapLayer objects.", {
        key: z.string().describe("The key of the file in the asset pack. The key is used by the scene editor to create Tilemap objects."),
    });
}