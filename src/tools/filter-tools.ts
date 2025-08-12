import z from "zod";
import { FilterTypes } from "../schemas/filters.js";
import { SceneId, VariableComponent } from "../schemas/components.js";
import { defineTool } from "../utils.js";

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
        });
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