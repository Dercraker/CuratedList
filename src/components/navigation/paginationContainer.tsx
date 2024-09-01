"use client";
import { parsers } from "@/lib/nuqs/searchParams";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

import { useQueryState } from "nuqs";

export type PaginationContainerProps = {
  baseUrl: string;
  total: number;
};

export const PaginationContainer = ({
  baseUrl,
  total,
}: PaginationContainerProps) => {
  const [page] = useQueryState("page", parsers.page);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={"#"} />
        </PaginationItem>
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>{page}</PaginationItem>
        {page < total - 3}
        <PaginationItem>
          <PaginationNext href={"#"} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
