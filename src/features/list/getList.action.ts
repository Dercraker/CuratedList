"use server";

import { action } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { GetListQuery } from "./getList.query";

const GetListSchema = z.object({
  listId: z.string(),
});

export const GetListAction = action
  .schema(GetListSchema)
  .action(async ({ parsedInput: { listId } }) => {
    return await GetListQuery({ listId });
  });
