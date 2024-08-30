"use server";

import { auth } from "@/lib/auth/helper";
import { action } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { IsListBookmarkQuery } from "./isListBookmark.query";

const IsListBookmarkSchema = z.object({
  listId: z.string(),
});

export const IsListBookmarkAction = action
  .schema(IsListBookmarkSchema)
  .action(async ({ parsedInput: { listId } }) => {
    const user = await auth();
    if (!user) return false;

    return await IsListBookmarkQuery({ listId, userId: user.id });
  });
