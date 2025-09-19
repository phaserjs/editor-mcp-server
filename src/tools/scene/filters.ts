import z from "zod";
import { SceneId } from "./common.js";
import { BlendModes, TextureComponent } from "./common.js";
import { IToolsManager } from "../IToolsManager.js";

export function FilterComponent() {

    return {
        paddingLeft: z.number().default(0).optional().describe("The padding to apply to the left side of the filter. This is useful for filters that need extra space on the left side. Often it uses negative values to create a space for the filter effect."),
        paddingRight: z.number().default(0).optional().describe("The padding to apply to the right side of the filter. This is useful for filters that need extra space on the right side."),
        paddingTop: z.number().default(0).optional().describe("The padding to apply to the top side of the filter. This is useful for filters that need extra space on the top side. Often it uses negative values to create a space for the filter effect."),
        paddingBottom: z.number().default(0).optional().describe("The padding to apply to the bottom side of the filter. This is useful for filters that need extra space on the bottom side."),
    }
}

export function GlowFilterComponent() {

    return {
        color: z.string().default("#ffffff").optional().describe("The color of the glow effect. This value should be set as a hex number, i.e. 0xff0000 for red, or 0xff00ff for purple."),
        outerStrength: z.number().default(4).optional().describe("The strength of the glow inward from the edge of the Sprite."),
        innerStrength: z.number().default(0).optional().describe("The strength of the inner glow effect."),
        scale: z.number().default(1).optional().describe("The scale of the glow effect. This multiplies the fixed distance."),
        knockout: z.boolean().default(false).optional().describe("If `true` only the glow is drawn, not the texture itself."),
        quality: z.number().default(10).optional().describe("The quality of the glow effect. This cannot be changed after the filter has been created."),
        distance: z.number().default(10).optional().describe("The distance of the glow effect. This cannot be changed after the filter has been created."),
    };
}

export function ShadowFilterComponent() {

    return {
        x: z.number().default(0).optional().describe("The horizontal offset of the shadow effect."),
        y: z.number().default(0).optional().describe("The vertical offset of the shadow effect."),
        decay: z.number().default(0.1).optional().describe("The amount of decay for the shadow effect"),
        power: z.number().default(1).optional().describe("The power of the shadow effect."),
        color: z.string().default("#000000").optional().describe("The color of the shadow."),
        samples: z.number().
            default(6).optional().describe("The number of samples that the shadow effect will run for. This should be an integer with a minimum value of 1 and a maximum of 12."),
        intensity: z.number().default(1).optional().describe("The intensity of the shadow effect.")
    };
}

export function PixelateFilterComponent() {

    return {
        amount: z.number().default(1).optional().describe("The amount of pixelation to apply. The size of the pixels is equal to 2 + the amount."),
    };
}

export function BlurFilterComponent() {

    return {
        x: z.number().default(2).optional().describe("The horizontal offset of the blur effect."),
        y: z.number().default(2).optional().describe("The vertical offset of the blur effect."),
        strength: z.number().default(1).optional().describe("The strength of the blur effect."),
        color: z.string().default("#ffffff").optional().describe("The color of the blur as a hex string."),
        steps: z.number().default(4).optional().describe("The number of steps to run the Blur effect for. This value should always be an integer. The higher the value, the smoother the blur,\nbut at the cost of exponentially more gl operations. Keep this to the lowest possible number you can have it, while\nstill looking correct for your game."),
    };
}

export function BarrelFilterComponent() {

    return {
        amount: z.number().default(1).optional().describe("The amount of distortion applied to the barrel effect. Typically keep this within the range 1 (no distortion) to +- 1."),
    };
}

export function DisplacementFilterComponent() {

    return {
        x: z.number().default(0.005).optional().describe("The amount of horizontal displacement to apply.\nThe maximum horizontal displacement in pixels is `x` multiplied by 0.5 times the width of the camera rendering the filter."),
        y: z.number().default(0.005).optional().describe("The amount of vertical displacement to apply.\nThe maximum vertical displacement in pixels is `y` multiplied by 0.5 times the height of the camera rendering the filter."),
        texture: z.object({
            key: z.string().describe("The texture to be used for the displacement effect. You can only use a whole texture, not a frame from a texture atlas or sprite sheet.")
        }),
    };
}

