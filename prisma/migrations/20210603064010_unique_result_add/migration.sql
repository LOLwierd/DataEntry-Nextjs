/*
  Warnings:

  - A unique constraint covering the columns `[sem,fspuId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Result.sem_fspuId_unique" ON "Result"("sem", "fspuId");
