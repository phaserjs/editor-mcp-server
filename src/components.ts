import { z } from "zod";

export function GameObjectComponent() {

    return {
        label: z.string().describe("Label of the image. It is used to identify the image in the scene and in code."),
    };
}

export function TransformComponent() {

    return {
        x: z.number().describe("X position of the image"),
        y: z.number().describe("Y position of the image"),
        originX: z.number().default(0.5).optional().describe("Origin (or pivot) X of the image."),
        originY: z.number().default(0.5).optional().describe("Origin (or pivot) Y of the image."),
        scaleX: z.number().default(1).optional().describe("Scale X of the image"),
        scaleY: z.number().default(1).optional().describe("Scale Y of the image"),
        angle: z.number().default(0).optional().describe("Angle of the image, in degree."),
    };
}

export function TextureComponent() {
    return {
        textureKey: z.string().describe("The key of the texture."),
        textureFrame: z.string().optional().describe("The frame of the texture, in case it is an atlas, sprite-sheet, or other complex texture."),
    };
}
