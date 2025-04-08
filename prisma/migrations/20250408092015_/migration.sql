/*
  Warnings:

  - Added the required column `html` to the `SaPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseCode` to the `SaPage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaPage" ADD COLUMN     "html" TEXT NOT NULL,
ADD COLUMN     "responseCode" INTEGER NOT NULL;
