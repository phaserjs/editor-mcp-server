import z from "zod";
import { defineTool } from "../../utils.js";
import { SceneId, VariableComponent } from "./common.js";

function ObjectListComponent() {

    return {
        ...VariableComponent(),
        label: z.string().optional().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
        objectIds: z.array(z.string()).describe("The ids of the game objects in the list. The ids are used to reference the game objects in the scene."),
    };
}

export function defineObjectListTools() {

    defineTool("scene-add-object-list", "Create an Object List, which is an array with the ids of game objects. The user can use this array to group objects for a purpose. One of the most common purpose of objects lists are grouping the objects to be part of an arcade physics colliders.", {
        ...SceneId(),
        lists: z.array(z.object(ObjectListComponent())).describe("The object lists to add to the scene."),
    });

    defineTool("scene-update-object-list", "Update an Object List, which is an array with the ids of game objects.", {
        ...SceneId(),
        id: z.string().describe("The id of the object list to update."),
        ...ObjectListComponent()
    });

    defineTool("scene-remove-object-list", "Remove an Object List from the scene.", {
        ...SceneId(),
        listIds: z.array(z.string()).describe("The ids of the object lists to remove."),
    });
}