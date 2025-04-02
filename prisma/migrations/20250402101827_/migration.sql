-- CreateTable
CREATE TABLE "SaUserSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sessionId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "SaUserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaUserSubscription_userId_key" ON "SaUserSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SaUserSubscription_customerId_key" ON "SaUserSubscription"("customerId");

-- AddForeignKey
ALTER TABLE "SaUserSubscription" ADD CONSTRAINT "SaUserSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "SaSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
