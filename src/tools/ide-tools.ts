import { z } from "zod";
import { defineTool } from "../utils.js";
import { SceneId } from "../schemas/components.js";

export function defineIDETools() {

    defineTool("ide-get-all-scenes-in-project", "Get all scenes in the project.", {});

    defineTool("ide-get-active-scene", "Get the scene has the focus in the editor. The active scene is the one the user is working at the moment. It may be happen there isn't an active scene.", {});

    defineTool("ide-open-scene", "Open the scene in the editor.", {
        ...SceneId()
    });

    defineTool("ide-create-new-scene", "Create a new scene file.", {
        name: z.string().describe("The name of the scene file. It is not a full name, just the name. The extension will be added automatically."),
    });

    defineTool("ide-save-active-scene", "Save the active scene. The active scene is the one is open and focused and the user is working with. This tool should be used only if the user requests it explicity.", {
        ...SceneId()
    });
}