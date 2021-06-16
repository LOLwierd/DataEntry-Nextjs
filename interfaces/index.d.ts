import { Marks, Result } from "@prisma/client";
import { NextApiRequest } from "next";

export interface SubjectResultQuery {
  sem: string;
  spuId: string;
}
export interface SubjectQuery {
  sem: string;
  courseId: number;
  batchId: number;
}

export type MarksI = Omit<Marks, "grade" | "percentage" | "points">;
export type ResultI = Omit<Result, "spi">;

export interface ResultMarksI {
  result: ResultI;
  marks: Omit<MarksI, "fid">[];
}
