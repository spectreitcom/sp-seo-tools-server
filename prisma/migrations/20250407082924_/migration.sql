-- CreateEnum
CREATE TYPE "SaStageStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "SaAnalysis" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "localizationId" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "SaAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaPage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "analysisId" TEXT NOT NULL,

    CONSTRAINT "SaPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaStage" (
    "id" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "status" "SaStageStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "SaStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaPageFactor" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "factor" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SaPageFactor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaAnalysis" ADD CONSTRAINT "SaAnalysis_localizationId_fkey" FOREIGN KEY ("localizationId") REFERENCES "SaLocalization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaPage" ADD CONSTRAINT "SaPage_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "SaAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaStage" ADD CONSTRAINT "SaStage_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "SaPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaPageFactor" ADD CONSTRAINT "SaPageFactor_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "SaPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
