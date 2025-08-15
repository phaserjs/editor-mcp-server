import z from "zod";
import { defineTool } from "../../utils.js";

export function definePrefabTools() {

    defineTool("ide-create-new-prefab-scene", "Create a new special scene that is a prefab. A prefab is a scene with a single game object (the prefab object) and its children. You can create a prefab instance and add it to a scene or another prefab. That's the idea of prefabs, create reusable objects. It is very common to create a prefab for every entity of the game, like the player, the different enemies, non-player characters, platforms, collectibles and many more. A prefab scene is compiled as a subclass of a game object, not as a Phaser.Scene. You can think about a prefab as a custom game object class. Even, you can create a prefab that is variant of another prefab. This means, a prefab that inherits another prefab. To create a prefab variant, just use another prefab instance as root of the prefab scene, as prefab object. This tool only creates an empty prefab scene, you must add the prefab object to the scene, immediately. The goal of a prefab is to instantiate and add it to other scenes.", {
        name: z.string().describe("The name of the prefab scene file. It is not a full name, just the name. The extension will be added automatically."),
    });

    defineTool("ide-get-all-prefabs-in-project", "Get all prefabs in the project.", {});

    defineTool("ide-get-prefab-inheritance", "Get an array of all the prefabs that are part of the inheritance of the given prefab. A prefab can inherit another prefab. We call it a prefab variant. If the result is an empty array it means the given prefab is not a variant any other prefab.", {
        prefabId: z.string().describe("The ID of the prefab scene to get the inheritance from. The `prefabId` is the same of the id of referring prefab scene."),
    });
}