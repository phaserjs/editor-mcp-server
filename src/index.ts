import { defineAssetTools } from "./assets-tools.js";
import { startServer } from "./utils.js";
import { defineSceneTools } from "./scene-tools.js";
import { defineAnimationsTools } from "./animations-tools.js";

defineSceneTools();

defineAssetTools();

// TODO: not for now
// defineAnimationsTools();

startServer().catch((error) => {

    console.error("Fatal error in main():", error);

    process.exit(1);
});