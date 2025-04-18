/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `shortUrl` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortSlug]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortSlug` to the `Click` table without a default value. This is not possible if the table is not empty.
  - The required column `shortSlug` was added to the `Url` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_shortUrl_fkey";

-- DropIndex
DROP INDEX "Url_shortUrl_key";

-- AlterTable
ALTER TABLE "Click" DROP COLUMN "shortUrl",
ADD COLUMN     "shortSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "shortUrl",
ADD COLUMN     "shortSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortSlug_key" ON "Url"("shortSlug");

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_shortSlug_fkey" FOREIGN KEY ("shortSlug") REFERENCES "Url"("shortSlug") ON DELETE RESTRICT ON UPDATE CASCADE;
