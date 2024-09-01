import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { startOfMonth } from "date-fns";
import { z } from "zod";

export const GetAllUserListCountQuerySchema = z.object({
  userId: z.string(),
});

export type GetAllUserListCountQuerySchema = z.infer<
  typeof GetAllUserListCountQuerySchema
>;

export const GetAllUserListCountQuery = async ({
  userId,
}: GetAllUserListCountQuerySchema) => {
  const total = await prisma.list.count({
    where: {
      creatorId: userId,
      deletedAt: null,
    },
  });

  const precedentMonth = await prisma.list.count({
    where: {
      creatorId: userId,
      deletedAt: null,
      createdAt: {
        lt: startOfMonth(new Date()),
      },
    },
  });

  return { totalListCount: total, previousMonthTotalListCount: precedentMonth };
};

export type GetAllUserListCountQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetAllUserListCountQuery>
>;
