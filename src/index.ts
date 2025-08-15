#!/usr/bin/env node

import { defineAssetTools } from "./tools/assets-tools.js";
import { defineSceneTools } from "./tools/scene/scene-tools.js";
import { startServer } from "./utils.js";

defineSceneTools();

defineAssetTools();

// TODO: not for now
// defineAnimationsTools();

startServer().catch((error) => {

    console.error("Fatal error in main():", error);

    process.exit(1);
});