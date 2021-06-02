/*
  Warnings:

  - Added the required column `external` to the `Marks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalTotal` to the `Marks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Marks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internal` to the `Marks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internalTotal` to the `Marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Marks" ADD COLUMN     "external" INTEGER NOT NULL,
ADD COLUMN     "externalTotal" INTEGER NOT NULL,
ADD COLUMN     "grade" TEXT NOT NULL,
ADD COLUMN     "internal" INTEGER NOT NULL,
ADD COLUMN     "internalTotal" INTEGER NOT NULL;
