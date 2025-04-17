import { z } from "zod";

export function TransformComponent() {

    return {
        x: z.number().optional().describe("X position of the image"),
        y: z.number().optional().describe("Y position of the image"),
        originX: z.number().optional().describe("Origin (or pivot) X of the image."),
        originY: z.number().optional().describe("Origin (or pivot) Y of the image."),
        scaleX: z.number().optional().describe("Scale X of the image"),
        scaleY: z.number().optional().describe("Scale Y of the image"),
        angle: z.number().optional().describe("Angle of the image, in degree."),
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

export function TextureComponent() {

    return {
        texture: z.object({
            key: z.union([z.string(), z.number()]).optional().describe("The key of the texture."),
            frame: z.union([z.string(), z.number()]).optional().describe("The frame of the texture, in case it is an atlas, sprite-sheet, or other complex texture."),
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

export function ShapeComponent() {

    return {
        fillColor: z.string().optional().describe("The fill color of the shape. In hex format, like `#ff0000`."),
        isFilled: z.boolean().optional().describe("If true, the shape is filled."),
        fillAlpha: z.number().optional().describe("The fill alpha of the shape."),
        isStroked: z.boolean().optional().describe("If true, the shape is stroked."),
        strokeColor: z.string().optional().describe("The stroke color of the shape. In hex format, like `#ff0000`."),
        strokeAlpha: z.number().optional().describe("The stroke alpha of the shape."),
        lineWidth: z.number().optional().describe("The line width of the shape."),
    };
}

export function EllipseComponent() {

    return {
        smoothness: z.number().optional().describe("The smoothness of the ellipse."),
    }
}
