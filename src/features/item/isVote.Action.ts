"use server";

import { authAction } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { IsVoteQuery } from "./isVote.query";

const IsVoteSchema = z.object({
  itemId: z.string(),
});

export const IsVoteAction = authAction.schema(IsVoteSchema).action(
  async ({
    parsedInput: { itemId },
    ctx: {
      user: { id: userId },
    },
  }) => {
    return await IsVoteQuery({ userId, itemId });
  },
);
