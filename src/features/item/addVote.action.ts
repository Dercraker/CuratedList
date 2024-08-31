"use server";

import { authAction } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { AddVoteQuery } from "./addVote.query";

const AddVoteSchema = z.object({
  itemId: z.string(),
  isUpVote: z.boolean(),
});

export const AddVoteAction = authAction.schema(AddVoteSchema).action(
  async ({
    parsedInput: { isUpVote, itemId },
    ctx: {
      user: { id: userId },
    },
  }) => {
    return await AddVoteQuery({ isUpVote, itemId, userId });
  },
);
