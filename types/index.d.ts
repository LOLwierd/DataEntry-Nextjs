import { Batch, Marks, Result, Student, Subject, Course } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface SubjectResultQuery {
  sem: string;
  spuId: string;
}
export interface SubjectQuery {
  sem: string;
  courseId: number;
  batchId: number;
}

export type APIFunction = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

export type IReport =
  | Student & {
    Result: (Result & {
      Marks: (Marks & {
        subject: Subject;
      })[];
    })[];
  };

export type Report =
  | Student & {
    Result: ReportResult[];
    course: Course;
    batch: Batch;
  };
interface ReportMarks
  extends Omit<
  Marks,
  "internal" | "internalTotal" | "external" | "externalTotal"
  > {
  marks: number;
  totalMarks: number;
}

export type ResultWCPI = Result & { cpi: number } & {
  Marks: (Marks & {
    subject: Subject;
  })[];
};

export type ReportWCPI =
  | (Student & {
    Result: ResultWCPI[];
  })

export type ReportResult = Result & { cpi: number } & {
  Marks: (ReportMarks & {
    subject: Subject;
  })[];
};

export type MarksI = Omit<Marks, "grade" | "percentage" | "points">;
export type ResultI = Omit<Result, "spi">;

export interface ResultMarksI {
  result: ResultI;
  marks: Omit<MarksI, "fid">[];
}
