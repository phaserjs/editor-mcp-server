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

const EaseConstants = ["Power0", "Power1", "Power2", "Power3", "Power4", "Linear", "Quad", "Cubic", "Quart", "Quint", "Sine", "Expo", "Circ", "Elastic", "Back", "Bounce", "Stepped", "Quad.easeIn", "Cubic.easeIn", "Quart.easeIn", "Quint.easeIn", "Sine.easeIn", "Expo.easeIn", "Circ.easeIn", "Elastic.easeIn", "Back.easeIn", "Bounce.easeIn", "Quad.easeOut", "Cubic.easeOut", "Quart.easeOut", "Quint.easeOut", "Sine.easeOut", "Expo.easeOut", "Circ.easeOut", "Elastic.easeOut", "Back.easeOut", "Bounce.easeOut", "Quad.easeInOut", "Cubic.easeInOut", "Quart.easeInOut", "Quint.easeInOut", "Sine.easeInOut", "Expo.easeInOut", "Circ.easeInOut", "Elastic.easeInOut", "Back.easeInOut", "Bounce.easeInOut"] as const;

const ConfigValueType_StartEndRandom = z.object({
    type: z.literal("StartEndRandom"),
    start: z.number(),
    end: z.number(),
    randomFlag: z.boolean().default(false).optional().describe("If true, the value will be random between start and end."),
    ease: z.enum(EaseConstants).optional().describe("Easing function to use for the value.")
}).describe("The 'start and end' object can have an optional random parameter. This forces it to pick a random value between the two values and use this as the starting value, then easing to the 'end' parameter over its lifetime");

const ConfigValueType_Interpolation = z.object({
    type: z.literal("Interpolation"),
    values: z.array(z.number()).describe("An array of values which will be used for interpolation during the particles lifetime"),
    interpolation: z.enum(["linear", "catmull", "bezier"]).default("linear").optional().describe("The interpolation function to be used."),
    ease: z.enum(EaseConstants).optional().describe("The ease function used to control the rate of change through the values.")
});

const ConfigValueType_Stepped = z.object({
    type: z.literal("Stepped"),
    steps: z.number().default(1).optional().describe("The steps parameter allows you to control the placement of sequential particles across the start-end range."),
    start: z.number().default(0).optional().describe("The start of the range."),
    end: z.number().default(1).optional().describe("The end of the range."),
    yoyo: z.boolean().default(false).optional().describe("As with the stepped emitter, particles are emitted in sequence, from 'start' to 'end' in step sized jumps. Normally, when a stepped emitter reaches the end it snaps around to the start value again. However, if you provide the 'yoyo' parameter then when it reaches the end it will reverse direction and start emitting back down to 'start' again. Depending on the effect you require this can often look better."),
});

const ConfigValueType_MinMax = z.object({
    type: z.literal("MinMax").describe("This allows you to pick a random float value between the min and max properties"),
    min: z.number().default(0).optional().describe("The minimum value of the range. A random value is selected between 'min' and 'max'."),
    max: z.number().default(0).optional().describe("The minimum value of the range. A random value is selected between 'min' and 'max'."),
    int: z.boolean().default(false).optional().describe("The maximum value."),
});

function EmitterOp_onEmitAndUpdate() {

    return z.discriminatedUnion("type", [
        ConfigValueType_None,
        ConfigValueType_Static,
        ConfigValueType_Random,
        ConfigValueType_StartEndRandom,
        ConfigValueType_Interpolation,
        ConfigValueType_Stepped,
        ConfigValueType_MinMax
    ]).optional();
}

function EmitterOp_onEmitOnly() {

    return z.discriminatedUnion("type", [
        ConfigValueType_None,
        ConfigValueType_Static,
        ConfigValueType_Random,
        ConfigValueType_Stepped,
        ConfigValueType_MinMax
    ]).optional();
}

