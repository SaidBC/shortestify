/*
  Warnings:

  - You are about to drop the column `short` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `short` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortUrl` to the `Click` table without a default value. This is not possible if the table is not empty.
  - The required column `shortUrl` was added to the `Url` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_short_fkey";

-- DropIndex
DROP INDEX "Url_short_key";

-- AlterTable
ALTER TABLE "Click" DROP COLUMN "short",
ADD COLUMN     "shortUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "short",
ADD COLUMN     "shortUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortUrl_key" ON "Url"("shortUrl");

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_shortUrl_fkey" FOREIGN KEY ("shortUrl") REFERENCES "Url"("shortUrl") ON DELETE RESTRICT ON UPDATE CASCADE;
