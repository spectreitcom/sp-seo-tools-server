-- CreateTable
CREATE TABLE "SaSubscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "searchedPages" INTEGER NOT NULL,
    "analysisPerMonth" INTEGER NOT NULL,

    CONSTRAINT "SaSubscription_pkey" PRIMARY KEY ("id")
);