export function ParticleEmitterComponent() {

    return {
        config: z.object({
            // transform
            x: EmitterOp_onEmitAndUpdate().describe("The x coordinate the particles are emitted from. This is relative to the Emitters x coordinate and that of any parent."),
            y: EmitterOp_onEmitAndUpdate().describe("The y coordinate the particles are emitted from. This is relative to the Emitters x coordinate and that of any parent."),
            moveToX: EmitterOp_onEmitAndUpdate().describe("The x coordinate emitted particles move toward."),
            moveToY: EmitterOp_onEmitAndUpdate().describe("The x coordinate emitted particles move toward."),
            scale: EmitterOp_onEmitAndUpdate().describe("Sets the vertical and horizontal scale of the emitted particles. This is relative to the Emitters scale and that of any parent."),
            scaleX: EmitterOp_onEmitAndUpdate().describe("The horizontal scale of emitted particles. This is relative to the Emitters scale and that of any parent."),
            scaleY: EmitterOp_onEmitAndUpdate().describe("The horizontal scale of emitted particles. This is relative to the Emitters scale and that of any parent."),
            angle: EmitterOp_onEmitOnly().describe("The angle at which the particles are emitted. The values are given in degrees. This allows you to control the direction of the emitter. If you wish instead to change the rotation of the particles themselves, see the `rotate` property."),
            rotate: EmitterOp_onEmitAndUpdate().describe(" The rotation (or angle) of each particle when it is emitted. The value is given in degrees and uses a right-handed coordinate system, where 0 degrees points to the right, 90 degrees points down and -90 degrees points up."),

            // timing
            delay: EmitterOp_onEmitOnly().describe("The number of milliseconds to wait after emission before the particles start updating. This allows you to emit particles that appear 'static' or still on-screen and then, after this value, begin to move."),
            hold: EmitterOp_onEmitOnly().describe("The number of milliseconds to wait after a particle has finished its life before it will be removed. This allows you to 'hold' a particle on the screen once it has reached its final state before it then vanishes."),
            lifespan: EmitterOp_onEmitOnly().describe(" The lifespan of the emitted particles. This value is given in milliseconds and defaults to 1000ms (1 second). When a particle reaches this amount it is killed."),
            quantity: EmitterOp_onEmitOnly().describe("The number of particles emitted per second. This is relative to the Emitters x coordinate and that of any parent."),
            _duration: z.number().default(0).optional().describe("Limit the emitter to emit particles for a maximum of `duration` ms. Default to zero, meaning 'forever'."),
            _stopAfter: z.number().default(0).optional().describe("Limit the emitter to emit this exact number of particles and then stop. Default to zero, meaning no limit."),
            _frequency: z.number().default(0).optional().describe("For a flow emitter, the time interval (>= 0) between particle flow cycles in ms. A value of 0 means there is one particle flow cycle for each logic update (the maximum flow frequency). This is the default setting. For an exploding emitter, this value will be -1."),
            _timeScale: z.number().default(1).optional().describe("The time rate applied to active particles, affecting lifespan, movement, and tweens. Values larger than 1 are faster than normal."),
            _maxAliveParticles: z.number().default(0).optional().describe("The maximum number of alive and rendering particles this emitter will update. When this limit is reached, a particle needs to die before another can be emitted. 0 means no limits."),
            _maxParticles: z.number().default(0).optional().describe("Set to hard limit the amount of particle objects this emitter is allowed to create in total. This is the number of `Particle` instances it can create, not the number of 'alive' particles."),
            _advance: z.number().default(0).optional().describe("If you wish to 'fast forward' the emitter in time, set this value to a number representing the amount of ms the emitter should advance. Doing so implicitly sets `emitting` to `true`."),

            // physics

            accelerationX: EmitterOp_onEmitAndUpdate().optional().describe("The horizontal acceleration applied to emitted particles, in pixels per second squared."),
            accelerationY: EmitterOp_onEmitAndUpdate().optional().describe("The vertical acceleration applied to emitted particles, in pixels per second squared."),
            maxVelocityX: EmitterOp_onEmitAndUpdate().optional().describe("The maximum horizontal velocity emitted particles can reach, in pixels per second squared."),
            maxVelocityY: EmitterOp_onEmitAndUpdate().optional().describe("The maximum vertical velocity emitted particles can reach, in pixels per second squared."),
            speed: EmitterOp_onEmitOnly().optional().describe(" The initial speed of emitted particles, in pixels per second. If using this as a getter it will return the `speedX` value. If using it as a setter it will update both `speedX` and `speedY` to the given value."),
            speedX: EmitterOp_onEmitOnly().optional().describe("The initial horizontal speed of emitted particles, in pixels per second."),
            speedY: EmitterOp_onEmitOnly().optional().describe("The initial vertical speed of emitted particles, in pixels per second."),
            gravityX: z.number().default(0).optional().describe("Horizontal acceleration applied to emitted particles, in pixels per second squared."),
            gravityY: z.number().default(0).optional().describe("Vertical acceleration applied to emitted particles, in pixels per second squared."),
            radial: z.boolean().default(true).optional().describe("A radial emitter will emit particles in all directions between angle min and max, using `speed` as the value. If set to false then this acts as a point Emitter. A point emitter will emit particles only in the direction derived from the speedX and speedY values."),

            // texture
            configTexture: z.string().optional().describe("The texture key of the emitter. It is the key of the texture, like in the key of a texture atlas. The emitter can use multiple frames of the given texture."),
            configFrame: z.array(FrameSchema).optional().describe("The frame key of the texture, in case it is an atlas, sprite-sheet, or other complex texture. You can set multiple frame keys."),
        })
    };
}