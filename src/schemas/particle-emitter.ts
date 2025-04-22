import { z } from "zod";
import { FrameSchema } from "./components.js";

const ConfigValueType_None = z.object({
    type: z.literal("None"),
}).describe("No value");


const ConfigValueType_Static = z.object({
    type: z.literal("Static"),
    value: z.number().default(0).optional().describe("Static value")
}).describe("The value will always be constant when the particle is spawned.");

const ConfigValueType_Random = z.object({
    type: z.literal("Random"),
    random: z.array(z.number()).optional().describe("Random value")
}).describe("The value will be one of the elements in the given array, picked at random on emission.");

const ConfigValueType_StartEndRandom = z.object({
    type: z.literal("StartEndRandom"),
    start: z.number(),
    end: z.number(),
    randomFlag: z.boolean().default(false).optional().describe("If true, the value will be random between start and end."),
    ease: z.enum(["Power0", "Power1", "Power2", "Power3", "Power4", "Linear", "Quad", "Cubic", "Quart", "Quint", "Sine", "Expo", "Circ", "Elastic", "Back", "Bounce", "Stepped", "Quad.easeIn", "Cubic.easeIn", "Quart.easeIn", "Quint.easeIn", "Sine.easeIn", "Expo.easeIn", "Circ.easeIn", "Elastic.easeIn", "Back.easeIn", "Bounce.easeIn", "Quad.easeOut", "Cubic.easeOut", "Quart.easeOut", "Quint.easeOut", "Sine.easeOut", "Expo.easeOut", "Circ.easeOut", "Elastic.easeOut", "Back.easeOut", "Bounce.easeOut", "Quad.easeInOut", "Cubic.easeInOut", "Quart.easeInOut", "Quint.easeInOut", "Sine.easeInOut", "Expo.easeInOut", "Circ.easeInOut", "Elastic.easeInOut", "Back.easeInOut", "Bounce.easeInOut"]).optional().describe("Easing function to use for the value.")
}).describe("The 'start and end' object can have an optional random parameter. This forces it to pick a random value between the two values and use this as the starting value, then easing to the 'end' parameter over its lifetime");

function Property_onEmitAndUpdate() {

    return z.discriminatedUnion("type", [
        ConfigValueType_None,
        ConfigValueType_Static,
        ConfigValueType_Random,
        ConfigValueType_StartEndRandom,
    ]).optional();
}

export function ParticleEmitterComponent() {

    return {
        config: z.object({
            // transform
            x: Property_onEmitAndUpdate().describe("The x coordinate the particles are emitted from. This is relative to the Emitters x coordinate and that of any parent."),
            y: Property_onEmitAndUpdate().describe("The y coordinate the particles are emitted from. This is relative to the Emitters x coordinate and that of any parent."),
            moveToX: Property_onEmitAndUpdate().describe("The x coordinate emitted particles move toward."),
            moveToY: Property_onEmitAndUpdate().describe("The x coordinate emitted particles move toward."),
            scale: Property_onEmitAndUpdate().describe("Sets the vertical and horizontal scale of the emitted particles. This is relative to the Emitters scale and that of any parent."),
            scaleX: Property_onEmitAndUpdate().describe("The horizontal scale of emitted particles. This is relative to the Emitters scale and that of any parent."),
            scaleY: Property_onEmitAndUpdate().describe("The horizontal scale of emitted particles. This is relative to the Emitters scale and that of any parent."),
            angle: Property_onEmitAndUpdate().describe("The angle at which the particles are emitted. The values are given in degrees. This allows you to control the direction of the emitter. If you wish instead to change the rotation of the particles themselves, see the `rotate` property."),
            rotate: Property_onEmitAndUpdate().describe(" The rotation (or angle) of each particle when it is emitted. The value is given in degrees and uses a right-handed coordinate system, where 0 degrees points to the right, 90 degrees points down and -90 degrees points up."),

            // texture
            configTexture: z.string().optional().describe("The texture key of the emitter. It is the key of the texture, like in the key of a texture atlas. The emitter can use multiple frames of the given texture."),
            configFrame: z.array(FrameSchema).optional().describe("The frame key of the texture, in case it is an atlas, sprite-sheet, or other complex texture. You can set multiple frame keys."),
        })
    };
}