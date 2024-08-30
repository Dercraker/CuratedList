"use client";

import { PaginatedListItem } from "@/features/curated/List/getPaginatedList.query";
import { IsListBookmarkAction } from "@/features/curated/List/isListBookmark.action";
import { KeyListFactory } from "@/features/curated/List/keyList.factory";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Typography } from "../ui/typography";
import { WobbleCard } from "../ui/wobble-card";
import { BookmarkButton } from "./ListBookmarkButton";

export type ListCardItemProps = {
  list: PaginatedListItem;
  innerRef?: (node?: Element | null | undefined) => void;
};

export const ListCardItem = ({
  list: { Tags, _count, createdAt, creator, id, title, description },
  innerRef,
}: ListCardItemProps) => {
  const user = useSession();
  const { data: isBookmark } = useQuery({
    queryKey: KeyListFactory.isBookmark(id),
    queryFn: async () => {
      const result = await IsListBookmarkAction({ listId: id });

      return result?.data || false;
    },
    staleTime: 0,
  });

  return (
    <WobbleCard>
      <Card className="m-4 flex h-60 w-3xl select-none flex-col" ref={innerRef}>
        <CardHeader>
          <CardTitle>
            <Typography
              variant="h2"
              className="line-clamp-1 w-fit cursor-pointer select-none hover:underline"
              as={Link}
              href={id}
            >
              {title}
            </Typography>
          </CardTitle>
          <CardDescription className="flex items-baseline justify-between ">
            <div className="flex ">
              {user.status === "authenticated" && (
                <BookmarkButton listId={id} isBookmark={isBookmark ?? false} />
              )}
              {Tags.map(({ tag }) => (
                <Typography
                  key={tag.id}
                  className="mx-1 cursor-pointer select-none text-base first:ml-0 last:mr-0 hover:underline"
                >
                  #{tag.title}{" "}
                </Typography>
              ))}
            </div>

            <Typography
              variant="muted"
              className="cursor-pointer hover:underline"
            >
              {_count.items} item{_count.items > 1 ? "s" : null}
            </Typography>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Typography variant="p" className="line-clamp-2">
            {description}
          </Typography>
        </CardContent>
        <CardFooter className="mt-auto">
          <div className="flex items-center">
            <User2 />
            <Typography variant="small" className="flex items-center gap-1">
              Created by:{" "}
              <Typography
                variant="small"
                className="hover:cursor-pointer hover:text-primary hover:underline"
              >
                {creator ? creator.name : "Unknown User"}
              </Typography>{" "}
              - {format(createdAt as Date, "yyyy/MM/dd")}
            </Typography>
          </div>
        </CardFooter>
      </Card>
    </WobbleCard>
  );
};
