import { defineAssetTools } from "./assets/assets-tools.js";
import { IToolsManager } from "./IToolsManager.js";
import { defineSceneTools } from "./scene/scene-tools.js";

export function defineTools(manager: IToolsManager) {

    defineAssetTools(manager);
    defineSceneTools(manager);
}