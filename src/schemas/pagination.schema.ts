import { z } from "zod";

export const paginateSchema=z.object({
    next: z.string().nullable(),
    page:z.string(),
    prev: z.string().nullable(),
    count:z.number(),
    maxPage:z.number(),
});