import { z } from "zod";
import { defineTool } from "./utils.js";


// You may want to define the frame type if not already imported
const JSONAnimationFrameSchema = z.object({
    key: z.string().describe("The key of the texture."),
    frame: z.union([z.string(), z.number()]).describe("The frame of the texture. This can be a string or a number."),
    duration: z.number().default(0).optional().describe("The duration of the frame in milliseconds."),
});

const AnimationSchema = z.object({
    key: z.string().describe("The key that the animation will be associated with. i.e. sprite.animations.play(key)"),
    type: z.string().default("frame").describe("The type of animation. Currently only 'frame' is supported."),
    frames: z.array(JSONAnimationFrameSchema).describe("An array of the animation frames inside this Animation."),
    frameRate: z.number().describe("The frame rate of the animation. This is the number of frames per second."),
    delay: z.number().describe("The delay before the animation starts."),
    repeat: z.number().describe("The number of times the animation will repeat. -1 for infinite."),
    repeatDelay: z.number().describe("The delay between repeats of the animation."),
    yoyo: z.boolean().describe("If true, the animation will play in reverse after it completes."),
    showBeforeDelay: z.boolean().describe("If true, the animation will be shown before the delay."),
    showOnStart: z.boolean().describe("If true, the animation will be shown when it starts."),
    hideOnComplete: z.boolean().describe("If true, the animation will hide when it completes."),
    randomFrame: z.boolean().optional().describe("If true, the animation will start at a random frame."),
    skipMissedFrames: z.boolean().describe("Skip frames if the time lags, or always advanced anyway?"),
});

export function defineAnimationsTools() {

    defineTool("animations-editor-get-animations", "Get the animations.", {});

    defineTool("animations-editor-add-animation", "Add an animation.", {
        animation: AnimationSchema.describe("The animation to add.")
    });

    defineTool("animations-editor-delete-animation", "Remove an animation.", {
        key: z.string().describe("The animation key")
    });

    defineTool("animations-editor-update-animation", "Update an animation.", {
        animation: AnimationSchema.describe("The animation to update.")
    });
}