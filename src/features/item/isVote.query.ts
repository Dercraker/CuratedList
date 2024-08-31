import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const IsVoteQuerySchema = z.object({
  userId: z.string(),
  itemId: z.string(),
});

export type IsVoteQuerySchema = z.infer<typeof IsVoteQuerySchema>;

export const IsVoteQuery = async ({ itemId, userId }: IsVoteQuerySchema) => {
  const isVoted = await prisma.voteOnItem.findFirst({
    where: {
      userId,
      itemId,
    },
    select: {
      isUpVote: true,
    },
  });

  return isVoted?.isUpVote;
};

export type IsVoteQuery = NonNullable<
  Prisma.PromiseReturnType<typeof IsVoteQuery>
>;
