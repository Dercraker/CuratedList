import { z } from "zod";

export const UserVoteSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  userId: z.string(),
  isUpVote: z.boolean(),
  createdAt: z.date().optional(),
  updateAt: z.date().optional(),
});

export const UserVotesSchema = z.array(UserVoteSchema);

export type UserVoteSchema = z.infer<typeof UserVoteSchema>;
export type UserVotesSchema = z.infer<typeof UserVotesSchema>;
