/*
  Warnings:

  - You are about to drop the column `batch` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `batchId` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "batch",
DROP COLUMN "course",
ADD COLUMN     "batchId" INTEGER NOT NULL,
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD FOREIGN KEY ("batchId") REFERENCES "Batch"("batchId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE CASCADE ON UPDATE CASCADE;
