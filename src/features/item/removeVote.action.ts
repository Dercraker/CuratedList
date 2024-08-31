"use server";

import { authAction } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { RemoveVoteQuery } from "./removeVote.query";

const RemoveVoteSchema = z.object({
  itemId: z.string(),
});

export const RemoveVoteAction = authAction.schema(RemoveVoteSchema).action(
  async ({
    parsedInput: { itemId },
    ctx: {
      user: { id: userId },
    },
  }) => {
    return await RemoveVoteQuery({ itemId, userId });
  },
);
