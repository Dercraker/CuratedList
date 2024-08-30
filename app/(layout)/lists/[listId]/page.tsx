import { ListDetailContainer } from "@/components/listDetail/listDetailContainer";
import { GetListQuery } from "@/features/list/getList.query";
import { IsListBookmarkQuery } from "@/features/lists/isListBookmark.query";
import { auth } from "@/lib/auth/helper";
import type { PageParams } from "@/types/next";

const RoutePage = async ({
  params: { listId },
}: PageParams<{ listId: string }>) => {
  const user = await auth();

  const list = await GetListQuery({ listId });
  const isBookmark = user
    ? await IsListBookmarkQuery({ listId, userId: user?.id })
    : false;

  return <ListDetailContainer list={list} isBookmark={isBookmark} />;
};

export default RoutePage;
