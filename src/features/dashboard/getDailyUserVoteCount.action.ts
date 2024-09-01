"use server";

import { authAction } from "@/lib/backend/safe-actions";
import { GetDailyUserVoteCountQuery } from "./getDailyUserVoteCount.query";

export const GetDailyUserVoteCountAction = authAction.action(
  async ({
    ctx: {
      user: { id: userId },
    },
  }) => {
    return await GetDailyUserVoteCountQuery({ userId });
  },
);
