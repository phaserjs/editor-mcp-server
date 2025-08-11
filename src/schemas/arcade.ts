import z from "zod";
import { defineTool } from "../utils.js";
import { SceneId } from "./components.js";

enum PhysicsType {
    DYNAMIC_BODY = 0,
    STATIC_BODY = 1
}

enum BodyGeometry {
    CIRCLE = 0,
    RECTANGLE = 1,
}

export function ArcadeComponent() {

    return {
        "ArcadeComponent.active": z.boolean().default(false).readonly().optional().describe("Whether the arcade component is active or not. When the Arcade component is active it means the game object has a Phaser Arcade Physics body. To enable a physics body, use the scene-enable-arcade-physics-body tool. To disable a physics body, use the scene-disable-arcade-physics-body tool. This property is readonly and cannot be set directly."),
        physicsType: z.nativeEnum(PhysicsType).default(PhysicsType.DYNAMIC_BODY).optional().describe("The type of physics body to create for the Arcade Physics component. DYNAMIC_BODY (0) is a body that can move and be affected by forces, STATIC_BODY (1) is a body that does not move and is not affected by forces."),
        bodyGeometry: z.nativeEnum(BodyGeometry).default(BodyGeometry.RECTANGLE).optional().describe("The geometry of the physics body to create for the Arcade Physics component. CIRCLE (0) is a circular body, RECTANGLE (1) is a rectangular body."),
        radius: z.number().default(0).optional().describe("The radius of the physics body if the bodyGeometry is CIRCLE. This is ignored if the bodyGeometry is RECTANGLE."),
        "body.width": z.number().default(0).optional().describe("The width of the physics body if the bodyGeometry is RECTANGLE. This is ignored if the bodyGeometry is CIRCLE."),
        "body.height": z.number().default(0).optional().describe("The height of the physics body if the bodyGeometry is RECTANGLE. This is ignored if the bodyGeometry is CIRCLE."),
        "body.offset.x": z.number().default(0).optional().describe("The x offset of the physics body from the game object. This is used to position the physics body relative to the game object. When the bodyGeometry is CIRCLE, this is the offset from the center of the game object to the center of the circle. When the bodyGeometry is RECTANGLE, this is the offset from the top-left corner of the game object to the top-left corner of the rectangle."),
        "body.offset.y": z.number().default(0).optional().describe("The y offset of the physics body from the game object. This is used to position the physics body relative to the game object. Read the description of body.offset.x for more information about how this works."),
    }
}


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