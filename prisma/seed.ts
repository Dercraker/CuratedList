import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const main = async () => {
  const userCount = faker.number.int({ min: 20, max: 50 });
  const allLists: { id: string }[] = [];
  const allItems: { id: string }[] = [];

  const users = await prisma.user.findMany();

  const newUsers = await Promise.all(
    Array.from({ length: userCount }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.internet.userName(),
          emailVerified: faker.date.soon(),
        },
      }),
    ),
  );

  users.push(...newUsers);

  for (const user of users) {
    const listCount = faker.number.int({ min: 5, max: 10 });
    const lists: { id: string }[] = await prisma.list.createManyAndReturn({
      select: {
        id: true,
      },
      data: Array.from({ length: listCount }).map(() => ({
        title: faker.lorem.words({ min: 3, max: 5 }),
        description: faker.lorem.lines({ min: 0, max: 2 }),
        creatorId: user.id,
      })),
    });

    allLists.push(...lists);

    for (const list of lists) {
      const itemCount = faker.number.int({ min: 10, max: 50 });
      const items: { id: string }[] = await prisma.item.createManyAndReturn({
        select: {
          id: true,
        },
        data: Array.from({ length: itemCount }).map(() => ({
          title: faker.lorem.words({ min: 3, max: 5 }),
          description: faker.lorem.lines(),
          url: faker.internet.url(),
          creatorId: user.id,
        })),
      });
      allItems.push(...items);

      await prisma.itemOnList.createMany({
        data: items.map((item) => ({
          itemId: item.id,
          listId: list.id,
        })),
      });
    }
  }

  let randomUser = faker.helpers.arrayElements(users, {
    min: 10,
    max: userCount,
  });

  for (const user of randomUser) {
    const randomList = faker.helpers.arrayElements(allLists, {
      min: 1,
      max: 30,
    });
    await prisma.listBookmark.createMany({
      data: randomList.map((list) => {
        return {
          listId: list.id,
          userId: user.id,
        };
      }),
    });
  }

  const allTags: { id: string }[] = [];
  randomUser = faker.helpers.arrayElements(users, {
    min: 10,
    max: userCount,
  });
  for (const user of randomUser) {
    const tagCount = faker.number.int({ min: 1, max: 5 });
    const tags: { id: string }[] = await prisma.tag.createManyAndReturn({
      select: {
        id: true,
      },
      data: Array.from({ length: tagCount }).map(() => ({
        title: faker.lorem.word({ length: 5, strategy: "closest" }),
        creatorId: user.id,
      })),
    });
    allTags.push(...tags);
  }

  for (const tag of allTags) {
    const randomLists = faker.helpers.arrayElements(allLists, {
      min: 50,
      max: allLists.length * 0.75,
    });
    await prisma.tagOnList.createMany({
      data: randomLists.map((list) => {
        return {
          listId: list.id,
          tagId: tag.id,
        };
      }),
    });
  }

  for (const user of users) {
    let randomItems = faker.helpers.arrayElements(allItems, {
      min: 0,
      max: 50,
    });

    await prisma.voteOnItem.createMany({
      data: randomItems.map((item) => {
        return {
          userId: user.id,
          itemId: item.id,
          isUpVote: faker.datatype.boolean(),
          createdAt: faker.datatype.boolean({ probability: 0.25 })
            ? faker.date.anytime()
            : faker.datatype.boolean()
              ? faker.date.soon({ days: 30 })
              : faker.date.soon({ days: 30 }),
        };
      }),
    });

    randomItems = faker.helpers.arrayElements(allItems, {
      min: 0,
      max: 50,
    });
    await prisma.itemBookmark.createMany({
      data: randomItems.map((item) => {
        return {
          userId: user.id,
          itemId: item.id,
        };
      }),
    });
  }

  const dercrakerUser = await prisma.user.findFirst({
    where: {
      name: "Dercraker",
    },
  });

  if (dercrakerUser) {
    const userItems = await prisma.item.findMany({
      where: { creatorId: dercrakerUser.id },
    });
    const randomItems = faker.helpers.arrayElements(userItems, {
      min: userItems.length / 50,
      max: userItems.length,
    });

    randomUser = faker.helpers.arrayElements(users);

    for (const user of randomUser) {
      for (const item of randomItems) {
        const allReadyVote = await prisma.voteOnItem.findFirst({
          where: {
            userId: user.id,
            itemId: item.id,
          },
        });

        if (allReadyVote)
          await prisma.voteOnItem.delete({ where: { id: allReadyVote.id } });

        await prisma.voteOnItem.create({
          data: {
            itemId: item.id,
            userId: user.id,
            isUpVote: faker.datatype.boolean(),
            createdAt: faker.datatype.boolean({ probability: 0.25 })
              ? faker.date.anytime()
              : faker.datatype.boolean()
                ? faker.date.soon({ days: 30 })
                : faker.date.soon({ days: 30 }),
          },
        });
      }
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
