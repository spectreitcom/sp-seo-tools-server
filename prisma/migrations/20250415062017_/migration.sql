/*
  Warnings:

  - A unique constraint covering the columns `[analysisId]` on the table `SaAnalysisProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SaAnalysisProgress_analysisId_key" ON "SaAnalysisProgress"("analysisId");
