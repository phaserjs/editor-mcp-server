import z from "zod";
import { SceneId } from "./common.js";
import { IToolsManager } from "../IToolsManager.js";

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
        "body.physicsType": z.number().default(PhysicsType.DYNAMIC_BODY).optional().describe("The type of physics body to create for the Arcade Physics component. DYNAMIC_BODY (0) is a body that can move and be affected by forces, STATIC_BODY (1) is a body that does not move and is not affected by forces."),
        "body.geometry": z.number().default(BodyGeometry.RECTANGLE).optional().describe("The geometry of the physics body to create for the Arcade Physics component. CIRCLE (0) is a circular body, RECTANGLE (1) is a rectangular body."),
        "body.radius": z.number().default(0).optional().describe("If this Body is circular, this is the unscaled radius of the Body, as set by setCircle(), in source pixels.\nThe true radius is equal to `halfWidth`."),
        "body.width": z.number().default(0).optional().describe("The width of the physics body if the bodyGeometry is RECTANGLE. This is ignored if the bodyGeometry is CIRCLE."),
        "body.height": z.number().default(0).optional().describe("The height of the physics body if the bodyGeometry is RECTANGLE. This is ignored if the bodyGeometry is CIRCLE."),
        "body.offset.x": z.number().default(0).optional().describe("The offset of this Body's position from its Game Object's position, in source pixels."),
        "body.offset.y": z.number().default(0).optional().describe("The offset of this Body's position from its Game Object's position, in source pixels."),

        // velocity 
        "body.velocity.x": z.number().default(0).optional().describe("The Body's velocity, in pixels per second."),
        "body.velocity.y": z.number().default(0).optional().describe("The Body's velocity, in pixels per second."),
        // maxVelocity
        "body.maxVelocity.x": z.number().default(10000).optional().describe("The absolute maximum velocity of this body, in pixels per second.\nThe horizontal and vertical components are applied separately."),
        "body.maxVelocity.y": z.number().default(10000).optional().describe("The absolute maximum velocity of this body, in pixels per second.\nThe horizontal and vertical components are applied separately."),
        // acceleration
        "body.acceleration.x": z.number().default(0).optional().describe("The Body's change in velocity, in pixels per second squared."),
        "body.acceleration.y": z.number().default(0).optional().describe("The Body's change in velocity, in pixels per second squared."),
        // drag
        "body.drag.x": z.number().default(0).optional().describe("When `useDamping` is false (the default), this is absolute loss of velocity due to movement, in pixels per second squared.\n\nWhen `useDamping` is true, this is a damping multiplier between 0 and 1.\nA value of 0 means the Body stops instantly.\nA value of 0.01 mean the Body keeps 1% of its velocity per second, losing 99%.\nA value of 0.1 means the Body keeps 10% of its velocity per second, losing 90%.\nA value of 1 means the Body loses no velocity.\nYou can use very small values (e.g., 0.001) to stop the Body quickly.\n\nThe x and y components are applied separately.\n\nDrag is applied only when `acceleration` is zero."),
        "body.drag.y": z.number().default(0).optional().describe("When `useDamping` is false (the default), this is absolute loss of velocity due to movement, in pixels per second squared.\n\nWhen `useDamping` is true, this is a damping multiplier between 0 and 1.\nA value of 0 means the Body stops instantly.\nA value of 0.01 mean the Body keeps 1% of its velocity per second, losing 99%.\nA value of 0.1 means the Body keeps 10% of its velocity per second, losing 90%.\nA value of 1 means the Body loses no velocity.\nYou can use very small values (e.g., 0.001) to stop the Body quickly.\n\nThe x and y components are applied separately.\n\nDrag is applied only when `acceleration` is zero."),
        // bounce
        "body.bounce.x": z.number().default(0).optional().describe("Rebound following a collision, relative to 1."),
        "body.bounce.y": z.number().default(0).optional().describe("Rebound following a collision, relative to 1."),
        // gravity
        "body.gravity.x": z.number().default(0).optional().describe("Acceleration due to gravity (specific to this Body), in pixels per second squared.\nTotal gravity is the sum of this vector and the simulation's `gravity`."),
        "body.gravity.y": z.number().default(0).optional().describe("Acceleration due to gravity (specific to this Body), in pixels per second squared.\nTotal gravity is the sum of this vector and the simulation's `gravity`."),
        // allowGravity
        "body.allowGravity": z.boolean().default(true).optional().describe("Whether this Body's position is affected by gravity (local or world)."),
        // immovable
        "body.immovable": z.boolean().default(false).optional().describe("Whether this Body can be moved by collisions with another Body."),
        // mass
        "body.mass": z.number().default(1).optional().describe("The Body's inertia, relative to a default unit (1).\nWith `bounce`, this affects the exchange of momentum (velocities) during collisions."),
        // collideWorldBounds
        "body.collideWorldBounds": z.boolean().default(false).optional().describe("Whether this Body interacts with the world boundary."),
        // angularVelocity
        "body.angularVelocity": z.number().default(0).optional().describe("The rate of change of this Body's `rotation`, in degrees per second."),
        // angularAcceleration
        "body.angularAcceleration": z.number().default(0).optional().describe("The Body's angular acceleration (change in angular velocity), in degrees per second squared."),
        // angularDrag
        "body.angularDrag": z.number().default(0).optional().describe("Loss of angular velocity due to angular movement, in degrees per second.\n\nAngular drag is applied only when angular acceleration is zero."),
        // maxAngular
        "body.maxAngular": z.number().default(1000).optional().describe("The Body's maximum angular velocity, in degrees per second."),
        // enable / moves / speed / friction
        "body.enable": z.boolean().default(true).optional().describe("Whether this Body is updated by the physics simulation."),
        "body.moves": z.boolean().default(true).optional().describe("Whether the Body's position and rotation are affected by its velocity, acceleration, drag, and gravity."),
        "body.maxSpeed": z.number().default(-1).optional().describe("The maximum speed this Body is allowed to reach, in pixels per second.\n\nIf not negative it limits the scalar value of speed.\n\nAny negative value means no maximum is being applied (the default)."),
        "body.friction.x": z.number().default(1).optional().describe("If this Body is `immovable` and in motion, `friction` is the proportion of this Body's motion received by the riding Body on each axis, relative to 1.\nThe horizontal component (x) is applied only when two colliding Bodies are separated vertically.\nThe vertical component (y) is applied only when two colliding Bodies are separated horizontally.\nThe default value (1, 0) moves the riding Body horizontally in equal proportion to this Body and vertically not at all."),
        "body.friction.y": z.number().default(0).optional().describe("If this Body is `immovable` and in motion, `friction` is the proportion of this Body's motion received by the riding Body on each axis, relative to 1.\nThe horizontal component (x) is applied only when two colliding Bodies are separated vertically.\nThe vertical component (y) is applied only when two colliding Bodies are separated horizontally.\nThe default value (1, 0) moves the riding Body horizontally in equal proportion to this Body and vertically not at all."),
        "body.useDamping": z.boolean().default(false).optional().describe("If this Body is using `drag` for deceleration this property controls how the drag is applied.\nIf set to `true` drag will use a damping effect rather than a linear approach. If you are\ncreating a game where the Body moves freely at any angle (i.e. like the way the ship moves in\nthe game Asteroids) then you will get a far smoother and more visually correct deceleration\nby using damping, avoiding the axis-drift that is prone with linear deceleration.\n\nIf you enable this property then you should use far smaller `drag` values than with linear, as\nthey are used as a multiplier on the velocity. Values such as 0.05 will give a nice slow\ndeceleration."),
        "body.allowDrag": z.boolean().default(true).optional().describe("Whether this Body's velocity is affected by its `drag`."),
        "body.onWorldBounds": z.boolean().default(false).optional().describe("Whether the simulation emits a `worldbounds` event when this Body collides with the world boundary\n(and `collideWorldBounds` is also true)."),
        // checkCollision
        "body.checkCollision.none": z.boolean().default(false).optional().describe("Disable collision checks on all sides."),
        "body.checkCollision.up": z.boolean().default(true).optional().describe("Enable collision checks on the top side."),
        "body.checkCollision.down": z.boolean().default(true).optional().describe("Enable collision checks on the bottom side."),
        "body.checkCollision.left": z.boolean().default(true).optional().describe("Enable collision checks on the left side."),
        "body.checkCollision.right": z.boolean().default(true).optional().describe("Enable collision checks on the right side."),
        // rotation and pushable
        "body.allowRotation": z.boolean().default(true).optional().describe("Whether this Body's `rotation` is affected by its angular acceleration and angular velocity."),
        "body.pushable": z.boolean().default(true).optional().describe("Sets if this Body can be pushed by another Body.\n\nA body that cannot be pushed will reflect back all of the velocity it is given to the\ncolliding body. If that body is also not pushable, then the separation will be split\nbetween them evenly.\n\nIf you want your body to never move or seperate at all, see the `setImmovable` method.\n\nBy default, Dynamic Bodies are always pushable."),
        // overlap amounts
        "body.overlapX": z.number().default(0).optional().describe("The amount of horizontal overlap (before separation), if this Body is colliding with another."),
        "body.overlapY": z.number().default(0).optional().describe("The amount of vertical overlap (before separation), if this Body is colliding with another."),
        "body.overlapR": z.number().default(0).optional().describe("The amount of overlap (before separation), if this Body is circular and colliding with another circular body."),
    }
}

