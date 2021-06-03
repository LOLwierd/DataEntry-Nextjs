/*
  Warnings:

  - Added the required column `percentage` to the `Marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Marks" ADD COLUMN     "percentage" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "points" SET DATA TYPE DOUBLE PRECISION;
