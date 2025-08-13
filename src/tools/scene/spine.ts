import z from "zod";

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