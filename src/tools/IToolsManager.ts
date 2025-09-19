import z from "zod";

export interface IToolsManager {

    defineTool(
        name: string,
        description: string,
        args: z.ZodRawShape, validator?:
            z.Schema): void;
}