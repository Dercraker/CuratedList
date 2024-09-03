import { createSearchParamsCache, parseAsInteger } from "nuqs/server";
import { ParsersSchema } from "./parsersSchema.schema";

export const parsers = {
  page: parseAsInteger.withDefault(1).withOptions({ history: "push" }),
  size: parseAsInteger.withDefault(4),
} satisfies ParsersSchema;

export const searchParamsCache = createSearchParamsCache(parsers);
