import { createSearchParamsCache, parseAsInteger } from "nuqs/server";
import { ParsersSchema } from "./parsersSchema.schema";

export const parsers = {
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(18),
} satisfies ParsersSchema;

export const searchParamsCache = createSearchParamsCache(parsers);
