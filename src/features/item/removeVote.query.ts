import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const RemoveVoteQuerySchema = z.object({
  itemId: z.string(),
  userId: z.string(),
});

export type RemoveVoteQuerySchema = z.infer<typeof RemoveVoteQuerySchema>;

export const RemoveVoteQuery = async ({
  itemId,
  userId,
}: RemoveVoteQuerySchema) => {
  const vote = await prisma.voteOnItem.findFirst({
    where: {
      itemId,
      userId,
    },
  });

  if (vote)
    await prisma.voteOnItem.delete({
      where: {
        id: vote.id,
      },
    });
};

export type RemoveVoteQuery = NonNullable<
  Prisma.PromiseReturnType<typeof RemoveVoteQuery>
>;
