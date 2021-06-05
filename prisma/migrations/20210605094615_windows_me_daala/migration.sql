/*
  Warnings:

  - The values [MR,MRS] on the enum `Title` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Title_new" AS ENUM ('Mr', 'Mrs');
ALTER TABLE "Student" ALTER COLUMN "title" TYPE "Title_new" USING ("title"::text::"Title_new");
ALTER TYPE "Title" RENAME TO "Title_old";
ALTER TYPE "Title_new" RENAME TO "Title";
DROP TYPE "Title_old";
COMMIT;
