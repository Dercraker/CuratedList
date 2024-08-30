import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const GetPaginatedListQuerySchema = z.object({
  take: z.number(),
  pageParam: z.number(),
});

export type GetPaginatedListQuerySchema = z.infer<
  typeof GetPaginatedListQuerySchema
>;

export const GetPaginatedListQuery = async ({
  take,
  pageParam,
}: GetPaginatedListQuerySchema) => {
  const lists = await prisma.list.findMany({
    where: {
      deletedAt: null,
    },
    take,
    skip: pageParam,
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      creator: {
        select: {
          id: true,
          name: true,
        },
      },
      Tags: {
        take: 5,
        orderBy: {
          createdAt: "asc",
        },
        select: {
          tag: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  return lists;
};

export type PaginatedLists = NonNullable<
  Prisma.PromiseReturnType<typeof GetPaginatedListQuery>
>;

export type PaginatedListItem = PaginatedLists extends (infer U)[] ? U : never;
