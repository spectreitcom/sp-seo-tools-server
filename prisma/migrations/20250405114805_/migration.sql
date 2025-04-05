/*
  Warnings:

  - Added the required column `userId` to the `GsQuery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GsQuery" ADD COLUMN     "userId" TEXT NOT NULL;
