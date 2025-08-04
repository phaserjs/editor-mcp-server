import { AlphaComponent, AlphaSingleComponent, BitmapTextComponent, BlendModeComponent, FlipComponent, NineSliceComponent, OriginComponent, SizeComponent, SpineComponent, SpriteComponent, TextComponent, TextureComponent, ThreeSliceComponent, TileSpriteComponent, TransformComponent, VisibleComponent } from "./components.js";
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
            ...TextComponent(),
        }
    },
    {
        type: "Layer",
        schema: {
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...TransformComponent()
        }
    },
    {
        type: "Container",
        schema: {
            ...VisibleComponent(),
            ...AlphaSingleComponent(),
            ...BlendModeComponent(),
            ...TransformComponent()
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