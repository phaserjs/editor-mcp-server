import z from "zod";
import { defineTool } from "../../utils.js";
import { SceneId } from "./common.js";
import { defineFilterTools } from "./filters.js";
import { defineArcadePhysicsTools } from "./arcade.js";
import { defineGameObjectTools } from "./gameobjects.js";
import { definePlainObjectTools } from "./plainobjects.js";
import { defineEditableTilemapTools } from "./editable-tilemap-tools.js";
import { defineObjectListTools } from "./objectlist.js";
import { defineSceneIDETools } from "./scene-ide-tools.js";
import { definePrefabTools } from "./prefab.js";

export function defineSceneTools() {

    defineSceneIDETools();

    defineTool("scene-clear-scene", "Clear the current scene.", {
        ...SceneId()
    });

    defineTool("scene-get-scene-dimension", "Get the dimensions of the current scene.", {
        ...SceneId()
    });

    defineTool("scene-get-screenshot", "Get a screenshot of the scene.", {
        ...SceneId(),
        x: z.number().describe("The x coordinate of the top left corner of the screenshot."),
        y: z.number().describe("The y coordinate of the top left corner of the screenshot."),
        width: z.number().describe("The width of the screenshot."),
        height: z.number().describe("The height of the screenshot."),
    });

    defineTool("scene-get-scene-data", "Get all objects in the current scene, including their properties.", {
        ...SceneId()
    });

    definePrefabTools();

    defineEditableTilemapTools();

    defineFilterTools();

    defineArcadePhysicsTools();

    defineObjectListTools();

    defineGameObjectTools();

    definePlainObjectTools();
}
