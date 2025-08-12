import { ArcadeComponent } from "./arcade.js";
import { AlphaComponent, AlphaSingleComponent, BitmapTextComponent, BlendModeComponent, BlendModes, FlipComponent, NineSliceComponent, OriginComponent, SingleTintComponent, SizeComponent, SpineComponent, SpriteComponent, TextComponent, TextureComponent, ThreeSliceComponent, TileSpriteComponent, TintComponent, TransformComponent, VisibleComponent } from "./components.js";
import { ParticleEmitterComponent } from "./particle-emitter.js";
import { EllipseComponent, PolygonComponent, ShapeComponent, TriangleComponent } from "./shape.js";
import { TilemapLayerComponent } from "./tilemap.js";


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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
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
            ...ArcadeComponent(),
            ...BlendModeComponent(),
            ...ParticleEmitterComponent()
        }
    },
    {
        type: "SpineGameObject",
        schema: {
            ...TransformComponent(),
            ...VisibleComponent(),
            ...ArcadeComponent(),
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