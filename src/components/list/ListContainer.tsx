import { GetPaginatedListQuery } from "@/features/curated/List/getPaginatedList";
import { ListCardItem } from "./ListCardItem";

export type ListContainerProps = {};

export const ListContainer = async (props: ListContainerProps) => {
  const lists: GetPaginatedListQuery = await GetPaginatedListQuery({
    count: 20,
  });

  return (
    <div className="flex items-center justify-center ">
      {lists.map((list) => (
        <ListCardItem key={list.id} list={list} />
      ))}
    </div>
  );
};
