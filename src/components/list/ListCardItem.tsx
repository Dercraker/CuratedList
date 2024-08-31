"use client";

import { PaginatedListItem } from "@/features/lists/getPaginatedList.query";
import { LINKS } from "@/features/navigation/NavigationLinks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { DisplayCreatorName } from "../listDetail/displayCreatorName";
import { TagList } from "../listDetail/tagList";
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

  return (
    <WobbleCard>
      <Card
        className="m-4 flex h-60 w-80 select-none flex-col sm:w-2xl md:w-4xl lg:w-xl xl:w-3xl"
        ref={innerRef}
      >
        <CardHeader>
          <CardTitle>
            <Typography
              variant="h2"
              className="line-clamp-1 w-fit cursor-pointer select-none hover:underline"
              as={Link}
              href={LINKS.List.href(id)}
            >
              {title}
            </Typography>
          </CardTitle>
          <CardDescription className="flex items-baseline justify-between max-sm:flex-col">
            <div className="flex gap-1">
              {user.status === "authenticated" && (
                <BookmarkButton listId={id} />
              )}
              <TagList tags={Tags.map((t) => t.tag)} />
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
          <DisplayCreatorName name={creator?.name} createAt={createdAt} />
        </CardFooter>
      </Card>
    </WobbleCard>
  );
};
