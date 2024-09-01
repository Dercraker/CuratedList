export const KeyDashboardFactory = {
  all: ["Dashboard"],
  getVotes: (userId: string) => [...KeyDashboardFactory.all, "Votes"],
  dailyVotes: (userId: string) => [
    ...KeyDashboardFactory.getVotes(userId),
    "Daily",
  ],
  dailyVotesCount: (userId: string) => [
    ...KeyDashboardFactory.dailyVotes(userId),
    "Count",
  ],
};