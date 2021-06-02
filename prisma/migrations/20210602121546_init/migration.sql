-- CreateEnum
CREATE TYPE "Title" AS ENUM ('MR', 'MRS');

-- CreateTable
CREATE TABLE "Student" (
    "spuId" VARCHAR(16) NOT NULL,
    "title" "Title" NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,

    PRIMARY KEY ("spuId")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "fspuId" VARCHAR(16) NOT NULL,
    "sem" TEXT NOT NULL,
    "examMonth" TEXT NOT NULL,
    "examYear" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "spi" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subCode" TEXT NOT NULL,
    "subName" TEXT NOT NULL,
    "sem" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "batch" TEXT NOT NULL,

    PRIMARY KEY ("subCode")
);

-- CreateTable
CREATE TABLE "Marks" (
    "id" SERIAL NOT NULL,
    "fid" INTEGER NOT NULL,
    "subjectSubCode" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Result" ADD FOREIGN KEY ("fspuId") REFERENCES "Student"("spuId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marks" ADD FOREIGN KEY ("fid") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marks" ADD FOREIGN KEY ("subjectSubCode") REFERENCES "Subject"("subCode") ON DELETE CASCADE ON UPDATE CASCADE;
