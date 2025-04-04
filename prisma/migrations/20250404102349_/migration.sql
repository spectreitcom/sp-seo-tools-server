/*
  Warnings:

  - You are about to drop the column `domainParam` on the `RtLocalization` table. All the data in the column will be lost.
  - You are about to drop the column `domainParam` on the `SeLocalization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RtLocalization" DROP COLUMN "domainParam";

-- AlterTable
ALTER TABLE "SeLocalization" DROP COLUMN "domainParam";
