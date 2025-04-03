/*
  Warnings:

  - A unique constraint covering the columns `[priceId]` on the table `SaSubscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `priceId` to the `SaSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaSubscription" ADD COLUMN     "priceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SaSubscription_priceId_key" ON "SaSubscription"("priceId");
