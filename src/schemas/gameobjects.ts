import { BitmapTextComponent, FlipComponent, NineSliceComponent, OriginComponent,  SizeComponent, SpineComponent, SpriteComponent, TextComponent, TextureComponent, ThreeSliceComponent, TileSpriteComponent, TransformComponent } from "./components.js";
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
            ...TextureComponent(),
        }
    },
    {
        type: "Sprite",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...FlipComponent(),
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
            ...TextureComponent(),
            ...TileSpriteComponent()
        }
    },
    {
        type: "NineSlice",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
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
            ...FlipComponent(),
            ...TextComponent(),
        }
    },
    {
        type: "Layer",
        schema: {
            ...TransformComponent()
        }
    },
    {
        type: "Container",
        schema: {
            ...TransformComponent()
        }
    },
    {
        type: "BitmapText",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(0),
            ...BitmapTextComponent(),
        }
    },
    {
        type: "Rectangle",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...ShapeComponent(),
            ...SizeComponent()
        }
    },
    {
        type: "Ellipse",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
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
            ...ShapeComponent(),
            ...TriangleComponent()
        }
    },
    {
        type: "Polygon",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...ShapeComponent(),
            ...PolygonComponent()
        }
    },
    {
        type: "ParticleEmitter",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...ParticleEmitterComponent()
        }
    },
    {
        type: "SpineGameObject",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...SpineComponent()
        }
    },
    {
        type: "TilemapLayer",
        schema: {
            ...TransformComponent(),
            ...TilemapLayerComponent()
        }
    },
    {
        type: "EditableTilemapLayer",
        updateOnly: true,
        schema: {
            ...TransformComponent()
        }
    }
];