/*
  Warnings:

  - Added the required column `to` to the `Withdrawal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Withdrawal" ADD COLUMN     "to" TEXT NOT NULL;
