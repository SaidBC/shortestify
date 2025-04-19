/*
  Warnings:

  - The values [CLICK] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `fileId` on the `ShortLink` table. All the data in the column will be lost.
  - You are about to drop the `RedirectURL` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `uploadLinkId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('WITHDRAW', 'REDIRECT', 'UPLOAD');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ShortLink" DROP CONSTRAINT "ShortLink_fileId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink" DROP CONSTRAINT "ShortLink_urlId_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "uploadLinkId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ShortLink" DROP COLUMN "fileId",
ADD COLUMN     "uploadLinkId" TEXT;

-- DropTable
DROP TABLE "RedirectURL";

-- CreateTable
CREATE TABLE "RedirectLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "RedirectLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadLink" (
    "id" TEXT NOT NULL,

    CONSTRAINT "UploadLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShortLink" ADD CONSTRAINT "ShortLink_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "RedirectLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink" ADD CONSTRAINT "ShortLink_uploadLinkId_fkey" FOREIGN KEY ("uploadLinkId") REFERENCES "UploadLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploadLinkId_fkey" FOREIGN KEY ("uploadLinkId") REFERENCES "UploadLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
