import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { completeMarks, completeResult } from "../../../utils";
import { MarksI, ResultI, ResultMarksI } from "../../../interfaces";
import { Marks, Result } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await handleGET(req, res);
      break;
    case "POST":
      await handlePOST(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse<any>) {
  const resultDataI: ResultMarksI = req.body;
  const { resultData, marksData }: { resultData: Result; marksData: Marks[] } =
    completeResult(resultDataI);
  console.log("RESULT DATA", resultData);
  console.log("MARKS DATA", marksData);
  const resultsResult = await prisma.result.create({ data: resultData });
  const resultsMarks = await prisma.marks.createMany({ data: marksData });
  res.json({ resultsResult, resultsMarks });
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(405).end();
}
