import { z } from "zod";

export function SceneId() {

    return {
        sceneId: z.string().describe("The `id` of the scene. The `id` is not the name of the scene, else a unique identifier is set in the scene data. You need to read the scene data to get the `id`.",),
    };
}

export function LabelComponent(required: "required" | "optional") {

    let label = z.string().regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, { message: "Invalid label format. Expects a valid variable identifier." }).describe("Label of the object. It is used to name the object in the scene and as the variable name in code.");

    if (required === "optional") {

        label = label.optional() as any;
    }

    return { label };
}

export function VariableComponent() {

    return {
        scope: z.enum(["LOCAL", "PUBLIC", "METHOD", "CLASS", "NESTED_PREFAB"]).optional().describe("The scope of the variable. By default, the editor may generate or not a variable ('local' scope). It depends on if it needs a variable to update the object just after the creation. However, you can force to generate a variable and assign a scope to it, so you can access the object from different parts of the code. When you set a 'public' scope, the editor generates a public field in the class. The same with the `class` scope, but the field is private (in TypeScript). The 'method' scope says to the editor to generate a local variable. The 'nested_prefab' scope is like the public scope but also indicates that the object is a nested prefab."),
    };
}

export function TransformComponent() {

    return {
        x: z.number().optional().describe("X position of the image"),
        y: z.number().optional().describe("Y position of the image"),
        scaleX: z.number().default(1).optional().describe("Scale X of the image"),
        scaleY: z.number().default(1).optional().describe("Scale Y of the image"),
        angle: z.number().default(0).optional().describe("Angle of the image, in degree."),
    };
}

export function OriginComponent(defaultValue = 0.5) {

    return {
        originX: z.number().default(defaultValue).optional().describe("Origin (or pivot) X of the image."),
        originY: z.number().default(defaultValue).optional().describe("Origin (or pivot) Y of the image."),
    };
}

export function FlipComponent() {
    return {
        flipX: z.boolean().default(false).optional().describe("If true, the image is flipped horizontally."),
        flipY: z.boolean().default(false).optional().describe("If true, the image is flipped vertically."),
    };
}

export function VisibleComponent() {
    return {
        visible: z.boolean().default(true).optional().describe("If true, the game object is visible in the scene.")
    };
}

export function AlphaComponent() {

    return {
        alpha: z.number().default(1).optional().describe("Alpha of the game object. 0 is fully transparent, 1 is fully opaque."),
        alphaTopLeft: z.number().default(1).optional().describe("Alpha of the top-left corner of the game object. 0 is fully transparent, 1 is fully opaque."),
        alphaTopRight: z.number().default(1).optional().describe("Alpha of the top-right corner of the game object. 0 is fully transparent, 1 is fully opaque."),
        alphaBottomLeft: z.number().default(1).optional().describe("Alpha of the bottom-left corner of the game object. 0 is fully transparent, 1 is fully opaque."),
        alphaBottomRight: z.number().default(1).optional().describe("Alpha of the bottom-right corner of the game object. 0 is fully transparent, 1 is fully opaque."),
    };
}

export function AlphaSingleComponent() {

    return {
        alpha: z.number().default(1).optional().describe("Alpha of the game object. 0 is fully transparent, 1 is fully opaque."),
    };
}

export enum BlendModes {
    SKIP_CHECK,
    NORMAL,
    ADD,
    MULTIPLY,
    SCREEN,
    OVERLAY,
    DARKEN,
    LIGHTEN,
    COLOR_DODGE,
    COLOR_BURN,
    HARD_LIGHT,
    SOFT_LIGHT,
    DIFFERENCE,
    EXCLUSION,
    HUE,
    SATURATION,
    COLOR,
    LUMINOSITY,
    ERASE,
    SOURCE_IN,
    SOURCE_OUT,
    SOURCE_ATOP,
    DESTINATION_OVER,
    DESTINATION_IN,
    DESTINATION_OUT,
    DESTINATION_ATOP,
    LIGHTER,
    COPY,
    XOR,
}

export function BlendModeComponent(defaultValue = BlendModes.NORMAL) {

    return {
        blendMode: z.number().default(defaultValue).optional().describe("The blend mode of the game object. It defines how the game object is blended with the background. The default value is `NORMAL`."),
    };
}

export function TintComponent() {

    return {
        tintFill: z.boolean().default(false).optional().describe("The tint fill mode. `false` = An additive tint (the default), where vertices colors are blended with the texture.\n`true` = A fill tint, where the vertices colors replace the texture, but respects texture alpha."),
        tintTopLeft: z.string().default("#ffffff").optional().describe("The tint value being applied to the top-left vertice of the Game Object. This value is interpolated from the corner to the center of the Game Object. The value should be set as a hex number, i.e. 0xff0000 for red, or 0xff00ff for purple."),
        tintTopRight: z.string().default("#ffffff").optional().describe("See tintTopLeft for more details."),
        tintBottomLeft: z.string().default("#ffffff").optional().describe("See tintTopLeft for more details."),
        tintBottomRight: z.string().default("#ffffff").optional().describe("See tintTopLeft for more details."),
    };
}

export function SingleTintComponent() {

    return {
        tintFill: z.boolean().default(false).optional().describe("The tint fill mode. `false` = An additive tint (the default), where vertices colors are blended with the texture.\n`true` = A fill tint, where the vertices colors replace the texture, but respects texture alpha."),
        tint: z.string().default("#ffffff").optional().describe("The tint value being applied to the top-left vertice of the Game Object. This value is interpolated from the corner to the center of the Game Object. The value should be set as a hex number, i.e. 0xff0000 for red, or 0xff00ff for purple."),
    }
}

export const FrameSchema = z.any().optional().describe("Texture frame for atlases or sprite-sheets (string for atlas, number for sprite-sheet). Omit if using a simple image");

export function TextureComponent() {

    return {
        texture: z.object({
            key: z.string().optional().describe("The key of the texture."),
            frame: FrameSchema,
        }).optional().describe("The texture of the game object."),
    };
}

export function SpriteComponent() {

    return {
        animationKey: z.string().optional().describe("The key of the animation to play."),
        animationPlayMethod: z.number().optional().describe("The method to play the animation. 0 - none, 1 - play, 2 - play reverse."),
        animationPreview: z.boolean().default(false).optional().describe("If true, the animation will be previewed in realtime in the scene editor."),
    }
}

export function TileSpriteComponent() {

    return {
        width: z.number().optional().describe("The width of the tile sprite."),
        height: z.number().optional().describe("The height of the tile sprite."),
        tilePositionX: z.number().optional().describe("The tile position X of the tile sprite."),
        tilePositionY: z.number().optional().describe("The tile position Y of the tile sprite."),
        tileScaleX: z.number().optional().describe("The tile scale X of the tile sprite."),
        tileScaleY: z.number().optional().describe("The tile scale Y of the tile sprite."),
    }
}

export function SizeComponent() {

    return {
        width: z.number().optional().describe("The width of the game object."),
        height: z.number().optional().describe("The height of the game object."),
    }
}

export function ParentComponent() {

    return {
        allowAppendChildren: z.boolean().default(false).optional().describe("If true, the prefab instance allows to append children game objects to it. If false, the prefab instance doesn't allow to append children game objects to it. In that case, the user cannot add children game objects to the prefab instance in the scene editor. This field is only valid for prefab instances. You always can add children to a parent game object that is not a prefab instance."),
    }
}

