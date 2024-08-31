import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const AddVoteQuerySchema = z.object({
  userId: z.string(),
  itemId: z.string(),
  isUpVote: z.boolean(),
});

export type AddVoteQuerySchema = z.infer<typeof AddVoteQuerySchema>;

export const AddVoteQuery = async ({
  isUpVote,
  itemId,
  userId,
}: AddVoteQuerySchema) => {
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

  await prisma.voteOnItem.create({
    data: {
      itemId,
      userId,
      isUpVote,
    },
  });
};

export type AddVoteQuery = NonNullable<
  Prisma.PromiseReturnType<typeof AddVoteQuery>
>;
