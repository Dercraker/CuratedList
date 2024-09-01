import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const GetPaginatedListQuerySchema = z.object({
  take: z.number().default(18).optional(),
  skip: z.number(),

  userId: z.string().optional(),
  deleted: z.boolean().default(false).optional(),
});

export type GetPaginatedListQuerySchema = z.infer<
  typeof GetPaginatedListQuerySchema
>;

export const GetPaginatedListQuery = async ({
  take,
  skip,
  userId,
  deleted,
}: GetPaginatedListQuerySchema) => {
  const lists = await prisma.list.findMany({
    where: {
      deletedAt: deleted ? { not: null } : null,
      ...(userId ? { creatorId: userId } : {}),
    },
    take,
    skip,
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
