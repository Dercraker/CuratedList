import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const GetUserVotedItemsCountQuerySchema = z.object({
  userId: z.string(),
});

export type GetUserVotedItemsCountQuerySchema = z.infer<
  typeof GetUserVotedItemsCountQuerySchema
>;

export const GetUserVotedItemsCountQuery = async ({
  userId,
}: GetUserVotedItemsCountQuerySchema) => {
  const count = await prisma.voteOnItem.count({
    where: {
      userId,
    },
  });

  return count;
};

export type GetUserVotedItemsCountQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetUserVotedItemsCountQuery>
>;
