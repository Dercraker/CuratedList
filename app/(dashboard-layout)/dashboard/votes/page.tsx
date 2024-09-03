import { ItemCard } from "@/components/item/itemCard";
import { PaginationComponent } from "@/components/navigation/paginationContainer";
import {
  GetPaginatedItemQuery,
  PaginatedItem,
  PaginatedItems,
} from "@/features/item/getPaginatedItem.query";
import { GetUserVotedItemsCountQuery } from "@/features/item/getUserVotedItemsCount.query";
import { ItemSchema } from "@/features/item/itemSchema";
import { LINKS } from "@/features/navigation/NavigationLinks";
import { requiredAuth } from "@/lib/auth/helper";
import { searchParamsCache } from "@/lib/nuqs/searchParams";
import type { PageParams } from "@/types/next";

const RoutePage = async ({ searchParams }: PageParams<{}>) => {
  const user = await requiredAuth();
  const { page, size } = searchParamsCache.parse(searchParams);

  const items: PaginatedItems = await GetPaginatedItemQuery({
    skip: (page - 1) * size,
    take: size,
    userId: user.id,
    voteOnly: true,
  });

  const totalVotes = await GetUserVotedItemsCountQuery({ userId: user.id });
  console.log("🚀 ~ RoutePage ~ totalVotes:", totalVotes);
  return (
    <>
      <div className="flex h-fit flex-wrap justify-center">
        {items.map((item: PaginatedItem) => (
          <ItemCard key={item.id} item={ItemSchema.parse(item)} />
        ))}
      </div>
      <PaginationComponent
        baseUri={LINKS.Dashboard.Votes.href}
        itemCount={totalVotes}
      />
    </>
  );
};

export default RoutePage;
