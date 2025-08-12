import z from "zod";
import { SceneId } from "../schemas/components.js";
import { defineTool } from "../utils.js";

export function defineArcadePhysicsTools() {

    defineTool("scene-enable-arcade-physics-body", "Adds an Arcade physics body to the given game objects. To set the physics body properties you first have to create the body with this tool.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The IDs of the game objects to add the Arcade physics body to."),
    });

    defineTool("scene-disable-arcade-physics-body", "Removes the Arcade physics body from the given game objects.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The IDs of the game objects to remove the Arcade physics body from."),
    });
}