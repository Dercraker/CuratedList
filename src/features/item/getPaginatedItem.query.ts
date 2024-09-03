import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const GetPaginatedItemQuerySchema = z.object({
  take: z.number().default(18).optional(),
  skip: z.number(),

  userId: z.string().optional(),
  deleted: z.boolean().default(false).optional(),
  voteOnly: z.boolean().default(false).optional(),
  bookmarks: z.boolean().default(false).optional(),
});

export type GetPaginatedItemQuerySchema = z.infer<
  typeof GetPaginatedItemQuerySchema
>;

export const GetPaginatedItemQuery = async ({
  skip,
  deleted,
  take,
  userId,
  voteOnly,
}: GetPaginatedItemQuerySchema) => {
  const allItems = await prisma.item.findMany({
    where: {
      deletedAt: deleted ? { not: null } : null,
      ...(userId && !voteOnly ? { creatorId: userId } : {}),
      ...(voteOnly
        ? {
            userVotes: {
              some: {
                userId,
              },
            },
          }
        : {}),
    },
    select: {
      id: true,
      title: true,
      description: true,
      url: true,
      createdAt: true,
      creator: {
        select: {
          id: true,
          name: true,
        },
      },
      userVotes: {
        select: {
          id: true,
          isUpVote: true,
        },
      },
    },
  });

  // Calculer le score de vote
  const itemsWithScores = allItems.map((item) => {
    const upVotes = item.userVotes.filter((vote) => vote.isUpVote).length;
    const downVotes = item.userVotes.filter((vote) => !vote.isUpVote).length;
    return {
      ...item,
      voteScore: upVotes - downVotes,
    };
  });

  // Trier les items par score de vote décroissant
  const sortedItems = itemsWithScores.sort((a, b) => b.voteScore - a.voteScore);

  // Appliquer skip et take
  const paginatedItems = sortedItems.slice(skip, skip + take);

  return paginatedItems;
};

export type PaginatedItems = NonNullable<
  Prisma.PromiseReturnType<typeof GetPaginatedItemQuery>
>;

export type PaginatedItem = PaginatedItems extends (infer U)[] ? U : never;
