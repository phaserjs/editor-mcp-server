import { z } from "zod";

export function ShapeComponent() {

    return {
        fillColor: z.string().optional().describe("The fill color of the shape. In hex format, like `#ff0000`."),
        isFilled: z.boolean().optional().describe("If true, the shape is filled."),
        fillAlpha: z.number().optional().describe("The fill alpha of the shape."),
        isStroked: z.boolean().optional().describe("If true, the shape is stroked."),
        strokeColor: z.string().optional().describe("The stroke color of the shape. In hex format, like `#ff0000`."),
        strokeAlpha: z.number().optional().describe("The stroke alpha of the shape."),
        lineWidth: z.number().optional().describe("The line width of the shape."),
    };
}

export function EllipseComponent() {

    return {
        smoothness: z.number().optional().describe("The smoothness of the ellipse."),
    }
}

export function TriangleComponent() {

    return {
        x1: z.number().optional().describe("X position of the first point of the triangle."),
        y1: z.number().optional().describe("Y position of the first point of the triangle."),
        x2: z.number().optional().describe("X position of the second point of the triangle."),
        y2: z.number().optional().describe("Y position of the second point of the triangle."),
        x3: z.number().optional().describe("X position of the third point of the triangle."),
        y3: z.number().optional().describe("Y position of the third point of the triangle."),
    }
}

export function PolygonComponent() {

    return {
        points: z.string().optional().describe("The points of the polygon. Use a string with the format `x1 y1 x2 y2 x3 y3 ...`")
    }
}