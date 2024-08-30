"use client";

import { GetPaginatedListAction } from "@/features/curated/List/getPaginatedList.action";
import { PaginatedListItem } from "@/features/curated/List/getPaginatedList.query";
import { KeyListFactory } from "@/features/curated/List/keyList.factory";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, type ComponentPropsWithoutRef } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { Typography } from "../ui/typography";
import { ListCardItem } from "./ListCardItem";
import { ListContainerLoader } from "./ListContainer.loader";

export type ListContainerProps = ComponentPropsWithoutRef<"div"> & {};

export const ListContainer = ({ className, ...props }: ListContainerProps) => {
  const { ref, inView } = useInView();
  const itemPerPage = 18;
  const {
    data: lists,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isPending,
  } = useInfiniteQuery({
    queryKey: KeyListFactory.infinity,
    queryFn: async ({ pageParam }) => {
      const result = await GetPaginatedListAction({
        pageParam,
        itemsPerPage: itemPerPage,
      });

      if (!result || result.serverError || !result.data) {
        toast.error("Error occurred");
        return [] as PaginatedListItem[];
      }

      return result.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === itemPerPage
          ? allPages.length * itemPerPage
          : undefined;
      return nextPage;
    },
  });
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  if (isPending) return <ListContainerLoader count={18} />;

  return (
    <>
      <div
        className={cn("flex justify-center flex-wrap h-fit", className)}
        {...props}
      >
        {lists?.pages?.map((page) =>
          page.map((list: PaginatedListItem, index: number) => {
            if (page.length == index + 1) {
              return <ListCardItem key={list.id} list={list} innerRef={ref} />;
            } else {
              return <ListCardItem key={list.id} list={list} />;
            }
          }),
        )}
      </div>
      {isFetching && hasNextPage && <ListContainerLoader count={6} />}
      {!isFetching && !hasNextPage && (
        <Typography
          variant="h2"
          className="mt-28 select-none text-center text-muted"
        >
          No more items to load
        </Typography>
      )}
    </>
  );
};
