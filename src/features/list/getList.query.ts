import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const GetListQuerySchema = z.object({
  listId: z.string(),
});

export type GetListQuerySchema = z.infer<typeof GetListQuerySchema>;

export const GetListQuery = async ({ listId }: GetListQuerySchema) => {
  const list = await prisma.list.findFirst({
    where: {
      id: listId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      creatorId: true,
      creator: {
        select: {
          name: true,
        },
      },
    },
  });

  const items = await prisma.itemOnList.findMany({
    where: {
      listId,
    },
    select: {
      item: {
        select: {
          id: true,
          title: true,
          description: true,
          url: true,
          userVotes: {
            select: {
              id: true,
              isUpVote: true,
            },
          },
        },
      },
    },
  });

  const sortedItems = items
    .map((item) => {
      const upVotes = item.item.userVotes.filter(
        (vote) => vote.isUpVote,
      ).length;
      const downVotes = item.item.userVotes.filter(
        (vote) => !vote.isUpVote,
      ).length;
      return {
        ...item,
        voteScore: upVotes - downVotes, // Calculer le score de vote
      };
    })
    .sort((a, b) => b.voteScore - a.voteScore); // Trier par score de vote décroissant

  const tags = await prisma.tagOnList.findMany({
    where: {
      listId,
    },
    take: 5,
    select: {
      tag: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return {
    ...list,
    items: sortedItems.map((i) => i.item),
    tags: tags.map((t) => t.tag),
  };
};

export type GetListQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetListQuery>
>;
