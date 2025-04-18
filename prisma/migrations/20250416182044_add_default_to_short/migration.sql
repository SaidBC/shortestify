/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `shortUrl` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `short` to the `Click` table without a default value. This is not possible if the table is not empty.
  - The required column `short` was added to the `Url` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_shortUrl_fkey";

-- DropIndex
DROP INDEX "Url_shortUrl_key";

-- AlterTable
ALTER TABLE "Click" DROP COLUMN "shortUrl",
ADD COLUMN     "short" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "shortUrl",
ADD COLUMN     "short" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_short_key" ON "Url"("short");

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_short_fkey" FOREIGN KEY ("short") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
