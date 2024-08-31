import { UserVotesSchema } from "@/features/vote/userVote.schema";
import { cn } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Typography } from "../ui/typography";

export type VoteCounterProps = {
  userVotes: UserVotesSchema;
  className?: string;
};

export const VoteCounter = ({ userVotes, className }: VoteCounterProps) => {
  const voteResult = userVotes.reduce(
    (acc, vote) => acc + (vote.isUpVote ? 1 : -1),
    0,
  );

  return (
    <div className={cn("flex w-fit flex-col items-center", className)}>
      <ArrowUpCircle />
      <Typography className="select-none">
        {voteResult > 0 ? `+${voteResult}` : voteResult}
      </Typography>
      <ArrowDownCircle />
    </div>
  );
};
