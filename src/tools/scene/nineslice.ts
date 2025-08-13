import z from "zod"

export function NineSliceComponent() {

    return {
        leftWidth: z.number().default(0).optional().describe("The width of the left slice."),
        rightWidth: z.number().default(0).optional().describe("The width of the right slice."),
        topHeight: z.number().default(0).optional().describe("The height of the top slice."),
        bottomHeight: z.number().default(0).optional().describe("The height of the bottom slice."),
    }
}

export function ThreeSliceComponent() {

    return {
        leftWidth: z.number().default(0).optional().describe("The width of the left slice."),
        rightWidth: z.number().default(0).optional().describe("The width of the right slice.")
    }
}