export function BokehFilterComponent() {

    return {
        radius: z.number().default(0.5).optional().describe("The radius of the bokeh effect. This is a float value, where a radius of 0 will result in no effect being applied,\nand a radius of 1 will result in a strong bokeh. However, you can exceed this value\nfor even stronger effects."),
        amount: z.number().default(1).optional().describe("The amount, or strength, of the bokeh effect."),
        contrast: z.number().default(0.2).optional().describe("The color contrast, or brightness, of the bokeh effect."),
        isTiltShift: z.boolean().default(false).optional().describe("Is this a Tilt Shift effect or a standard bokeh effect?"),
        blurX: z.number().default(1).optional().describe("If a Tilt Shift effect this controls the amount of horizontal blur. Setting this value on a non-Tilt Shift effect will have no effect."),
        blurY: z.number().default(1).optional().describe("If a Tilt Shift effect this controls the amount of vertical blur. Setting this value on a non-Tilt Shift effect will have no effect."),
        strength: z.number().default(1).optional().describe("If a Tilt Shift effect this controls the strength of the blur. Setting this value on a non-Tilt Shift effect will have no effect."),
    };
}

export function BlendFilterComponent() {

    return {
        blendMode: z.number().default(BlendModes.NORMAL).optional().describe("The blend mode of the game object. It defines how the game object is blended with the background. The default value is `NORMAL`."),
        amount: z.number().default(1).optional().describe("The amount of the blend effect to apply to the view. At 0, the original image is preserved. At 1, the blend texture is fully applied."),
        color: z.string().default("#ffffff").optional().describe("The color of the blend effect. The default value is #ffffff, which means no color change."),
        texture: z.object({
            key: z.string().describe("The texture to be used for the blend effect. You can only use a whole texture, not a frame from a texture atlas or sprite sheet.")
        }).optional(),
    };
}

export function MaskFilterComponent() {

    return {
        invert: z.boolean().default(false).optional().describe("Whether to invert the mask.\nAn inverted mask switches what it hides and what it shows."),
    };
}

export function ObjectMaskFilterComponent() {

    return {
        maskObjectId: z.string().optional().describe("The `id` of the game object to use as a mask for the filter."),
    };
}

export function ThresholdComponent() {

    return {
        edge1: z.array(z.number()).length(4).default([0.5, 0.5, 0.5, 0.5]).optional().describe("The first edge of the threshold.\nThis contains the lowest value for each channel."),
        edge2: z.array(z.number()).length(4).default([0.5, 0.5, 0.5, 0.5]).optional().describe("The second edge of the threshold.\nThis contains the highest value for each channel.\nIf it is the same as the first edge, the threshold is a single value."),
        invert: z.array(z.number()).length(4).default([0, 0, 0, 0]).optional().describe("Whether each channel is inverted."),
    };
}

export const ColorMatrixOperationType = [
    "NOP",
    "SET_MATRIX",
    "SET_BRIGHTNESS",
    "SET_SATURATE",
    "SET_HUE",
    "SET_GRAYSCALE",
    "SET_CONTRAST",
    "SET_NIGHT"
] as const;

export const ColorMatrixPreset = [
    "BLACK_WHITE",
    "NEGATIVE",
    "DESATURATE_LUMINANCE",
    "SEPIA",
    "LSD",
    "BROWN",
    "VINTAGE",
    "KODACHROME",
    "TECHNICOLOR",
    "POLAROID",
    "SHIFT_BGR"
] as const;

export function ColorMatrixComponent() {

    return {
        operationType: z.enum(ColorMatrixOperationType).default("NOP").optional().describe("The type of operation to perform."),
        alpha: z.number().default(1).optional().describe("The value that determines how much of the original color is used when mixing the colors. A value between 0 (all original) and 1 (all final). Used when the `operationType` is not `NOP`."),
        matrixPreset: z.enum(ColorMatrixPreset).optional().describe("The matrix preset. Used when the `operationType` is `SET_MATRIX`."),
        brightness: z.number().default(0).optional().describe("The amount of brightness to apply to this ColorMatrix. Between 0 (black) and 1. Used when the `operationType` is `SET_BRIGHTNESS`."),
        saturate: z.number().default(0).optional().describe("The amount of saturation to apply to this ColorMatrix. Used when the `operationType` is `SET_SATURATE`."),
        hueRotation: z.number().default(0).optional().describe("The amount of hue rotation to apply to this ColorMatrix, in degrees. Used when the `operationType` is `SET_HUE`."),
        grayscale: z.number().default(1).optional().describe("The grayscale scale (0 is black). Used when the `operationType` is `SET_GRAYSCALE`."),
        contrast: z.number().default(0).optional().describe("The amount of contrast to apply to this ColorMatrix. Used when the `operationType` is `SET_CONTRAST`."),
        nightIntensity: z.number().default(0.1).optional().describe("The intensity of this effect. Used when the `operationType` is `SET_NIGHT`."),
    };
}

