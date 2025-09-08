import z from "zod";

export function HitAreaComponent() {

    return {
        "hitArea.shape": z.enum(["NONE", "RECTANGLE", "CIRCLE", "ELLIPSE", "POLYGON", "PIXEL_PERFECT"]).default("NONE").optional().describe(`The shape of the hit area. It can be a rectangle, circle, ellipse, polygon, or none. By default it is none which means no hit area is set.`),

        // rectangle, ellipse, circle
        "hitArea.x": z.number().default(0).optional().describe("The X offset of the hit area within the game object. Used by the rectangle, ellipse, and circle shapes. The way a hitArea is positioned within a game object depends on the area shape. Circles and ellipses are shapes with a center, so this center is usually placed at the center of the game object. To calculate the center of the game object, you can use its size. If the game object is 100x100 in size, and the hit area is a circle, then you could use a circle with radius 50 at position 50, 50. On the other hand, for a rectangle or polygon area, you wouldn't need to adjust its position, since they don't have a center and their top/left corner is aligned with the top/left corner of the game object."),
        "hitArea.y": z.number().default(0).optional().describe("The Y offset of the hit area within the game object.  Used by the rectangle, ellipse, and circle shapes. Look the hitArea.x property to understand how the different shapes positioned inside the game object."),

        // rectangle, ellipse
        "hitArea.width": z.number().default(0).optional().describe("The width of the hit area. Used when the shape is: rectangle, ellipse."),
        "hitArea.height": z.number().default(0).optional().describe("The height of the hit area. Used when the shape is: rectangle, ellipse."),

        // circle
        "hitArea.radius": z.number().default(0).optional().describe("The radius of the circle hit area."),

        // polygon
        "hitArea.points": z.string().optional().describe("The points of the polygon hit area. It should be a sequence of numbers, where each pair of numbers represents a point (x, y) in the polygon. For example, 'x1 y1 x2 y2 x3 y3' for a triangle. The points should be in clockwise order."),

        // pixel perfect
        "hitArea.alphaTolerance": z.number().default(1).optional().describe("The alpha tolerance for pixel perfect hit areas. It is a value between 0 and 1, where 0 means fully transparent and 1 means fully opaque. Used when the shape is: pixel perfect."),
    };
}