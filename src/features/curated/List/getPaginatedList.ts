import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const GetPaginatedListQuerySchema = z.object({
  count: z.number(),
});

export type GetPaginatedListQuerySchema = z.infer<
  typeof GetPaginatedListQuerySchema
>;

export const GetPaginatedListQuery = async ({
  count,
}: GetPaginatedListQuerySchema) => {
  const lists = await prisma.list.findMany({
    where: {
      createdAt: {
        not: null,
      },
    },
    take: count,
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

export type GetPaginatedListQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetPaginatedListQuery>
>;

export type PaginatedListItem = GetPaginatedListQuery extends (infer U)[]
  ? U
  : never;
