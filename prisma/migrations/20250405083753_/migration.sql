/*
  Warnings:

  - Added the required column `device` to the `GsQuery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localizationCode` to the `GsQuery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `query` to the `GsQuery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultsNumber` to the `GsQuery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GsQuery" ADD COLUMN     "device" TEXT NOT NULL,
ADD COLUMN     "localizationCode" TEXT NOT NULL,
ADD COLUMN     "query" TEXT NOT NULL,
ADD COLUMN     "resultsNumber" INTEGER NOT NULL;
