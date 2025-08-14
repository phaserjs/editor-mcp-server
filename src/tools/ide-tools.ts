import { z } from "zod";
import { defineTool } from "../utils.js";
import { SceneId } from "./scene/common.js";

export function defineIDETools() {

    defineTool("ide-get-all-scenes-in-project", "Get all scenes in the project.", {});

    defineTool("ide-get-active-scene", "Get the scene has the focus in the editor. The active scene is the one the user is working at the moment. It may be happen there isn't an active scene.", {});

    defineTool("ide-open-scene", "Open the scene in the editor.", {
        ...SceneId()
    });

    defineTool("ide-create-new-scene", "Create a new scene file. This tool only creates a new scene. If the user wants to show the scene in the game then the user has to add the scene first to the game instance.", {
        name: z.string().describe("The name of the scene file. It is not a full name, just the name. The extension will be added automatically."),
    });

    defineTool("ide-save-scene", "Save the the editor of the given scene. This tool should be used only if the user requests it explicity, or if you need that the editor generates the code of the scene. It is important to keep both the scene content and the scene's code file in sync if you are working in both files at the same time.", {
        ...SceneId(),
    });

    defineTool("ide-create-new-prefab-scene", "Create a new special scene that is a prefab. A prefab is a scene with a single game object (the prefab object) and its children. You can create a prefab instance and add it to a scene or another prefab. That's the idea of prefabs, create reusable objects. It is very common to create a prefab for every entity of the game, like the player, the different enemies, non-player characters, platforms, collectibles and many more. A prefab scene is compiled as a subclass of a game object, not as a Phaser.Scene. You can think about a prefab as a custom game object class. Even, you can create a prefab that is variant of another prefab. This means, a prefab that inherits another prefab. To create a prefab variant, just use another prefab instance as root of the prefab scene, as prefab object. This tool only creates an empty prefab scene, you must add the prefab object to the scene, immediately. The goal of a prefab is to instantiate and add it to other scenes.", {
        name: z.string().describe("The name of the prefab scene file. It is not a full name, just the name. The extension will be added automatically."),
    });
}