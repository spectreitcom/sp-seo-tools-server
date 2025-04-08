/*
  Warnings:

  - Added the required column `userId` to the `SaAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaAnalysis" ADD COLUMN     "userId" TEXT NOT NULL;
