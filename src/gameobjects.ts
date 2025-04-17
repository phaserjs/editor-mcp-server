import { BitmapTextComponent, EllipseComponent, ShapeComponent, SizeComponent, SpriteComponent, TextComponent, TextureComponent, TileSpriteComponent, TransformComponent } from "./components.js";

export const GameObjectTypes = [
    {
        type: "Image",
        schema: {
            ...TransformComponent(),
            ...TextureComponent(),
        }
    },
    {
        type: "Sprite",
        schema: {
            ...TransformComponent(),
            ...TextureComponent(),
            ...SpriteComponent()
        }
    },
    {
        type: "TileSprite",
        schema: {
            ...TransformComponent(),
            ...TextureComponent(),
            ...TileSpriteComponent()
        }
    },
    {
        type: "Text",
        schema: {
            ...TransformComponent(),
            ...TextComponent(),
        }
    },
    {
        type: "Layer",
        schema: {
            ...TransformComponent(),
        }
    },
    {
        type: "Container",
        schema: {
            ...TransformComponent(),
        }
    },
    {
        type: "BitmapText",
        schema: {
            ...TransformComponent(),
            ...BitmapTextComponent(),
        }
    },
    {
        type: "Rectangle",
        schema: {
            ...TransformComponent(),
            ...ShapeComponent(),
            ...SizeComponent()
        }
    },
    {
        type: "Ellipse",
        schema: {
            ...TransformComponent(),
            ...ShapeComponent(),
            ...SizeComponent(),
            ...EllipseComponent()
        }
    }
];