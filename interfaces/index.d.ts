import { Marks, Result } from "@prisma/client";
export interface SubjectQuery {
  sem: string;
  batch: string;
  course: string;
}

export type MarksI = Omit<Marks, "grade">;
export type ResultI = Omit<Result, "spi">;

export interface ResultMarksI {
  result: ResultI;
  marks: Omit<MarksI, "fid">[];
}
