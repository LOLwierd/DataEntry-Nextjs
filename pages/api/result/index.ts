import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { completeResult } from "../../../utils";
import { MarksI, ResultI, ResultMarksI } from "../../../interfaces";

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
  const resultData = completeResult(resultDataI);
  const result = await prisma.result.create({ data: resultData });
  res.json(result);
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(405).end();
}
