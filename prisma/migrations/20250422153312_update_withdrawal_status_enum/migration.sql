/*
  Warnings:

  - The values [WITHDRAW,CLICK] on the enum `WithdrawalStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WithdrawalStatus_new" AS ENUM ('PENDING', 'APPROVED', 'CANCELED', 'REJECTED', 'COMPLETED');
ALTER TABLE "Withdrawal" ALTER COLUMN "status" TYPE "WithdrawalStatus_new" USING ("status"::text::"WithdrawalStatus_new");
ALTER TYPE "WithdrawalStatus" RENAME TO "WithdrawalStatus_old";
ALTER TYPE "WithdrawalStatus_new" RENAME TO "WithdrawalStatus";
DROP TYPE "WithdrawalStatus_old";
COMMIT;
