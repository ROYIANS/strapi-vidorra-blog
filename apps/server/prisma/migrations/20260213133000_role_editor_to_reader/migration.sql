-- AlterEnum
ALTER TYPE "Role" RENAME TO "Role_old";
CREATE TYPE "Role" AS ENUM ('READER', 'EDITOR', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users"
ALTER COLUMN "role" TYPE "Role"
USING (
  CASE
    WHEN "role"::text = 'ADMIN' THEN 'ADMIN'
    WHEN "role"::text = 'USER' THEN 'EDITOR'
    WHEN "role"::text = 'EDITOR' THEN 'EDITOR'
    ELSE 'READER'
  END
)::"Role";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'READER';

-- Drop old enum type
DROP TYPE "Role_old";
