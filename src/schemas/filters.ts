import z from "zod";
import { SceneId, VariableComponent } from "./components.js";
import { defineTool } from "../utils.js";

function FilterComponent() {

    return {
        paddingLeft: z.number().default(0).optional().describe("The padding to apply to the left side of the filter. This is useful for filters that need extra space on the left side."),
        paddingRight: z.number().default(0).optional().describe("The padding to apply to the right side of the filter. This is useful for filters that need extra space on the right side."),
        paddingTop: z.number().default(0).optional().describe("The padding to apply to the top side of the filter. This is useful for filters that need extra space on the top side."),
        paddingBottom: z.number().default(0).optional().describe("The padding to apply to the bottom side of the filter. This is useful for filters that need extra space on the bottom side."),
        internal: z.boolean().default(true).optional().describe("If add it to the internal filter list of the game object. The internal filters are rendered in the space of the object. You should set padding values to make space for the filter effect. If set to `false`, the filter is added to the scene's filter list and is rendered in the space of the whole scene."),
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

const FilterTypes = [
    {
        type: "Glow",
        schema: {
            ...FilterComponent(),
            ...GlowComponent()
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
}