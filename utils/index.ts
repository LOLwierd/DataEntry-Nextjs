import { Marks } from "@prisma/client";
import { MarksI } from "../interfaces";

function calculateGrade(percentage: number): string {
    throw new Error("Function not implemented.");
}

function calculateGrades(marksI: MarksI[]): Marks[] {
  const marks: Marks[] = marksI.map((markI: MarksI) => {
    let mark = Object.assign(markI);
    mark["grade"] = calculateGrade(
      (markI.internal + markI.external) /
        (markI.internalTotal + markI.externalTotal)
    );
    return mark;
  });
  return marks;
}

export function completeMarks(marksI: MarksI[]): Marks[] {
  const marks: Marks[] = calculateGrades(marksI);
  return marks;
}