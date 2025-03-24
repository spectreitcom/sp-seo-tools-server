-- CreateEnum
CREATE TYPE "UserAuthProvider" AS ENUM ('GOOGLE', 'CREDENTIALS');

-- CreateEnum
CREATE TYPE "RtDomainPositionStaus" AS ENUM ('PENDING', 'DONE');

-- CreateEnum
CREATE TYPE "RtKeywordGrowth" AS ENUM ('UP', 'DOWN', 'NO_CHANGE');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "googleId" TEXT,
    "provider" "UserAuthProvider" NOT NULL,
    "picture" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RtDomain" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "RtDomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RtKeyword" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "device" TEXT,
    "localizationId" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "growth" "RtKeywordGrowth" NOT NULL DEFAULT 'NO_CHANGE',

    CONSTRAINT "RtKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RtDomainPosition" (
    "id" TEXT NOT NULL,
    "keywordId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "timestamp" INTEGER NOT NULL,
    "processId" TEXT NOT NULL,
    "status" "RtDomainPositionStaus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "RtDomainPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RtUserSubscriptionInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "maxKeywordsQty" INTEGER NOT NULL,
    "maxSearchedPages" INTEGER NOT NULL,

    CONSTRAINT "RtUserSubscriptionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RtLocalization" (
    "id" TEXT NOT NULL,
    "domainParam" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RtLocalization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RtTestingMode" (
    "id" TEXT NOT NULL,
    "expiresAt" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "maxKeywordsQty" INTEGER NOT NULL,
    "maxSearchedPages" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "RtTestingMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankTrackerSubscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "maxKeywordsQty" INTEGER NOT NULL,
    "maxSearchedPages" INTEGER NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "priceId" TEXT NOT NULL,

    CONSTRAINT "RankTrackerSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankTrackerUserSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "subscriptionId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "RankTrackerUserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeLocalization" (
    "id" TEXT NOT NULL,
    "domainParam" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SeLocalization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RtDomain_userId_text_key" ON "RtDomain"("userId", "text");

-- CreateIndex
CREATE UNIQUE INDEX "RtDomainPosition_timestamp_key" ON "RtDomainPosition"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "RtDomainPosition_processId_key" ON "RtDomainPosition"("processId");

-- CreateIndex
CREATE UNIQUE INDEX "RtUserSubscriptionInfo_userId_key" ON "RtUserSubscriptionInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RtLocalization_countryCode_key" ON "RtLocalization"("countryCode");

-- CreateIndex
CREATE UNIQUE INDEX "RtTestingMode_userId_key" ON "RtTestingMode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RankTrackerSubscription_priceId_key" ON "RankTrackerSubscription"("priceId");

-- CreateIndex
CREATE UNIQUE INDEX "RankTrackerUserSubscription_userId_key" ON "RankTrackerUserSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RankTrackerUserSubscription_customerId_key" ON "RankTrackerUserSubscription"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "SeLocalization_countryCode_key" ON "SeLocalization"("countryCode");

-- AddForeignKey
ALTER TABLE "RtKeyword" ADD CONSTRAINT "RtKeyword_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "RtDomain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RtKeyword" ADD CONSTRAINT "RtKeyword_localizationId_fkey" FOREIGN KEY ("localizationId") REFERENCES "RtLocalization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RtDomainPosition" ADD CONSTRAINT "RtDomainPosition_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "RtKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankTrackerUserSubscription" ADD CONSTRAINT "RankTrackerUserSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "RankTrackerSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
