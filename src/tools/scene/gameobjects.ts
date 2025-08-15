import z from "zod";
import { BitmapTextComponent } from "./bitmaptext.js";
import { AlphaComponent, AlphaSingleComponent, BlendModeComponent, BlendModes, FlipComponent, OriginComponent, SceneId, SingleTintComponent, SizeComponent, SpriteComponent, TextureComponent, TileSpriteComponent, TintComponent, TransformComponent, VariableComponent, VisibleComponent } from "./common.js";
import { NineSliceComponent, ThreeSliceComponent } from "./nineslice.js";
import { ParticleEmitterComponent } from "./particles.js";
import { EllipseComponent, PolygonComponent, ShapeComponent, TriangleComponent } from "./shape.js";
import { SpineComponent } from "./spine.js";
import { TextComponent } from "./text.js";
import { TilemapLayerComponent } from "./tilemap.js";
import { defineTool } from "../../utils.js";


export const GameObjectTypes = [
    {
        type: "Image",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...FlipComponent(),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...TextureComponent(),
        }
    },
    {
        type: "Sprite",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...FlipComponent(),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...TextureComponent(),
            ...SpriteComponent()
        }
    },
    {
        type: "TileSprite",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...FlipComponent(),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...TextureComponent(),
            ...TileSpriteComponent()
        }
    },
    {
        type: "NineSlice",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...TextureComponent(),
            ...SingleTintComponent(),
            ...SizeComponent(),
            ...NineSliceComponent()
        }
    },
    {
        type: "ThreeSlice",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...SingleTintComponent(),
            ...TextureComponent(),
            ...SizeComponent(),
            ...ThreeSliceComponent()
        }
    },
    {
        type: "Text",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...FlipComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...TextComponent(),
        }
    },
    {
        type: "Layer",
        schema: {
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(BlendModes.SKIP_CHECK),
        }
    },
    {
        type: "Container",
        schema: {
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(BlendModes.SKIP_CHECK),
            ...TransformComponent(),
        }
    },
    {
        type: "BitmapText",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(0),
            ...VisibleComponent(),
            ...AlphaComponent(),
            ...BlendModeComponent(),
            ...TintComponent(),
            ...BitmapTextComponent(),
        }
    },
    {
        type: "Rectangle",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...ShapeComponent(),
            ...BlendModeComponent(),
            ...SizeComponent()
        }
    },
    {
        type: "Ellipse",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...ShapeComponent(),
            ...SizeComponent(),
            ...BlendModeComponent(),
            ...EllipseComponent()
        }
    },
    {
        type: "Triangle",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...ShapeComponent(),
            ...TriangleComponent()
        }
    },
    {
        type: "Polygon",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...ShapeComponent(),
            ...PolygonComponent()
        }
    },
    {
        type: "ParticleEmitter",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...ParticleEmitterComponent()
        }
    },
    {
        type: "SpineGameObject",
        schema: {
            ...TransformComponent(),
            ...VisibleComponent(),
            ...BlendModeComponent(),
            ...SpineComponent()
        }
    },
    {
        type: "TilemapLayer",
        schema: {
            ...TransformComponent(),
            ...VisibleComponent(),
            ...TilemapLayerComponent()
        }
    },
    {
        type: "EditableTilemapLayer",
        updateOnly: true,
        schema: {
            ...TransformComponent(),
            ...VisibleComponent(),
            ...BlendModeComponent(),
        }
    }
];

export function PrefabComponent() {

    return {
        prefabId: z.string().optional().describe("The ID of a prefab scene. If provided, then an instanceof the prefab is created. The `type` property should match with the built-in type of the prefab."),
        unlock: z.array(z.string()).optional().describe("An array of the properties to unlock in the prefab instance. If not provided, all properties are locked. This is useful to create a prefab instance that can be modified in the scene editor. A simple case is that most of the time you would like to unlock the `x` and `y` properties of thew prefab instance, so you can place it in a different position."),
    };
}


export function defineGameObjectTools() {

    defineTool("scene-move-game-object-in-render-list", "Sort objects in the current scene.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to sort."),
        move: z.enum(["Up", "Down", "Top", "Bottom"]).describe("Move the objects upm down, top, or bottom in the render list."),
    });

    defineTool("scene-delete-game-objects", "Delete the given game objects from the scene.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the game objects to delete.")
    });

    defineTool("scene-move-game-objects-to-parent", "Move the given objects to the given parent.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
        parentId: z.string().optional().describe("The `id` of the parent to move the objects to. If no parent is given, the objects will be moved to the root of the scene."),
    });

    defineTool("scene-pack-objects-in-container", "Create a container to group the given objects. The container and objects are positioned so the container size is minimal.", {
        ...SceneId(),
        objectIds: z.array(z.string()).describe("The `id`s of the objects to move."),
    });

    const unionElements_add = GameObjectTypes.filter(t => !t.updateOnly).map((gameObjectType) => {

        return z.object({
            type: z.literal(gameObjectType.type).describe("The type of the game object to add."),
            label: z.string().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
            ...PrefabComponent(),
            ...VariableComponent(),
            ...gameObjectType.schema as any
        })
    });

    defineTool("scene-add-game-objects", "Add multiple new game objects to the scene. If you are adding prefab instances, then you should include the `unlock` property which contains an array of the name of the properties you are setting to the object. By default, are properties are locked in a prefab instance, so you need to unlock them before setting them, otherwise, the prefab instance will get the values defined originally in the prefab scene.", {
        ...SceneId(),
        objects: z.array(z.discriminatedUnion("type", unionElements_add as any)).describe("The game objects to add to the scene.")
    });

    const unionElements_update = GameObjectTypes.map((gameObjectType) => {

        return z.object({
            type: z.literal(gameObjectType.type).describe("The type of the game object to update. This is used only for discriminating the type of the game object."),
            id: z.string().describe(`The \`id\` of the game object to update.`),
            label: z.string().optional().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
            ...VariableComponent(),
            ...PrefabComponent(),
            ...gameObjectType.schema as any
        });
    });

    defineTool("scene-update-game-objects", "Update multiple game objects in the scene. If you are updating prefab instances, then you should include the `unlock` property which contains an array of the name of the properties you are setting to the object. By default, are properties are locked in a prefab instance, so you need to unlock them before setting them, otherwise, the prefab instance will get the values defined originally in the prefab scene. It is important that you be smart when setting the unlock property, because its value will override the unlock state of the object. This means, if you are going to update a property but want to keep the values of the other properties unlocked in the prefab instance then you have to include them in your update arguments.", {
        ...SceneId(),
        objects: z.array(z.discriminatedUnion("type", unionElements_update as any)).describe("The game objects to add to the scene.")
    });
}