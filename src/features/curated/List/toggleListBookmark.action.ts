"use server";

import { authAction } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { ToggleListBookmarkQuery } from "./toggleListBookmark.query";

const ToggleListBookmarkSchema = z.object({
  listId: z.string(),
});

export const ToggleListBookmarkAction = authAction
  .schema(ToggleListBookmarkSchema)
  .action(
    async ({
      parsedInput: { listId },
      ctx: {
        user: { id: userId },
      },
    }) => {
      return await ToggleListBookmarkQuery({ listId, userId });
    },
  );
