-- AlterTable
ALTER TABLE "users" ADD COLUMN "clerkId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");
