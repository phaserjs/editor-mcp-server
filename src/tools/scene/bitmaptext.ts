import z from "zod";

enum Alignment {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2,
}

export function BitmapTextComponent() {
    return {
        text: z.string().optional().describe("The text."),
        font: z.string().optional().describe("Bitmap Font asset key."),
        align: z.number().optional().describe("Alignment of the BitmapText: 0 - left, 1 - center, 2 - right."),
        fontSize: z.number().optional().describe("Font size of the BitmapText."),
        letterSpacing: z.number().optional().describe("Letter spacing of the BitmapText."),
        maxWidth: z.number().optional().describe("Maximum width of the BitmapText."),
        dropShadowX: z.number().optional().describe("Drop shadow X offset of the BitmapText."),
        dropShadowY: z.number().optional().describe("Drop shadow Y offset of the BitmapText."),
        dropShadowAlpha: z.number().optional().describe("Drop shadow alpha of the BitmapText."),
        dropShadowColor: z.string().optional().describe("Drop shadow color of the BitmapText. In hex format, like `#ff0000`."),
    };
}