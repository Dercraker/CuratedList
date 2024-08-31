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
import { VoteCounter } from "./voteCounter";

export type ItemCardProps = {
  item: ItemSchema;
};

export const ItemCard = ({
  item: { description, id, title, url, userVotes },
}: ItemCardProps) => {
  return (
    <Card className={cn("m-5 w-full lg:basis-2/5")}>
      <CardHeader>
        <CardTitle className="select-none">{title}</CardTitle>
        <CardDescription className="select-none">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <VoteCounter
          className="ml-auto"
          userVotes={UserVotesSchema.parse(userVotes)}
        />
      </CardContent>
    </Card>
  );
};
