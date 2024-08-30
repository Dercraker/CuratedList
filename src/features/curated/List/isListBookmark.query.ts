import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const IsListBookmarkQuerySchema = z.object({
  listId: z.string(),
  userId: z.string(),
});

export type IsListBookmarkQuerySchema = z.infer<
  typeof IsListBookmarkQuerySchema
>;

export const IsListBookmarkQuery = async ({
  listId,
  userId,
}: IsListBookmarkQuerySchema) => {
  const bookmark = await prisma.listBookmark.findFirst({
    where: {
      userId,
      listId,
    },
  });

  return bookmark !== null;
};

export type IsListBookmarkQuery = NonNullable<
  Prisma.PromiseReturnType<typeof IsListBookmarkQuery>
>;
