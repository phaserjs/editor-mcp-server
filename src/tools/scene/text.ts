import z from "zod";

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