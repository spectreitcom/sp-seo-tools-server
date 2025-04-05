-- CreateEnum
CREATE TYPE "GsQueryStatus" AS ENUM ('PENDING', 'DONE');

-- CreateTable
CREATE TABLE "GsQuery" (
    "id" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "status" "GsQueryStatus" NOT NULL DEFAULT 'PENDING',
    "results" JSONB,
    "metadata" JSONB,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "GsQuery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GsQuery_processId_key" ON "GsQuery"("processId");
