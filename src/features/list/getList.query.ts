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
              itemId: true,
              userId: true,
              isUpVote: true,
            },
          },
        },
      },
    },
  });

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
    items: items.map((i) => i.item),
    tags: tags.map((t) => t.tag),
  };
};

export type GetListQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetListQuery>
>;
