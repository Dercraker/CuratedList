import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { z } from "zod";
import { UserVotesSchema } from "../vote/userVote.schema";

export const GetDailyUserVoteCountQuerySchema = z.object({
  userId: z.string(),
});

export type GetDailyUserVoteCountQuerySchema = z.infer<
  typeof GetDailyUserVoteCountQuerySchema
>;

export const GetDailyUserVoteCountQuery = async ({
  userId,
}: GetDailyUserVoteCountQuerySchema) => {
  const dailyVotes = await prisma.voteOnItem.findMany({
    where: {
      item: {
        creatorId: userId,
      },
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date()),
      },
    },
  });

  const groupedDailyVotes: { [key: string]: UserVotesSchema } =
    dailyVotes.reduce((acc: { [key: string]: UserVotesSchema }, vote) => {
      const dateKey = format(vote.createdAt, "yyyy-MM-dd");

      if (!acc[dateKey]) acc[dateKey] = [];

      acc[dateKey].push(vote);

      return acc;
    }, {});

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  const votesEvolution = daysInMonth.map((day) => {
    const dateString = format(day, "yyyy-MM-dd");
    const dayVotes = groupedDailyVotes[dateString];

    return {
      date: dateString,
      amount: dayVotes ? dayVotes.length : 0,
    };
  });

  console.log("🚀 ~ votesEvolution:", votesEvolution);
  return votesEvolution;
};

export type GetDailyUserVoteCountQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetDailyUserVoteCountQuery>
>;

export type GetDailyUserVoteCount =
  GetDailyUserVoteCountQuery extends (infer U)[] ? U : never;
