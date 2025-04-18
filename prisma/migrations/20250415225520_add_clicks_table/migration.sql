/*
  Warnings:

  - You are about to drop the column `clicks` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "clicks";

-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_shortUrl_fkey" FOREIGN KEY ("shortUrl") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
