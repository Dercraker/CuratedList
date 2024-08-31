import { ItemSchema } from "@/features/item/itemSchema";
import { UserVotesSchema } from "@/features/vote/userVote.schema";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DisplayOG } from "./DisplayOG";
import { VoteCounter } from "./voteCounter";

export type ItemCardProps = {
  item: ItemSchema;
};

export const ItemCard = ({
  item: { description, id, title, url, userVotes },
}: ItemCardProps) => {
  return (
    <Card
      className={cn(
        "m-5 w-full h-[21rem] lg:h-[24rem] sm:w-3xl lg:basis-2/5 flex flex-col justify-between",
      )}
    >
      <CardHeader>
        <CardTitle className="line-clamp-2 select-none">{title}</CardTitle>
        <CardDescription className="line-clamp-3 select-none">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center gap-4 max-sm:mr-9">
        <DisplayOG url="https://tailwindcss.com" />
        <VoteCounter
          className="ml-auto"
          userVotes={UserVotesSchema.parse(userVotes)}
        />
      </CardContent>
    </Card>
  );
};
