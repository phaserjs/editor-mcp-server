import { BitmapTextComponent, EllipseComponent, OriginComponent, PolygonComponent, ShapeComponent, SizeComponent, SpriteComponent, TextComponent, TextureComponent, TileSpriteComponent, TransformComponent, TriangleComponent } from "./components.js";

export const GameObjectTypes = [
    {
        type: "Image",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...TextureComponent(),
        }
    },
    {
        type: "Sprite",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...TextureComponent(),
            ...SpriteComponent()
        }
    },
    {
        type: "TileSprite",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
            ...TextureComponent(),
            ...TileSpriteComponent()
        }
    },
    {
        type: "Text",
        schema: {
            ...TransformComponent(),
            ...OriginComponent(),
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
    }
];