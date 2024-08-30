"use server";

import { action } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { GetPaginatedListQuery } from "./getPaginatedList.query";

const GetPaginatedListSchema = z.object({
  pageParam: z.number(),
  itemsPerPage: z.number(),
});

export const GetPaginatedListAction = action
  .schema(GetPaginatedListSchema)
  .action(async ({ parsedInput: { pageParam, itemsPerPage } }) => {
    const list = await GetPaginatedListQuery({ pageParam, take: itemsPerPage });
    return list;
  });
