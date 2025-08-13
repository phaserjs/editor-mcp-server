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
}