export const FilterTypes = [
    {
        type: "Glow",
        schema: {
            ...FilterComponent(),
            ...GlowFilterComponent()
        }
    },
    {
        type: "Shadow",
        schema: {
            ...FilterComponent(),
            ...ShadowFilterComponent()
        }
    },
    {
        type: "Pixelate",
        schema: {
            ...FilterComponent(),
            ...PixelateFilterComponent()
        }
    },
    {
        type: "Blur",
        schema: {
            ...FilterComponent(),
            ...BlurFilterComponent()
        }
    },
    {
        type: "Barrel",
        schema: {
            ...FilterComponent(),
            ...BarrelFilterComponent()
        }
    },
    {
        type: "Displacement",
        schema: {
            ...FilterComponent(),
            ...DisplacementFilterComponent()
        }
    },
    {
        type: "Bokeh",
        schema: {
            ...FilterComponent(),
            ...BokehFilterComponent()
        }
    },
    {
        type: "Blend",
        schema: {
            ...FilterComponent(),
            ...BlendFilterComponent()
        }
    },
    {
        type: "ObjectMask",
        schema: {
            ...FilterComponent(),
            ...MaskFilterComponent(),
            ...ObjectMaskFilterComponent()
        }
    },
    {
        type: "TextureMask",
        schema: {
            ...FilterComponent(),
            ...MaskFilterComponent(),
            ...TextureComponent(),
        }
    },
    {
        type: "Threshold",
        schema: {
            ...FilterComponent(),
            ...ThresholdComponent()
        }
    },
    {
        type: "ColorMatrix",
        schema: {
            ...FilterComponent(),
            ...ColorMatrixComponent()
        }
    }
];

export function defineFilterTools(manager: IToolsManager) {

    const TYPES = FilterTypes.map(f => f.type) as any;

    manager.defineTool("scene-add-game-object-filters", "Add multiple filters to parent game objects in the scene", {
        ...SceneId(),
        objects: z.array(z.object({
            type: z.enum(TYPES),
            parentId: z.string().describe(`The \`id\` of the game object to add the filter to.`),
            properties: z.record(z.any()).describe("The properties of the filter to add. Look the system prompt for filter definitions."),
        }))
    },
        z.object({
            ...SceneId(),
            objects: z.array(
                z.discriminatedUnion("type",
                    FilterTypes.map(filter => z.object({
                        type: z.literal(filter.type),
                        parentId: z.string(),
                        properties: z.object(filter.schema)
                    })) as any))
        }));

    manager.defineTool("scene-update-game-object-filters", "Add multiple filters to parent game objects in the scene", {
        ...SceneId(),
        objects: z.array(z.object({
            id: z.string().describe(`The \`id\` of the filter to update.`),
            type: z.enum(TYPES), // for validation only
            internal: z.boolean().default(true).optional().describe("If add it to the internal filter list of the game object. The internal filters are rendered in the space of the object. You should set padding values to make space for the filter effect. If set to `false`, the filter is added to the scene's filter list and is rendered in the space of the whole scene."),
            properties: z.record(z.any()).describe("The properties of the filter to add. Look the system prompt for filter definitions."),
        }))
    },
        z.object({
            ...SceneId(),
            objects: z.array(
                z.discriminatedUnion("type",
                    FilterTypes.map(filter => z.object({
                        type: z.literal(filter.type),// for validation only
                        id: z.string(),
                        internal: z.boolean(),
                        properties: z.object(filter.schema)
                    })) as any))
        }));

    manager.defineTool("scene-delete-game-object-filters", "Delete the given filters from the scene.", {
        ...SceneId(),
        filterIds: z.array(z.string()).describe("The `id`s of the filters to delete.")
    });

    manager.defineTool("scene-update-game-object-filter-list", "Update the list where the filter is placed. A filter could be on the internal or external filter list. The internal filters are rendered in the game object space. The external filters are rendered in the camera space.", {
        ...SceneId(),
        filterId: z.string().describe("The `id` of the filter to update."),
        internal: z.boolean().describe("If `true`, the filter is added to the internal filter list of the game object. If `false`, the filter is added to the scene's filter list.")
    });
}