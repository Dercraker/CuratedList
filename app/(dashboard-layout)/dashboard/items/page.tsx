import type { PageParams } from "@/types/next";
import { ItemCard } from "@/components/item/itemCard";
import { PaginationComponent } from "@/components/navigation/paginationContainer";
import { GetAllUserItemCountQuery } from "@/features/dashboard/getAllUserItemCount.query";
import {
  GetPaginatedItemQuery,
  PaginatedItem,
  PaginatedItems,
} from "@/features/item/getPaginatedItem.query";
import { ItemSchema } from "@/features/item/itemSchema";
import { LINKS } from "@/features/navigation/NavigationLinks";
import { requiredAuth } from "@/lib/auth/helper";
import { searchParamsCache } from "@/lib/nuqs/searchParams";

const RoutePage = async ({ searchParams }: PageParams<{}>) => {
  const user = await requiredAuth();
  const { page, size } = searchParamsCache.parse(searchParams);

  const items: PaginatedItems = await GetPaginatedItemQuery({
    skip: (page - 1) * size,
    take: size,
    userId: user.id,
  });

  const totalItems = await GetAllUserItemCountQuery({ userId: user.id });

  return (
    <>
      <div className="flex h-fit flex-wrap justify-center">
        {items.map((item: PaginatedItem) => (
          <ItemCard key={item.id} item={ItemSchema.parse(item)} />
        ))}
      </div>
      <PaginationComponent
        baseUri={LINKS.Dashboard.Items.href}
        itemCount={totalItems.totalItemCount}
      />
    </>
  );
};

export default RoutePage;
