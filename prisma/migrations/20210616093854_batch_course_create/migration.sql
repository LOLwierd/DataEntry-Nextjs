/*
  Warnings:

  - You are about to drop the column `batch` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `Student` table. All the data in the column will be lost.
  - Added the required column `batchId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "batch",
DROP COLUMN "course",
ADD COLUMN     "batchId" INTEGER NOT NULL,
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Batch" (
    "batchId" SERIAL NOT NULL,
    "batch" TEXT NOT NULL,

    PRIMARY KEY ("batchId")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseId" SERIAL NOT NULL,
    "course" TEXT NOT NULL,

    PRIMARY KEY ("courseId")
);

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("batchId") REFERENCES "Batch"("batchId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE CASCADE ON UPDATE CASCADE;
