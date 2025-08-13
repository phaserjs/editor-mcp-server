#!/usr/bin/env node

import { defineAssetTools } from "./tools/assets-tools.js";
import { defineIDETools } from "./tools/ide-tools.js";
import { defineSceneTools } from "./tools/scene/scene-tools.js";
import { startServer } from "./utils.js";

defineIDETools();

defineSceneTools();

defineAssetTools();

// TODO: not for now
// defineAnimationsTools();

startServer().catch((error) => {

    console.error("Fatal error in main():", error);

    process.exit(1);
});