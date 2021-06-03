/*
  Warnings:

  - Added the required column `points` to the `Marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Marks" ADD COLUMN     "points" INTEGER NOT NULL;
