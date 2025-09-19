import z from "zod";
import { BitmapTextComponent } from "./bitmaptext.js";
import { AlphaComponent, AlphaSingleComponent, BlendModeComponent, BlendModes, FlipComponent, LabelComponent, OriginComponent, ParentComponent, SceneId, SingleTintComponent, SizeComponent, SpriteComponent, TextureComponent, TileSpriteComponent, TintComponent, TransformComponent, VariableComponent, VisibleComponent } from "./common.js";
import { NineSliceComponent, ThreeSliceComponent } from "./nineslice.js";
import { ParticleEmitterComponent } from "./particles.js";
import { EllipseComponent, PolygonComponent, ShapeComponent, TriangleComponent } from "./shape.js";
import { SpineComponent } from "./spine.js";
import { TextComponent } from "./text.js";
import { TilemapLayerComponent } from "./tilemap.js";
import { ArcadeComponent } from "./arcade.js";
import { IToolsManager } from "../IToolsManager.js";


export const GameObjectTypes = [
    {
        type: "Image",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...OriginComponent(),
            ...FlipComponent(),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...TextureComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "Sprite",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...SpriteComponent(),
            ...TextureComponent(),
            ...OriginComponent(),
            ...FlipComponent(),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "TileSprite",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...TileSpriteComponent(),
            ...OriginComponent(),
            ...FlipComponent(),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...TextureComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "NineSlice",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...SizeComponent(),
            ...NineSliceComponent(),
            ...TextureComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...SingleTintComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "ThreeSlice",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...SizeComponent(),
            ...ThreeSliceComponent(),
            ...TextureComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...SingleTintComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "Text",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...TextComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...FlipComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "Layer",
        schema: {
            ...VariableComponent(),
            ...ParentComponent(),
            ...BlendModeComponent(BlendModes.SKIP_CHECK),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "Container",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...ParentComponent(),
            ...BlendModeComponent(BlendModes.SKIP_CHECK),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "BitmapText",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...BitmapTextComponent(),
            ...OriginComponent(0),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "Rectangle",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...ShapeComponent(),
            ...SizeComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "Ellipse",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...ShapeComponent(),
            ...SizeComponent(),
            ...EllipseComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "Triangle",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...ShapeComponent(),
            ...TriangleComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "Polygon",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...ShapeComponent(),
            ...PolygonComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "ParticleEmitter",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...ParticleEmitterComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "SpineGameObject",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...VisibleComponent(),
            ...BlendModeComponent(),
            ...SpineComponent(),
            ...ArcadeComponent()
        }
    },
    {
        type: "TilemapLayer",
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...VisibleComponent(),
            ...TilemapLayerComponent()
        }
    },
    {
        type: "EditableTilemapLayer",
        updateOnly: true,
        schema: {
            ...VariableComponent(),
            ...TransformComponent(),
            ...VisibleComponent(),
            ...BlendModeComponent(),
        }
    }
];

export function PrefabComponent() {

    return {
        prefabId: z.string().optional().describe("The ID of a prefab scene. If provided, then an instanceof the prefab is created. The `type` property should match with the built-in type of the prefab."),
        unlock: z.array(z.string()).optional().describe("An array of the properties to unlock in the prefab instance. If not provided, all properties are locked. This is useful to create a prefab instance that can be modified in the scene editor. A simple case is that most of the time you would like to unlock the `x` and `y` properties of thew prefab instance, so you can place it in a different position. You can use this field also to restore the default value of a property in a prefab instance. For example, if you have a prefab with a property `health` and you want to set it to the default value, then you can exclude the `health` property from the `unlock` list, and the object will get the `health` value defined in the prefab. In summary, if you are going to set a user property value, you should include its name in this `unlock` list, or exclude it if you want to restore the property's value to its default. Each prefab instance contains its own `unlock` field. If you want to change a nested prefab instance, you have to access it directly."),
        prefabProps: z.record(z.any()).optional().describe("An object with the values of the user defined properties to set in the prefab instance. If not provided, the prefab instance will be created with the default values defined in the prefab scene. Prefab properties are declared in the prefab scene. When a prefab extends another prefab it inherits all the user properties, so you have to check all the hierarchy of a prefab to know all the properties defined by the user. Also, you should look into the property type so you can make the values with the right format. User properties can be locked/unlocked, so if you are going to set a user property value, you should include its name in the `unlock` field. This is important, these are the properties of the prefab instance, not the properties of the nested prefab instances or any other children object. To change the property of nested prefab instances you have to access them directly and set the `prefabProps` in the nested prefab instance."),
    };
}


export function defineGameObjectTools(manager: IToolsManager) {

    manager.defineTool("scene-move-game-object-in-render-list", "Sort objects in the current scene.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to sort."),
        move: z.enum(["Up", "Down", "Top", "Bottom"]).describe("Move the objects upm down, top, or bottom in the render list."),
    });

    manager.defineTool("scene-delete-game-objects", "Delete the given game objects from the scene.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the game objects to delete.")
    });

    manager.defineTool("scene-move-game-objects-to-parent", "Move the given objects to the given parent.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
        parentId: z.string().optional().describe("The `id` of the parent to move the objects to. If no parent is given, the objects will be moved to the root of the scene."),
    });

    manager.defineTool("scene-pack-objects-in-container", "Create a container to group the given objects. The container and objects are positioned so the container size is minimal.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
    });

    const TYPES = [...GameObjectTypes.map(go => go.type)] as any;

    manager.defineTool("scene-add-game-objects", `Add multiple new game objects to the scene. If you are adding prefab instances, then you should include the "unlock" property which contains an array of the name of the properties you are setting to the object. By default, are properties are locked in a prefab instance, so you need to unlock them before setting them, otherwise, the prefab instance will get the values defined originally in the prefab scene.`, {
        ...SceneId(),
        objects: z.array(z.object({
            type: z.enum(TYPES),
            properties: z.record(z.any()).describe("The properties of the game object to add. You should provide all the required properties for creating the game object. The required properties are part of the class constructor of the game object class defined i the system prompt. You can provide a subset of the optional properties plus the required properties."),
        }))
    },
        z.object({
            ...SceneId(),
            objects: z.array(
                z.discriminatedUnion("type",
                    GameObjectTypes.map(go => z.object({
                        type: z.literal(go.type),
                        properties: z.object({
                            ...LabelComponent("required"),
                            ...go.schema
                        })
                    })) as any))
        }));

    manager.defineTool("scene-update-game-objects", `Update multiple game objects in the scene. If you are updating prefab instances, then you should include the "unlock" property which contains an array of the name of the properties you are setting to the object. By default, are properties are locked in a prefab instance, so you need to unlock them before setting them, otherwise, the prefab instance will get the values defined originally in the prefab scene. It is important that you be smart when setting the unlock property, because its value will override the unlock state of the object. This means, if you are going to update a property but want to keep the values of the other properties unlocked in the prefab instance then you have to include them in your update arguments.`, {
        ...SceneId(),
        objects: z.array(z.object({
            id: z.string().describe("The `id` of the game object to update."),
            type: z.enum(TYPES), // provided for validation purposes
            properties: z.record(z.any()).describe("The properties of the game object to update. You can provide any subset of the properties, but should provide at least one property to update."),
        })).describe("The game objects to update in the scene.")
    },
        z.object({
            ...SceneId(),
            objects: z.array(
                z.discriminatedUnion("type",
                    GameObjectTypes.map(go => z.object({
                        type: z.literal(go.type),
                        id: z.string(),
                        properties: z.object({
                            ...LabelComponent("optional"),
                            ...go.schema
                        })
                    })) as any))
        }));
}
