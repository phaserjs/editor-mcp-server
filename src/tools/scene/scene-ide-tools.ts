import z from "zod";
import { SceneId } from "./common.js";
import { IToolsManager } from "../IToolsManager.js";

export function defineSceneIDETools(manager: IToolsManager) {

    manager.defineTool("ide-get-all-scenes-in-project", "Get all scenes in the project.", {});

    manager.defineTool("ide-get-active-scene", "Get the scene has the focus in the editorÍ. The active scene is the one the user is working at the moment. It may be happen there isn't an active scene.", {});

    manager.defineTool("ide-open-scene", "Open the scene in the editor.", {
        ...SceneId()
    });

    manager.defineTool("ide-create-new-scene", "Create a new scene file. This tool only creates a new scene. If the user wants to show the scene in the game then the user has to add the scene first to the game instance.", {
        name: z.string().describe("The name of the scene file. It is not a full name, just the name. The extension will be added automatically."),
    });

    manager.defineTool("ide-save-scene", "Save the the editor of the given scene. When the scene is saved, the editor generates its code. Use this tool to sync the scene with the code it represents. It is important to keep both the scene content and the scene's code file in sync if you are working in both files at the same time. Also, it is very important that you save prefab scenes after changing them, so the changes can be propagated in all the scenes that contains the instances of the prefab.", {
        ...SceneId(),
    });
}