-- CreateTable
CREATE TABLE "SaUserSubscriptionInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "searchedPages" INTEGER NOT NULL,
    "analysisPerMonth" INTEGER NOT NULL,

    CONSTRAINT "SaUserSubscriptionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaTestingMode" (
    "id" TEXT NOT NULL,
    "expiresAt" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "searchedPages" INTEGER NOT NULL,
    "analysisPerMonth" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "SaTestingMode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaUserSubscriptionInfo_userId_key" ON "SaUserSubscriptionInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SaTestingMode_userId_key" ON "SaTestingMode"("userId");
