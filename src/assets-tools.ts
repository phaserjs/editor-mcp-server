import { z } from "zod";
import { defineTool } from "./utils.js";
import { TextureComponent } from "./components.js";

export function defineAssetTools() {

    defineTool("assets-get-available-textures", "Get all available textures in the project.", {});

    defineTool("assets-get-texture-binary", "Get the binary data of a texture.", {
        ...TextureComponent()
    });

    defineTool("assets-get-available-bitmapfonts", "Get all available bitmap fonts in the project.", {});

    defineTool("assets-get-bitmapfont-image", "Get the PNG image/texture of the given bitmap font.", {
        key: z.string().describe("The key of the bitmap font."),
    })

    defineTool("assets-get-texture-content-bounding-box", "Get the bounding box of the content of the given texture. Many textures has transparent padding but we need the exact offset and size of the content/object of the texture to place them in the right positions in the scene. Like when placing different objects one next to the other, with touching edges.", {
        ...TextureComponent()
    });

    defineTool("assets-get-available-animations", "Get all available sprite animations in the project.", {});
}