import { z } from "zod";

export function SceneId() {

    return {
        sceneId: z.string().describe("The `id` of the scene. The `id` is not the name of the scene, else a unique identifier is set in the scene data. You need to read the scene data to get the `id`."),
    };
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

enum Alignment {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2,
}

export function BitmapTextComponent() {
    return {
        text: z.string().optional().describe("The text."),
        font: z.string().optional().describe("Bitmap Font asset key."),
        align: z.nativeEnum(Alignment).optional().describe("Alignment of the BitmapText: 0 - left, 1 - center, 2 - right."),
        fontSize: z.number().optional().describe("Font size of the BitmapText."),
        letterSpacing: z.number().optional().describe("Letter spacing of the BitmapText."),
        maxWidth: z.number().optional().describe("Maximum width of the BitmapText."),
        dropShadowX: z.number().optional().describe("Drop shadow X offset of the BitmapText."),
        dropShadowY: z.number().optional().describe("Drop shadow Y offset of the BitmapText."),
        dropShadowAlpha: z.number().optional().describe("Drop shadow alpha of the BitmapText."),
        dropShadowColor: z.string().optional().describe("Drop shadow color of the BitmapText. In hex format, like `#ff0000`."),
    };
}

export function TextComponent() {

    return {
        text: z.string().optional().describe("The text property"),
        fontFamily: z.string().optional().describe("The font family of the text."),
        fontSize: z.string().optional().describe("The font size of the text. Use CSS units, like `px`."),
        align: z.enum(["left", "center", "right", "justify"]).optional().describe("The alignment of the text."),
        fontStyle: z.enum(["", "bold", "italic", "bold italic"]).optional().describe("The font style of the text."),
        stroke: z.string().optional().describe("The stroke of the text."),
        strokeThickness: z.number().optional().describe("The stroke thickness of the text."),
        color: z.string().optional().describe("The color of the text."),
        backgroundColor: z.string().optional().describe("The background color of the text."),
        "shadow.offsetX": z.number().optional().describe("The shadow offset X of the text."),
        "shadow.offsetY": z.number().optional().describe("The shadow offset Y of the text."),
        "shadow.color": z.string().optional().describe("The shadow color of the text."),
        "shadow.stroke": z.string().optional().describe("The shadow stroke of the text."),
        "shadow.fill": z.boolean().optional().describe("If fill the shadow, or not."),
        "shadow.blur": z.number().optional().describe("The shadow blur of the text."),
    }
}

export const FrameSchema = z.union([z.string(), z.number()]).optional().describe("The frame of the texture, in case it is an atlas, sprite-sheet, or other complex texture.");

export function TextureComponent() {

    return {
        texture: z.object({
            key: z.union([z.string(), z.number()]).optional().describe("The key of the texture."),
            frame: FrameSchema,
        }).optional().describe("The texture of the game object."),
    };
}

enum AnimationPlayMethod {
    NONE = 0,
    PLAY = 1,
    PLAY_REVERSE = 2
}

export function SpriteComponent() {

    return {
        animationKey: z.string().optional().describe("The key of the animation to play."),
        animationPlayMethod: z.nativeEnum(AnimationPlayMethod).optional().describe("The method to play the animation. 0 - none, 1 - play, 2 - play reverse."),
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

export function SpineComponent() {

    return {
        dataKey: z.string().optional().describe("The key of the spine data (skeleton) asset."),
        atlasKey: z.string().optional().describe("The key of the spine atlas asset."),
        skinName: z.string().optional().describe("The name of the skin to use. A skeleton can have multiple skins."),
        enablePreview: z.boolean().default(false).optional().describe("If true, the animation will be previewed in realtime in the scene editor."),
        previewAnimation: z.string().optional().describe("The name of the animation to preview. You can find the animations in the skeleton data."),
        previewTime: z.number().default(0).optional().describe("The start time of the animation to preview. You can use it to advance the animation to a specific time."),
    }
}

export function NineSliceComponent() {

    return {
        leftWidth: z.number().default(0).optional().describe("The width of the left slice."),
        rightWidth: z.number().default(0).optional().describe("The width of the right slice."),
        topHeight: z.number().default(0).optional().describe("The height of the top slice."),
        bottomHeight: z.number().default(0).optional().describe("The height of the bottom slice."),
    }
}

export function ThreeSliceComponent() {

    return {
        leftWidth: z.number().default(0).optional().describe("The width of the left slice."),
        rightWidth: z.number().default(0).optional().describe("The width of the right slice.")
    }
}
