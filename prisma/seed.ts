import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const main = async () => {
  const userCount = faker.number.int({ min: 20, max: 50 });

  const users = await Promise.all(
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

  for (const user of users) {
    const listCount = faker.number.int({ min: 5, max: 10 });
    const lists = await prisma.list.createManyAndReturn({
      data: Array.from({ length: listCount }).map(() => ({
        title: faker.lorem.words({ min: 3, max: 5 }),
        description: faker.lorem.lines({ min: 0, max: 2 }),
        creatorId: user.id,
      })),
    });

    for (const list of lists) {
      const itemCount = faker.number.int({ min: 1, max: 20 });
      const items = await prisma.item.createManyAndReturn({
        data: Array.from({ length: itemCount }).map(() => ({
          title: faker.lorem.words({ min: 3, max: 5 }),
          description: faker.lorem.lines(),
          url: faker.internet.url(),
          creatorId: user.id,
        })),
      });

      await prisma.itemOnList.createMany({
        data: items.map((item) => ({
          itemId: item.id,
          listId: list.id,
        })),
      });
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