export function ColliderComponent() {

    return {
        object1: z.string().optional().describe("A valid javascript expression that returns the objects that are part of the collider. A collider tests `object1` against `object2`. It is very common that the expression points to the variable of a game object, like in `player`, a Layer's list (`myLayer.list`), a Container list (`myContainer.list`), or a game object list that groups other objects in the scene. Colliders are created at the end of the scene so you can reference the variable names of the game objects."),
        object2: z.string().optional().describe("A valid javascript expression that returns the objects that are part of the collider. Look the `object1` property for more information."),
        overlapOnly: z.boolean().default(false).optional().describe("If true, the collider will only check for overlap between the two objects. When it is overlap-only, the objects will not bounce off each other, but will still trigger the `collide` event if they overlap."),
        processCallback: z.string().optional().describe("A valid javascript expression that returns a function to be called when the collider detects a collision. The function will receive the two objects that are colliding as arguments. The function can return `true` to allow the collision to happen, or `false` to prevent it."),
        collideCallback: z.string().optional().describe("A valid javascript expression that returns a function to be called when the collider detects a collision. The function will receive the two objects that are colliding as arguments."),
        callbackContext: z.string().optional().describe("A valid javascript expression that returns the context in which the `processCallback` and `collideCallback` functions will be called. This is useful if you want to use `this` inside the callback functions to access properties or methods of a class or object. Most of the time you will use `this` to access the scene, like in `this` or `this.scene` in a context of a prefab."),
    };
}

export function defineArcadePhysicsTools(manager: IToolsManager) {

    manager.defineTool("scene-enable-arcade-physics-body", "Adds an Arcade physics body to the given game objects. To set the physics body properties you first have to create the body with this tool.", {
        ...SceneId(),
        updates: z.array(
            z.object({
                id: z.string().describe("The ID of the game object to add the Arcade physics body to."),
                //...ArcadeComponent(),
            })),
    });

    manager.defineTool("scene-disable-arcade-physics-body", "Removes the Arcade physics body from the given game objects.", {
        ...SceneId(),
        ids: z.array(z.string()).describe("The IDs of the game objects to remove the Arcade physics body from."),
    });

    // defineUpdatePropertiesTool("arcade-physics-body", "Arcade physics body", ArcadeComponent());
}