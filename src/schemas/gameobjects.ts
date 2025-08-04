import { BitmapTextComponent, FlipComponent, NineSliceComponent, OriginComponent,  SizeComponent, SpineComponent, SpriteComponent, TextComponent, TextureComponent, ThreeSliceComponent, TileSpriteComponent, TransformComponent, VisibleComponent } from "./components.js";
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
            ...FlipComponent(),
            ...TextComponent(),
        }
    },
    {
        type: "Layer",
        schema: {
            ...VisibleComponent(),
            ...TransformComponent()
        }
    },
    {
        type: "Container",
        schema: {
            ...VisibleComponent(),
            ...TransformComponent()
        }
    },
    {
        type: "BitmapText",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(0),
            ...VisibleComponent(),
            ...BitmapTextComponent(),
        }
    },
    {
        type: "Rectangle",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...ShapeComponent(),
            ...SizeComponent()
        }
    },
    {
        type: "Ellipse",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
            ...ShapeComponent(),
            ...SizeComponent(),
            ...EllipseComponent()
        }
    },
    {
        type: "Triangle",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
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
            ...ParticleEmitterComponent()
        }
    },
    {
        type: "SpineGameObject",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...VisibleComponent(),
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
        }
    }
];