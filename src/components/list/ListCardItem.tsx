import { PaginatedListItem } from "@/features/curated/List/getPaginatedList.query";
import { format } from "date-fns";
import { User2 } from "lucide-react";
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

export type ListCardItemProps = {
  list: PaginatedListItem;
  innerRef?: (node?: Element | null | undefined) => void;
};

export const ListCardItem = ({
  list: { Tags, _count, createdAt, creator, id, title, description },
  innerRef,
}: ListCardItemProps) => {
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
            <Typography variant="small">
              Created by: {creator ? creator.name : "Unknown User"} -{" "}
              {format(createdAt as Date, "yyyy/MM/dd")}
            </Typography>
          </div>
        </CardFooter>
      </Card>
    </WobbleCard>
  );
};
