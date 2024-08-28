import { PaginatedListItem } from "@/features/curated/List/getPaginatedList";
import { format } from "date-fns";
import { User2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Typography } from "../ui/typography";

export type ListCardItemProps = {
  list: PaginatedListItem;
};

export const ListCardItem = ({
  list: { Tags, _count, createdAt, creator, id, title, description },
}: ListCardItemProps) => {
  return (
    <Card className="select-none">
      <CardHeader>
        <CardTitle>
          <Typography
            variant="h2"
            className="cursor-pointer select-none hover:underline"
          >
            {title}
          </Typography>
        </CardTitle>
        <CardDescription className="flex items-baseline justify-between">
          {Tags.map(({ tag }) => (
            <Typography
              key={tag.id}
              variant="p"
              className="cursor-pointer select-none hover:underline"
            >
              #{tag.title}{" "}
            </Typography>
          ))}
          <Typography variant="muted" className="cursor-default">
            {_count.items} item{_count.items > 1 ? "s" : null}
          </Typography>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="p">{description}</Typography>
      </CardContent>
      <CardFooter>
        <div className="flex items-center">
          <User2 />
          <Typography variant="small">
            Created by: {creator.name} -{" "}
            {format(createdAt as Date, "yyyy.MM.dd")}
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
};
