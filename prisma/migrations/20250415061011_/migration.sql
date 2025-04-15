-- CreateTable
CREATE TABLE "SaAnalysisProgress" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,

    CONSTRAINT "SaAnalysisProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaAnalysisProgress" ADD CONSTRAINT "SaAnalysisProgress_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "SaAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
