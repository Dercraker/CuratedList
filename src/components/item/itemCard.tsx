import { ItemSchema } from "@/features/item/itemSchema";
import { UserVotesSchema } from "@/features/vote/userVote.schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Typography } from "../ui/typography";
import { DisplayOG } from "./DisplayOG";
import { DisplayOGLoader } from "./DisplayOG.loader";
import { VoteCounter } from "./voteCounter";

export type ItemCardProps = {
  item: ItemSchema;
};

export const ItemCard = ({
  item: { description, id, title, url },
}: ItemCardProps) => {
  return (
    <Card
      className={cn(
        "m-5 w-full h-[21rem] lg:h-[24rem] sm:w-3xl lg:basis-2/5 flex flex-col justify-between",
      )}
    >
      <CardHeader>
        <CardTitle>
          <Typography
            className="line-clamp-2 cursor-pointer select-none hover:underline"
            as={Link}
            href={url}
          >
            {title}
          </Typography>
        </CardTitle>
        <CardDescription className="line-clamp-3 select-none">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center gap-4 max-sm:mr-9">
        <Suspense fallback={<DisplayOGLoader />}>
          <DisplayOG url="https://tailwindcss.com" />
          <VoteCounter itemId={id} className="ml-auto" />
        </Suspense>
      </CardContent>
    </Card>
  );
};
