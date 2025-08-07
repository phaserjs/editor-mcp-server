import z from "zod";
import { SceneId, TextureComponent, VariableComponent } from "./components.js";
import { defineTool } from "../utils.js";

function FilterComponent() {

    return {
        paddingLeft: z.number().default(0).optional().describe("The padding to apply to the left side of the filter. This is useful for filters that need extra space on the left side. Often it uses negative values to create a space for the filter effect."),
        paddingRight: z.number().default(0).optional().describe("The padding to apply to the right side of the filter. This is useful for filters that need extra space on the right side."),
        paddingTop: z.number().default(0).optional().describe("The padding to apply to the top side of the filter. This is useful for filters that need extra space on the top side. Often it uses negative values to create a space for the filter effect."),
        paddingBottom: z.number().default(0).optional().describe("The padding to apply to the bottom side of the filter. This is useful for filters that need extra space on the bottom side."),
    }
}

function GlowComponent() {

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

function ShadowComponent() {

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

function PixelateComponent() {

    return {
        amount: z.number().default(1).optional().describe("The amount of pixelation to apply. The size of the pixels is equal to 2 + the amount."),
    };
}

function BlurComponent() {

    return {
        x: z.number().default(2).optional().describe("The horizontal offset of the blur effect."),
        y: z.number().default(2).optional().describe("The vertical offset of the blur effect."),
        strength: z.number().default(1).optional().describe("The strength of the blur effect."),
        color: z.string().default("#ffffff").optional().describe("The color of the blur as a hex string."),
        steps: z.number().default(4).optional().describe("The number of steps to run the Blur effect for. This value should always be an integer. The higher the value, the smoother the blur,\nbut at the cost of exponentially more gl operations. Keep this to the lowest possible number you can have it, while\nstill looking correct for your game."),
    };
}

function BarrelComponent() {

    return {
        amount: z.number().default(1).optional().describe("The amount of distortion applied to the barrel effect. Typically keep this within the range 1 (no distortion) to +- 1."),
    };
}

function DisplacementComponent() {

    return {
        x: z.number().default(0.005).optional().describe("The amount of horizontal displacement to apply.\nThe maximum horizontal displacement in pixels is `x` multiplied by 0.5 times the width of the camera rendering the filter."),
        y: z.number().default(0.005).optional().describe("The amount of vertical displacement to apply.\nThe maximum vertical displacement in pixels is `y` multiplied by 0.5 times the height of the camera rendering the filter."),
        texture: z.object({
            key: z.string().describe("The texture to be used for the displacement effect. You can only use a whole texture, not a frame from a texture atlas or sprite sheet.")
        }),
    };
}

function BokehComponent() {

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

const FilterTypes = [
    {
        type: "Glow",
        schema: {
            ...FilterComponent(),
            ...GlowComponent()
        }
    },
    {
        type: "Shadow",
        schema: {
            ...FilterComponent(),
            ...ShadowComponent()
        }
    },
    {
        type: "Pixelate",
        schema: {
            ...FilterComponent(),
            ...PixelateComponent()
        }
    },
    {
        type: "Blur",
        schema: {
            ...FilterComponent(),
            ...BlurComponent()
        }
    }
    ,
    {
        type: "Barrel",
        schema: {
            ...FilterComponent(),
            ...BarrelComponent()
        }
    }
    ,
    {
        type: "Displacement",
        schema: {
            ...FilterComponent(),
            ...DisplacementComponent()
        }
    }
    ,
    {
        type: "Bokeh",
        schema: {
            ...FilterComponent(),
            ...BokehComponent()
        }
    }
];

export function defineFilterTools() {

    const unionElements_add = FilterTypes.map((filterType) => {

        return z.object({
            type: z.literal(filterType.type),
            args: z.object({
                parentId: z.string().describe(`The \`id\` of the game object to add the ${filterType.type} filter to.`),
                label: z.string().describe("Label of the filter. It is used to name the filter in the scene and as the variable name in code."),
                internal: z.boolean().default(true).optional().describe("If add it to the internal filter list of the game object. The internal filters are rendered in the space of the object. You should set padding values to make space for the filter effect. If set to `false`, the filter is added to the scene's filter list and is rendered in the space of the whole scene."),
                ...VariableComponent(),
                ...filterType.schema as any
            })
        })
    });

    defineTool("scene-add-game-object-filters", "Add multiple filters to parent game objects in the scene", {
        ...SceneId(),
        objects: z.array(z.discriminatedUnion("type", unionElements_add as any)).describe("The filters to add to the game objects.")
    });

    const unionElements_update = FilterTypes.map((filterType) => {

        const type = filterType.type;

        return z.object({
            type: z.literal(type),
            args: z.object({
                id: z.string().describe(`The \`id\` of the ${type} filter to update.`),
                label: z.string().optional().describe("Label of the filter. It is used to name the object in the scene and as the variable name in code."),
                ...filterType.schema as any
            })
        })
    });

    defineTool("scene-update-game-object-filters", "Update multiple filters of a game object.", {
        ...SceneId(),
        objects: z.array(z.discriminatedUnion("type", unionElements_update as any)).describe("The filter objects to update.")
    });

    defineTool("scene-delete-game-object-filters", "Delete the given filters from the scene.", {
        ...SceneId(),
        filterIds: z.array(z.string()).describe("The `id`s of the filters to delete.")
    });

    defineTool("scene-update-game-object-filter-list", "Update the list where the filter is placed. A filter could be on the internal or external filter list. The internal filters are rendered in the game object space. The external filters are rendered in the camera space.", {
        ...SceneId(),
        filterId: z.string().describe("The `id` of the filter to update."),
        internal: z.boolean().describe("If `true`, the filter is added to the internal filter list of the game object. If `false`, the filter is added to the scene's filter list.")
    });
}