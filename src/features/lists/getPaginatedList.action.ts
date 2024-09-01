"use server";

import { action } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { GetPaginatedListQuery } from "./getPaginatedList.query";

const GetPaginatedListSchema = z.object({
  skip: z.number(),
  itemsPerPage: z.number().default(18).optional(),

  userId: z.string().optional(),
  deleted: z.boolean().optional(),
});

export const GetPaginatedListAction = action
  .schema(GetPaginatedListSchema)
  .action(async ({ parsedInput: { skip, itemsPerPage, deleted, userId } }) => {
    const list = await GetPaginatedListQuery({
      skip,
      take: itemsPerPage,
      deleted,
      userId,
    });
    return list;
  });
