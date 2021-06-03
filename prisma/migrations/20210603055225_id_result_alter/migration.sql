/*
  Warnings:

  - The primary key for the `Result` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Marks" DROP CONSTRAINT "Marks_fid_fkey";

-- AlterTable
ALTER TABLE "Marks" ALTER COLUMN "fid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Result" DROP CONSTRAINT "Result_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Result_id_seq";

-- AddForeignKey
ALTER TABLE "Marks" ADD FOREIGN KEY ("fid") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;
