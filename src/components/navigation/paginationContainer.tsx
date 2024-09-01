"use client";
import { parsers } from "@/lib/nuqs/searchParams";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState } from "nuqs";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

type PaginationComponentProps = {
  baseUri: string;
  itemCount: number;
  className?: string;
};

export const PaginationComponent = ({
  itemCount,
  baseUri,
  className,
}: PaginationComponentProps) => {
  const [page, setPage] = useQueryState("page", parsers.page);
  const [size] = useQueryState("size", parsers.size);

  const generatePaginationLinks = () => {
    const paginationLinks = [];
    const leftEllipsis = page > 2;
    const rightEllipsis = page < pageCount - 1;

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || i === pageCount || (i >= page - 1 && i <= page + 1)) {
        paginationLinks.push(
          <PaginationItem key={i} onClick={() => setPage(i)}>
            <PaginationLink href={baseUri} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    if (leftEllipsis) {
      paginationLinks.splice(
        1,
        0,
        <PaginationItem key="left">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }
    if (rightEllipsis) {
      paginationLinks.splice(
        paginationLinks.length - 1,
        0,
        <PaginationItem key="right">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    return paginationLinks;
  };

  const pageCount = Math.ceil(itemCount / size);
  if (pageCount <= 1) return null;

  return (
    <Pagination className={cn("", className)}>
      <PaginationContent className=" *:cursor-pointer">
        <PaginationItem>
          <Button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="group"
          >
            <ChevronLeft className="transition-all delay-150 duration-300 group-hover:-translate-x-1" />
            Previous
          </Button>
        </PaginationItem>
        {generatePaginationLinks()}
        <PaginationItem>
          <Button
            disabled={page === pageCount}
            onClick={() => setPage(page + 1)}
            className="group"
          >
            Next{" "}
            <ChevronRight className="transition-all delay-150 duration-300 group-hover:translate-x-1" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
