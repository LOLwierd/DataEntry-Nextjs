import { Marks, Result, Student, Subject } from "@prisma/client";
import {
  IReport,
  MarksI,
  Report,
  ReportMarks,
  ReportResult,
  ReportWCPI,
  ResultI,
  ResultMarksI,
  ResultWCPI,
} from "../interfaces";
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Number {
    between(upper: number, lower: number): boolean;
  }
}

Number.prototype.between = function between(upper: number, lower: number) {
  return this >= lower && this <= upper;
};

function calculateGrade(percentage: number): string {
  if (percentage >= 90) return "A++";
  if (percentage >= 80) return "A+";
  if (percentage >= 70) return "A";
  if (percentage >= 65) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 55) return "B-";
  if (percentage >= 50) return "C";
  if (percentage >= 45) return "D";
  if (percentage >= 40) return "E";
  if (percentage < 40) return "F";
  throw Error("Percentage out of bounds!!");
}

function calculatePercentage(
  internal: number,
  internalTotal: number,
  external: number,
  externalTotal: number
): number {
  try {
    return Number.parseFloat(
      (((internal + external) / (internalTotal + externalTotal)) * 100).toFixed(
        2
      )
    );
  } catch (e) {
    const error = e as Error;
    throw Error(
      "Error in percentage!! Maybe you forgot to send some attributes?\n" +
        error.message
    );
  }
}

function calculatePoint(grade: string): number {
  switch (grade) {
    case "A++":
      return 10;
    case "A+":
      return 9;
    case "A":
      return 8;
    case "B+":
      return 7;
    case "B":
      return 6.5;
    case "B-":
      return 6;
    case "C":
      return 5.5;
    case "D":
      return 5;
    case "E":
      return 4.5;
    case "F":
      return 4;
    default:
      throw Error("Grade out of range!! How does this even happen bro");
  }
}

function calculateSPI(marksData: Marks[]): number {
  const subNum: number = marksData.length;
  const pointsSum: number = marksData.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);
  return +(pointsSum / subNum).toFixed(2);
}

function calculateGrades(marksI: Partial<Marks>[]): Partial<Marks>[] {
  const marks: Partial<Marks>[] = marksI.map((markI) => {
    let mark: Partial<Marks> = Object.assign(markI);
    mark.grade = calculateGrade(markI?.percentage ?? -1);
    return mark;
  });
  return marks;
}

function calculatePoints(marksI: Partial<Marks>[]): Marks[] {
  const marks: Marks[] = marksI.map((markI) => {
    let mark: Marks = Object.assign(markI);
    mark.points = calculatePoint(mark.grade);
    return mark;
  });
  return marks;
}

function calculatePercentages(marksI: MarksI[]): Partial<Marks>[] {
  const marks: Partial<Marks>[] = marksI.map((markI) => {
    let mark: Partial<Marks> = Object.assign(markI);
    mark["percentage"] = calculatePercentage(
      mark?.internal ?? -1,
      mark?.internalTotal ?? 0,
      mark?.external ?? -1,
      mark?.externalTotal ?? 0
    );
    return mark;
  });
  return marks;
}

export function completeMarks(marksI: MarksI[]): Marks[] {
  const marksWpercentage: Partial<Marks>[] = calculatePercentages(marksI);
  const marksWgrades: Partial<Marks>[] = calculateGrades(marksWpercentage);
  const marks: Marks[] = calculatePoints(marksWgrades);
  return marks;
}

export function completeResult(resultI: ResultMarksI): {
  resultData: Result;
  marksData: Marks[];
} {
  const uuid: string = uuidv4();
  const marksI: MarksI[] = resultI.marks.map((markI) => {
    let mark: MarksI = Object.assign(markI);
    mark.fid = uuid;
    return mark;
  });
  const marksData = completeMarks(marksI);
  const resultData: Result = Object.assign(resultI.result);
  resultData.spi = calculateSPI(marksData);
  resultData.id = uuid;
  return { resultData, marksData };
}

function calculateCPI(SPIs: number[]): number {
  return Number.parseFloat(
    (SPIs.reduce((prev, curr) => prev + curr, 0) / SPIs.length).toFixed(2)
  );
}

function calculateCPIs(iReport: IReport): ReportWCPI {
  var SPIs: number[] = [];
  var report: ReportWCPI = Object.assign(iReport);
  report!.Result = iReport.Result.map((result) => {
    var reportResult: ResultWCPI = Object.assign(result);
    SPIs.push(reportResult.spi)
    reportResult.cpi = calculateCPI(SPIs);
    return reportResult;
  });
  return report;
}

function calculateMarks(resultsWcpi: ResultWCPI[]): ReportResult[] {
  const reportResults: ReportResult[] = resultsWcpi.map((result) => {
    const marks: (ReportMarks & { subject: Subject })[] = result.Marks.map(
      (mark) => {
        const rMark: ReportMarks & { subject: Subject } = Object.assign(mark);
        rMark.marks = mark.internal + mark.external;
        rMark.totalMarks = mark.internalTotal + mark.externalTotal;
        return rMark;
      }
    );
    const rResult: ReportResult = Object.assign(result);
    rResult.Marks = marks;
    return rResult;
  });
  return reportResults;
}

export function completeReport(iReport: IReport): Report {
  const reportWcpi = calculateCPIs(iReport);
  console.log("ReportWCPI is", reportWcpi);
  var report: Report = Object.assign(reportWcpi);
  report.Result = calculateMarks(reportWcpi.Result);
  console.log("Report is", report);
  return report;
}
