import { z } from "zod";
import { TextureComponent } from "../schemas/components.js";
import { defineTool } from "../utils.js";

export function defineAssetTools() {

    defineTool("assets-get-available-textures", "Get all available textures in the project.", {});

    defineTool("assets-get-texture-binary", "Get the binary data of a texture.", {
        ...TextureComponent()
    });

    defineTool("assets-get-available-bitmapfonts", "Get all available bitmap fonts in the project.", {});

    defineTool("assets-get-bitmapfont-image", "Get the PNG image/texture of the given bitmap font.", {
        key: z.string().describe("The key of the bitmap font."),
    });

    defineTool("assets-get-spritesheet-image", "Get the PNG image/texture of the given spritesheet. You can use this tool to get a better understanding of the position of tiles/frames.", {
        key: z.string().describe("The key of the bitmap font."),
    });

    defineTool("assets-get-texture-content-bounding-box", "Get the bounding box of the content of the given texture. Many textures has transparent padding but we need the exact offset and size of the content/object of the texture to place them in the right positions in the scene. Like when placing different objects one next to the other, with touching edges.", {
        ...TextureComponent()
    });

    defineTool("assets-get-available-animations", "Get all available sprite animations in the project.", {});

    defineTool("assets-get-available-spine-skeletons", "Get the all the Spine skeletons in the project. It only returns the key of the skeleton.", {});
    
    defineTool("assets-get-available-spine-atlases", "Get the all the Spine atlases in the project.", {});

    defineTool("assets-get-spine-skeleton-info", "Get the skeleton info (animations and skins) of the given Spine skeleton key. To build the info of a skeleton it requires also the Spine atlas key. The user can select a different atlas key, but it is common that the user also define a 'preview' atlas key for each skeleton. You can use it if it exists or ask for a different atlas key to the user.", {
        dataKey: z.string().describe("The key of the spine data (skeleton) asset."),
        atlasKey: z.string().describe("The key of the spine atlas asset."),
    });
}