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
            type: z.literal(gameObjectType.type),
            args: z.object({
                label: z.string().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
                ...VariableComponent(),
                ...gameObjectType.schema as any
            })
        })
    });

    defineTool("scene-add-game-objects", "Add multiple new game objects to the scene", {
        ...SceneId(),
        objects: z.array(z.discriminatedUnion("type", unionElements_add as any)).describe("The game objects to add to the scene.")
    });

    const unionElements_update = GameObjectTypes.map((gameObjectType) => {

        const type = gameObjectType.type;

        return z.object({
            type: z.literal(type),
            args: z.object({
                id: z.string().describe(`The \`id\` of the ${type} game object to update.`),
                label: z.string().optional().describe("Label of the object. It is used to name the object in the scene and as the variable name in code."),
                ...VariableComponent(),
                ...gameObjectType.schema as any
            })
        })
    });

    defineTool("scene-update-game-objects", "Update multiple game objects in the scene.", {
        ...SceneId(),
        objects: z.array(z.discriminatedUnion("type", unionElements_update as any)).describe("The game objects to add to the scene.")
    });
}