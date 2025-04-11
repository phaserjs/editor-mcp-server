import { z } from "zod";

export function GameObjectComponent() {

    return {
        label: z.string().optional().describe("Label of the image. It is used to identify the image in the scene and in code."),
    };
}

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

export function TextureComponent() {
    return {
        textureKey: z.string().optional().describe("The key of the texture."),
        textureFrame: z.string().optional().describe("The frame of the texture, in case it is an atlas, sprite-sheet, or other complex texture."),
    };
}
