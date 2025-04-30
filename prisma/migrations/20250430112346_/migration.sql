-- AlterEnum
ALTER TYPE "GsQueryStatus" ADD VALUE 'ERROR';

-- AlterTable
ALTER TABLE "GsQuery" ADD COLUMN     "checkedAt" INTEGER NOT NULL DEFAULT 0;
