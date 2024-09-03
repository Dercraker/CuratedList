import { ListCardItem } from "@/components/list/ListCardItem";
import { PaginationComponent } from "@/components/navigation/paginationContainer";
import { GetAllUserBookmarkListCountQuery } from "@/features/lists/getAllUserBookmarkListCount";
import {
  GetPaginatedListQuery,
  PaginatedListItem,
} from "@/features/lists/getPaginatedList.query";
import { LINKS } from "@/features/navigation/NavigationLinks";
import { requiredAuth } from "@/lib/auth/helper";
import { searchParamsCache } from "@/lib/nuqs/searchParams";
import type { PageParams } from "@/types/next";

const RoutePage = async ({ searchParams }: PageParams<{}>) => {
  const user = await requiredAuth();
  const { page, size } = searchParamsCache.parse(searchParams);

  const lists = await GetPaginatedListQuery({
    skip: (page - 1) * size,
    take: size,
    userId: user.id,
    bookmarksOnly: true,
  });

  const totalLists = await GetAllUserBookmarkListCountQuery({
    userId: user.id,
  });

  return (
    <>
      <div className="flex h-fit flex-wrap justify-center">
        {lists.map((list: PaginatedListItem) => (
          <ListCardItem key={list.id} list={list} />
        ))}
      </div>
      <PaginationComponent
        baseUri={LINKS.Dashboard.Lists.href}
        itemCount={totalLists}
      />
    </>
  );
};

export default RoutePage;
