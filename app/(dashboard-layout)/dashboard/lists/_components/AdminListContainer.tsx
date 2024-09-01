import { ListCardItem } from "@/components/list/ListCardItem";
import {
  GetPaginatedListQuery,
  PaginatedListItem,
} from "@/features/lists/getPaginatedList.query";
import { requiredAuth } from "@/lib/auth/helper";
import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export type ListContainerProps = ComponentPropsWithoutRef<"div"> & {};

export const AdminListContainer = async ({
  className,
  ...props
}: ListContainerProps) => {
  const user = await requiredAuth();

  const lists = await GetPaginatedListQuery({
    skip: 0,
    userId: user.id,
  });

  return (
    <div
      className={cn("flex justify-center flex-wrap h-fit", className)}
      {...props}
    >
      {lists.map((list: PaginatedListItem) => (
        <ListCardItem key={list.id} list={list} />
      ))}
    </div>
  );
};
