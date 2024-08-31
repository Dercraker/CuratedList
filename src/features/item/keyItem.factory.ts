export const KeyItemFactory = {
  all: ["items"],

  getOne: (itemId: string) => [...KeyItemFactory.all, { itemId }],
  getVotes: (itemId: string) => [...KeyItemFactory.getOne(itemId), "votes"],
  isVoted: (userId: string, itemId: string) => [
    ...KeyItemFactory.all,
    { itemId, userId },
    "vote",
  ],
};
