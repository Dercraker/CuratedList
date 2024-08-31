import { z } from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
});

export type ItemSchema = z.infer<typeof ItemSchema>;
