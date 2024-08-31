"use server";

import { action } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { GetVoteQuery } from "./getVote.query";

const GetVoteSchema = z.object({
  itemId: z.string(),
});

export const GetVoteAction = action
  .schema(GetVoteSchema)
  .action(async ({ parsedInput: { itemId } }) => {
    return await GetVoteQuery({ itemId });
  });
