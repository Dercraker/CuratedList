import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const GetVoteQuerySchema = z.object({
  itemId: z.string(),
});

export type GetVoteQuerySchema = z.infer<typeof GetVoteQuerySchema>;

export const GetVoteQuery = async ({ itemId }: GetVoteQuerySchema) => {
  const votes = await prisma.voteOnItem.findMany({
    where: {
      itemId,
    },
  });

  return votes;
};

export type GetVoteQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetVoteQuery>
>;

export type GetVote = GetVoteQuery extends (infer U)[] ? U : never;
