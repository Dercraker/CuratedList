"use client";

import { AddVoteAction } from "@/features/item/addVote.action";
import { GetVoteAction } from "@/features/item/getVote.Action";
import { IsVoteAction } from "@/features/item/isVote.Action";
import { KeyItemFactory } from "@/features/item/keyItem.factory";
import { RemoveVoteAction } from "@/features/item/removeVote.action";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { toast } from "sonner";
import { Typography } from "../ui/typography";

export type VoteCounterProps = {
  itemId: string;
  className?: string;
};

export const VoteCounter = ({ className, itemId }: VoteCounterProps) => {
  const { data: userVotes } = useQuery({
    queryKey: KeyItemFactory.getVotes(itemId),
    queryFn: async () => {
      const result = await GetVoteAction({ itemId });

      if (!result || result.serverError || !result.data) {
        toast.error(
          "An error ocurred when fetching item's votes. Please try again later.",
        );
        return [];
      }

      return result.data;
    },
  });

  const voteResult = useMemo(() => {
    if (!userVotes) return 0;
    return userVotes.reduce((acc, vote) => acc + (vote.isUpVote ? 1 : -1), 0);
  }, [userVotes]);

  const queryClient = useQueryClient();

  const { status, data } = useSession();

  const { data: isVoted } = useQuery({
    enabled: !!data && status === "authenticated" && !!data.user.id,
    staleTime: 0,
    queryKey: KeyItemFactory.isVoted(data?.user.id as string, itemId),
    queryFn: async () => {
      const result = await IsVoteAction({ itemId });

      if (!result || result.serverError) return undefined;

      return result.data;
    },
  });

  const { mutate: AddVote } = useMutation({
    mutationFn: async ({ isUpVote }: { isUpVote: boolean }) => {
      const result = await AddVoteAction({ isUpVote, itemId });

      if (result?.serverError)
        return toast.error("An error occurred. Please try again later");

      queryClient.invalidateQueries({
        queryKey: KeyItemFactory.isVoted(data?.user.id as string, itemId),
      });
      queryClient.invalidateQueries({
        queryKey: KeyItemFactory.all,
      });
    },
  });

  const { mutate: RemoveVote } = useMutation({
    mutationFn: async () => {
      const result = await RemoveVoteAction({ itemId });

      if (result?.serverError)
        return toast.error("An error occurred. Please try again later");

      queryClient.resetQueries({
        queryKey: KeyItemFactory.isVoted(data?.user.id as string, itemId),
      });
      queryClient.invalidateQueries({
        queryKey: KeyItemFactory.all,
      });
    },
  });

  if (status !== "authenticated")
    return (
      <div className={cn("flex w-fit flex-col items-center", className)}>
        <ArrowUpCircle className="size-10 cursor-not-allowed text-muted" />
        <Typography variant="h3" className="select-none">
          {voteResult > 0 ? `+${voteResult}` : voteResult}
        </Typography>
        <ArrowDownCircle className="size-10 cursor-not-allowed text-muted" />
      </div>
    );

  if (isVoted === true)
    return (
      <div className={cn("flex w-fit flex-col items-center ", className)}>
        <ArrowUpCircle
          className="size-10 cursor-pointer text-primary hover:text-white"
          onClick={() => RemoveVote()}
        />
        <Typography variant="h3" className="select-none">
          {voteResult > 0 ? `+${voteResult}` : voteResult}
        </Typography>
        <ArrowDownCircle
          className="size-10 cursor-pointer hover:text-red-400"
          onClick={() => AddVote({ isUpVote: false })}
        />
      </div>
    );

  if (isVoted === false && isVoted !== undefined)
    return (
      <div className={cn("flex w-fit flex-col items-center", className)}>
        <ArrowUpCircle
          className="size-10 cursor-pointer hover:text-primary"
          onClick={() => AddVote({ isUpVote: true })}
        />
        <Typography variant="h3" className="select-none">
          {voteResult > 0 ? `+${voteResult}` : voteResult}
        </Typography>
        <ArrowDownCircle
          className="size-10 cursor-pointer text-red-400 hover:text-white"
          onClick={() => RemoveVote()}
        />
      </div>
    );

  return (
    <div className={cn("flex w-fit flex-col items-center", className)}>
      <ArrowUpCircle
        className="size-10 cursor-pointer hover:text-primary"
        onClick={() => AddVote({ isUpVote: true })}
      />
      <Typography variant="h3" className="select-none">
        {voteResult > 0 ? `+${voteResult}` : voteResult}
      </Typography>
      <ArrowDownCircle
        className="size-10 cursor-pointer hover:text-red-400"
        onClick={() => AddVote({ isUpVote: false })}
      />
    </div>
  );
};
