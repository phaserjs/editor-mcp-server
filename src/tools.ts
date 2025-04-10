import { ZodRawShape } from "zod";

interface IToolConfig {
    name: string;
    description: string;
    paramsSchema: ZodRawShape
}

export const TOOLS_CONFIG = [



]