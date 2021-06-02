export interface SubjectQuery {
  sem: string;
  batch: string;
  course: string;
}

export type MarksI = Omit<Marks, "grade">;
