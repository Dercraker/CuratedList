import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const GetAllUserBookmarkListCountQuerySchema = z.object({
  userId: z.string(),
});

export type GetAllUserBookmarkListCountQuerySchema = z.infer<
  typeof GetAllUserBookmarkListCountQuerySchema
>;

export const GetAllUserBookmarkListCountQuery = async ({
  userId,
}: GetAllUserBookmarkListCountQuerySchema) => {
  const count = await prisma.list.count({
    where: {
      userBookmarks: {
        some: {
          userId,
        },
      },
    },
  });

  return count;
};

export type GetAllUserBookmarkListCountQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetAllUserBookmarkListCountQuery>
>;
