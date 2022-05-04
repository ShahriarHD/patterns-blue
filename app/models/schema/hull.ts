import * as z from 'zod';

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]));

export const HullModel = z.object({
    id: z.number().int(),
    created_at: z.date().nullish(),
    title: z.string().nullish(),
    description: z.string().nullish(),
    pages: jsonSchema,
});
