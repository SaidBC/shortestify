/*
  Warnings:

  - Added the required column `countryCode` to the `Click` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Withdrawal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Click" ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "countryCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Withdrawal" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
