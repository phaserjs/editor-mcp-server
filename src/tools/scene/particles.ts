import { z } from "zod";
import { FrameSchema } from "./common.js";

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

enum BlendModes {
    SKIP_CHECK,
    NORMAL,
    ADD,
    MULTIPLY,
    SCREEN,
    OVERLAY,
    DARKEN,
    LIGHTEN,
    COLOR_DODGE,
    COLOR_BURN,
    HARD_LIGHT,
    SOFT_LIGHT,
    DIFFERENCE,
    EXCLUSION,
    HUE,
    SATURATION,
    COLOR,
    LUMINOSITY,
    ERASE,
    SOURCE_IN,
    SOURCE_OUT,
    SOURCE_ATOP,
    DESTINATION_OVER,
    DESTINATION_IN,
    DESTINATION_OUT,
    DESTINATION_ATOP,
    LIGHTER,
    COPY,
    XOR,
}

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

function EmitterOp_Random() {

    return z.discriminatedUnion("type", [
        ConfigValueType_None,
        ConfigValueType_Random
    ]).optional();
}

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

            accelerationX: EmitterOp_onEmitAndUpdate().describe("The horizontal acceleration applied to emitted particles, in pixels per second squared."),
            accelerationY: EmitterOp_onEmitAndUpdate().describe("The vertical acceleration applied to emitted particles, in pixels per second squared."),
            maxVelocityX: EmitterOp_onEmitAndUpdate().describe("The maximum horizontal velocity emitted particles can reach, in pixels per second squared."),
            maxVelocityY: EmitterOp_onEmitAndUpdate().describe("The maximum vertical velocity emitted particles can reach, in pixels per second squared."),
            speed: EmitterOp_onEmitOnly().describe(" The initial speed of emitted particles, in pixels per second. If using this as a getter it will return the `speedX` value. If using it as a setter it will update both `speedX` and `speedY` to the given value."),
            speedX: EmitterOp_onEmitOnly().describe("The initial horizontal speed of emitted particles, in pixels per second."),
            speedY: EmitterOp_onEmitOnly().describe("The initial vertical speed of emitted particles, in pixels per second."),
            gravityX: z.number().default(0).optional().describe("Horizontal acceleration applied to emitted particles, in pixels per second squared."),
            gravityY: z.number().default(0).optional().describe("Vertical acceleration applied to emitted particles, in pixels per second squared."),
            radial: z.boolean().default(true).optional().describe("A radial emitter will emit particles in all directions between angle min and max, using `speed` as the value. If set to false then this acts as a point Emitter. A point emitter will emit particles only in the direction derived from the speedX and speedY values."),

            // color

            tint: EmitterOp_onEmitAndUpdate().describe("A color tint value that is applied to the texture of the emitted particle. The value should be given in hex format, i.e. 0xff0000 for a red tint, and should not include the alpha channel. Tints are additive, meaning a tint value of white (0xffffff) will effectively reset the tint to nothing. Modify the `ParticleEmitter.tintFill` property to change between an additive and replacement tint mode. The `tint` value will be overriden if a `color` array is provided. This is a WebGL only feature."),
            alpha: EmitterOp_onEmitAndUpdate().describe("The alpha value of the emitted particles. This is a value between 0 and 1. Particles with alpha zero are invisible and are therefore not rendered, but are still processed by the Emitter."),
            color: EmitterOp_Random().describe("A color tint value that is applied to the texture of the emitted particle. The value should be given in hex format, i.e. 0xff0000 for a red tint, and should not include the alpha channel. Tints are additive, meaning a tint value of white (0xffffff) will effectively reset the tint to nothing. Modify the `ParticleEmitter.tintFill` property to change between an additive and replacement tint mode. When you define the color via the Emitter config you should give it as Random emitter operation. The Particle will then interpolate through these colors over the course of its lifespan. Setting this will override any `tint` value that may also be given. This is a WebGL only feature. Important, this emitter operation only supports None and Random types."),
            colorEase: z.enum(EaseConstants).default("Linear").optional().describe("Controls the easing function used when you have created an Emitter that uses the `color` property to interpolate the tint of Particles over their lifetime. Setting this has no effect if you haven't also applied a `color` to this Emitter."),
            tintFill: z.boolean().default(false).optional().describe("The tint fill mode used by the Particles in this Emitter. `false` = An additive tint (the default), where vertices colors are blended with the texture. `true` = A fill tint, where the vertices colors replace the texture, but respects texture alpha."),
            blendMode: z.number().default(BlendModes.NORMAL).optional().describe("The blend mode applied to the emitted particles. This is a WebGL only feature."),

            // sorting

            particleBringToTop: z.boolean().default(false).optional().describe("Newly emitted particles are added to the top of the particle list, i.e. rendered above those already alive. Set to false to send them to the back. Also see the `sortOrder` property for more complex particle sorting."),
            sortOrderAsc: z.boolean().default(true).optional().describe("When `sortProperty` is defined this controls the sorting order, either ascending or descending. Toggle to control the visual effect."),
            sortProperty: z.string().optional().describe("Optionally sort the particles before they render based on this property. The property must exist on the `Particle` class, such as `y`, `lifeT`, `scaleX`, etc. When set this overrides the `particleBringToTop` setting. To reset this and disable sorting, set this property to an empty string."),

            // preview

            previewAdvance: z.number().default(1000).optional().describe("The amount of time, in milliseconds, to advance the preview by. This is useful for testing the emitter in the editor."),
            previewActive: z.boolean().default(true).optional().describe("Set to true to preview the emitter in the editor. This will start the emitter and show the particles in the editor."),

            // animation

            _anim: z.array(z.string()).default([]).optional().describe("An array of animation keys that are used to animate the particles. The keys should be the same as the animation keys for sprite animations. You should provide animations or textures/frames, not both."),
            _animCycle: z.boolean().default(false).optional().describe("Whether animations will be assigned consecutively (true) or at random (false)."),
            _animQuantity: z.number().default(1).optional().describe("The number of consecutive particles receiving each animation, when `cycle` is true."),

            // texture

            configTexture: z.string().optional().describe("The texture key of the emitter. It is the key of the texture, like in the key of a texture atlas. The emitter can use multiple frames of the given texture. You should provide animations or textures/frames, not both."),
            configFrame: z.array(FrameSchema).optional().describe("The frame key of the texture, in case it is an atlas, sprite-sheet, or other complex texture. You can set multiple frame keys. You should provide animations or textures/frames, not both."),
        }).optional().describe("The configuration object for the Particle Emitter. This is the object that is passed to the Particle Emitter when it is created. It contains all the properties that can be set on the emitter, as well as the default values for each property. Some of the properties, know as EmitterOp properties, have a complex structure of different types."),
    };
}