import { z } from "zod";
import { TextureComponent } from "../scene/common.js";
import { IToolsManager } from "../IToolsManager.js";

export function defineAssetTools(manager: IToolsManager) {

    manager.defineTool("assets-get-available-asset-packs", "Get all available asset packs in the project. An asset pack is a collection of assets, like images, audio files, and other resources that can be used in the game. The asset pack contains information like the key of the assets, the url to the file, and other parameters.", {});

    manager.defineTool("assets-get-available-textures", "Get all available textures in the project. It includes the name of the texture and the size.", {});

    manager.defineTool("assets-get-texture-binary", "Get the size of the texture. If you need to get the real size of the object inside the texture (without the transparent margin), then you can use the `assets-get-texture-content-bounding-box` tool.", {
        ...TextureComponent()
    });

    manager.defineTool("assets-get-texture-size", "Get the binary data of a texture.", {
        ...TextureComponent()
    });

    manager.defineTool("assets-get-available-bitmapfonts", "Get all available bitmap fonts in the project.", {});

    manager.defineTool("assets-get-bitmapfont-image", "Get the PNG image/texture of the given bitmap font.", {
        key: z.string().describe("The key of the bitmap font."),
    });

    manager.defineTool("assets-get-spritesheet-image", "Get the PNG image/texture of the given spritesheet. You can use this tool to get a better understanding of the position of tiles/frames.", {
        key: z.string().describe("The key of the bitmap font."),
    });

    manager.defineTool("assets-get-texture-content-bounding-box", "Get the bounding box of the content of the given texture. Many textures has transparent padding but we need the exact offset and size of the content/object of the texture to place them in the right positions in the scene. Like when placing different objects one next to the other, with touching edges. If you need to know the size of the whole image, use the `assets-get-texture-size` tool.", {
        ...TextureComponent()
    });

    manager.defineTool("assets-get-available-animations", "Get all available sprite animations in the project.", {});

    manager.defineTool("assets-get-available-spine-skeletons", "Get the all the Spine skeletons in the project. It only returns the key of the skeleton.", {});

    manager.defineTool("assets-get-available-spine-atlases", "Get the all the Spine atlases in the project.", {});

    manager.defineTool("assets-get-spine-skeleton-info", "Get the skeleton info (animations and skins) of the given Spine skeleton key. To build the info of a skeleton it requires also the Spine atlas key. The user can select a different atlas key, but it is common that the user also define a 'preview' atlas key for each skeleton. You can use it if it exists or ask for a different atlas key to the user.", {
        dataKey: z.string().describe("The key of the spine data (skeleton) asset."),
        atlasKey: z.string().describe("The key of the spine atlas asset."),
    });

    manager.defineTool("assets-get-spine-skin-image", "Get the PNG image of the given Spine skin. You can use this tool to get a better understanding of the appearance of a Spine skeleton with a given skin. The image may be scaled or not. You can the skeleton data to get more info about the size of a skeleton.", {
        dataKey: z.string().describe("The key of the spine data (skeleton) asset."),
        atlasKey: z.string().describe("The key of the spine atlas asset."),
        skinName: z.string().describe("The name of the skin to use. A skeleton can have multiple skins."),
        animationName: z.string().describe("The name of the animation to use. A skeleton can have multiple animations."),
    });

    manager.defineTool("assets-get-available-tilemaps", "Search for the available Tiled tilemap files in the asset packs and return the list of tilemap keys. A Tiled tilemap file contains the data of a tilemap. It is used by the scene editor to create the Tilemap and TilemapLayer objects. These maps are created by the third party tool Tiled. Like the other assets in the asset packs, Phaser Editor uses the tilemap key to identify the tilemap.", {});

    manager.defineTool("assets-get-tilemap-data", "Get the data of a Tiled tilemap file. It returns the data of the tilemap, including the layers, tilesets, and objects. The data is used by the scene editor to create the Tilemap and TilemapLayer objects.", {
        key: z.string().describe("The key of the file in the asset pack. The key is used by the scene editor to create Tilemap objects."),
    });

    // fonts
    manager.defineTool("assets-get-google-font-families", "Gets the Google Fonts list of families. It connects to Google API and get the list. This method doesn't provide the fonts available in the project. To see the fonts in the project, check the fonts in the asset packs.", {
        filter: z.string().optional().describe("A filter string to filter the font families. This is optional to do a quick search and confirm if a font family is available."),
    });

    manager.defineTool("assets-get-google-font-info", "Gets the Google Fonts info for a given font family.", {
        family: z.string().describe("The font family to get the info. The family must be exactly as in Google Fonts. You can use the `assets-get-google-font-families` tool to get the list of available font families."),
    });

    manager.defineTool("assets-add-google-font-to-asset-pack", "Add a Google Font configuration to the given asset pack. This is required if you want to use the font in a scene text.", {
        assetPackFileName: z.string().describe("The relative path of the asset pack file. You can search for available asset packs using the `assets-get-available-asset-packs` tool. If there are multiple choices, you can pick any of them. You are not forced to ask the user."),
        key: z.string().describe("The key of the font to use in the scenes. It is recommended to use the same name as the font family plus the variant, but you can use any name. It should be unique in the project."),
        family: z.string().describe("The font family to use. The family must be exactly as in Google Fonts. You can use the `assets-get-google-font-families` tool to get the list of available font families."),
        url: z.string().optional().describe("The URL of the Google Font ttf file. You can get it with the `assets-get-google-font-info` tool."),
    });
}