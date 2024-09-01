import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { startOfMonth } from "date-fns";
import { z } from "zod";

export const GetAllUserBookmarkCountQuerySchema = z.object({
  userId: z.string(),
});

export type GetAllUserBookmarkCountQuerySchema = z.infer<
  typeof GetAllUserBookmarkCountQuerySchema
>;

export const GetAllUserBookmarkCountCountQuery = async ({
  userId,
}: GetAllUserBookmarkCountQuerySchema) => {
  const total = await prisma.listBookmark.count({
    where: {
      list: {
        creatorId: userId,
      },
    },
  });

  const precedentMonth = await prisma.listBookmark.count({
    where: {
      list: {
        creatorId: userId,
      },
      createdAt: {
        lt: startOfMonth(new Date()),
      },
    },
  });

  return {
    totalBookmarkCount: total,
    previousMonthTotalBookmarkCount: precedentMonth,
  };
};

export type GetAllUserBookmarkCountQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetAllUserBookmarkCountCountQuery>
>;
