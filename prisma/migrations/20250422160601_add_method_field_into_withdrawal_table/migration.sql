/*
  Warnings:

  - Added the required column `method` to the `Withdrawal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WithdrawalMethods" AS ENUM ('PAYEER', 'PAYPAL', 'USDT', 'PERFECTMONEY');

-- AlterTable
ALTER TABLE "Withdrawal" ADD COLUMN     "method" "WithdrawalMethods" NOT NULL;
