import { ParserBuilder } from "nuqs";
import { z } from "zod";

export const ParsersSchema = z.record(
  z.union([
    z.custom<ParserBuilder<string>>(),
    z.custom<ParserBuilder<number>>(),
    z.custom<ParserBuilder<boolean>>(),
    z.custom<ParserBuilder<Date>>(),
  ]),
);

export type ParsersSchema = z.infer<typeof ParsersSchema>;
