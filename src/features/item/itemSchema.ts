import { z } from "zod";
import { UserVoteSchema } from "../vote/userVote.schema";

export const ItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  userVotes: z.array(UserVoteSchema),
});

export type ItemSchema = z.infer<typeof ItemSchema>;
