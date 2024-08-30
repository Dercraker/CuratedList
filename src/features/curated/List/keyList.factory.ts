export const KeyListFactory = {
  infinity: ["Curated", "Lists"],
  all: ["Lists"],

  getOne: (listId: string) => [...KeyListFactory.all, { listId }],
  isBookmark: (listId: string) => [
    ...KeyListFactory.getOne(listId),
    "IsBookmark",
  ],
};
