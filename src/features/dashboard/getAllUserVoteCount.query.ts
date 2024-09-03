import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { startOfMonth } from "date-fns";
import { z } from "zod";

export const GetAllUserVoteCountQuerySchema = z.object({
  userId: z.string(),
  withVote: z.boolean().default(false).optional(),
});

export type GetAllUserVoteCountQuerySchema = z.infer<
  typeof GetAllUserVoteCountQuerySchema
>;

export const GetAllUserVoteCountQuery = async ({
  userId,
}: GetAllUserVoteCountQuerySchema) => {
  const total = await prisma.voteOnItem.count({
    where: {
      item: {
        creatorId: userId,
      },
    },
  });

  const precedentMonth = await prisma.voteOnItem.count({
    where: {
      item: {
        creatorId: userId,
      },
      createdAt: {
        lt: startOfMonth(new Date()),
      },
    },
  });

  return { totalVoteCount: total, previousMonthTotalVoteCount: precedentMonth };
};

export type GetAllUserVoteCountQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetAllUserVoteCountQuery>
>;
