import { Marks, Result } from "@prisma/client";
import { MarksI, ResultI, ResultMarksI } from "../interfaces";

declare global {
  interface Number {
    between(upper: number, lower: number): boolean;
  }
}

function calculateGrade(percentage: number): string {
  if (percentage.between(100, 90)) return "A++";
  if (percentage.between(90, 80)) return "A+";
  if (percentage.between(80, 70)) return "A";
  if (percentage.between(70, 65)) return "B+";
  if (percentage.between(65, 60)) return "B";
  if (percentage.between(60, 55)) return "B-";
  if (percentage.between(55, 50)) return "C";
  if (percentage.between(50, 45)) return "D";
  if (percentage.between(45, 40)) return "E";
  if (percentage < 40) return "F";
  throw Error("Percentage out of bounds!!");
}

function calculatePercentage(
  internal: number,
  internalTotal: number,
  external: number,
  externalTotal: number
): number {
  return (internal + external) / (internalTotal + externalTotal);
}

function calculateSPI(resultMarksI: ResultMarksI): number {
  const subNum = resultMarksI.marks.length;
  const percentSum: number = resultMarksI.marks.reduce((prev, curr) => {
    return (
      prev +
      calculatePercentage(
        curr.internal,
        curr.internalTotal,
        curr.external,
        curr.externalTotal
      )
    );
  }, 0);
  return percentSum / subNum;
}

Number.prototype.between = function between(upper: number, lower: number) {
  return this >= lower && this <= upper;
};

function calculateGrades(marksI: MarksI[]): Marks[] {
  const marks: Marks[] = marksI.map((markI: MarksI) => {
    let mark = Object.assign(markI);
    mark["grade"] = calculateGrade(
      calculatePercentage(
        mark.internal,
        mark.internalTotal,
        mark.external,
        mark.externalTotal
      )
    );
    return mark;
  });
  return marks;
}

export function completeMarks(marksI: MarksI[]): Marks[] {
  const marks: Marks[] = calculateGrades(marksI);
  return marks;
}

export function completeResult(resultI: ResultMarksI): Result {
  const result: Result = Object.assign(resultI.result);
  result["spi"] = calculateSPI(resultI);
  return result;
}
