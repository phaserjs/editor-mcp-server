import { z } from "zod";
import { defineTool } from "./utils.js";

export function defineIDETools() {

    defineTool("ide-get-all-scenes-in-project", "Get all scenes in the project.", {});

    defineTool("ide-get-active-scene", "Get the scene has the focus in the editor. The active scene is the one the user is working at the moment. It may be happen there isn't an active scene.", {});

    defineTool("ide-open-scene", "Open the scene in the editor.", {
        sceneId: z.string().describe("The `id` of the scene")
    });
}