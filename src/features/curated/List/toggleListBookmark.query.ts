import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const ToggleListBookmarkQuerySchema = z.object({
  userId: z.string(),
  listId: z.string(),
});

export type ToggleListBookmarkQuerySchema = z.infer<
  typeof ToggleListBookmarkQuerySchema
>;

export const ToggleListBookmarkQuery = async ({
  listId,
  userId,
}: ToggleListBookmarkQuerySchema) => {
  const isBookmark = await prisma.listBookmark.findFirst({
    where: {
      userId,
      listId,
    },
  });

  if (isBookmark) {
    await prisma.listBookmark.delete({
      where: {
        id: isBookmark.id,
      },
    });
    return false;
  } else {
    await prisma.listBookmark.create({
      data: {
        userId,
        listId,
      },
    });
    return true;
  }
};

export type ToggleListBookmarkQuery = NonNullable<
  Prisma.PromiseReturnType<typeof ToggleListBookmarkQuery>
>;
