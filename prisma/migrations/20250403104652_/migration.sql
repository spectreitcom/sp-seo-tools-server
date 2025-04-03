-- CreateTable
CREATE TABLE "SaLocalization" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SaLocalization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaLocalization_countryCode_key" ON "SaLocalization"("countryCode");
