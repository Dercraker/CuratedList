/*
  Warnings:

  - Made the column `createdAt` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `List` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `ListBookmark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `TagOnList` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "ListBookmark" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "TagOnList" ALTER COLUMN "createdAt" SET NOT NULL;
