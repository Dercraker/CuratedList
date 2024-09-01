import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { startOfMonth } from "date-fns";
import { z } from "zod";

export const GetAllUserItemCountQuerySchema = z.object({
  userId: z.string(),
});

export type GetAllUserItemCountQuerySchema = z.infer<
  typeof GetAllUserItemCountQuerySchema
>;

export const GetAllUserItemCountQuery = async ({
  userId,
}: GetAllUserItemCountQuerySchema) => {
  const total = await prisma.item.count({
    where: {
      creatorId: userId,
      deletedAt: null,
    },
  });

  const precedentMonth = await prisma.item.count({
    where: {
      creatorId: userId,
      deletedAt: null,
      createdAt: {
        lt: startOfMonth(new Date()),
      },
    },
  });

  return { totalItemCount: total, previousMonthTotalItemCount: precedentMonth };
};

export type GetAllUserItemCountQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetAllUserItemCountQuery>
>;
