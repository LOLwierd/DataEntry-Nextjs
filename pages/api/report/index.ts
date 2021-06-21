import { NextApiRequest, NextApiResponse } from "next";
import { IReport, Report } from "../../../types";
import prisma from "../../../lib/prisma";
import { completeMarks, completeReport, completeResult } from "../../../utils";
import ELog from "../../../utils/ELog";
import { logger } from "../../../lib/logger"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await ELog(handleGET, req, res);
      break;
    case "POST":
      await ELog(handlePOST, req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(405).end();
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  // @ts-ignore
  const { spuId } = req.query as string;
  logger.info(`Attempting to Fetch report for student ${spuId}`)
  const result: IReport | null = await prisma.student.findUnique({
    where: { spuId },
    include: {
      Result: {
        include: {
          Marks: {
            include: {
              subject: true,
            },
          },
        },
      },
    },
  });
  if (result) {
    const report: Report = completeReport(result)
    res.json(report);
  } else {
    logger.warn(`No report found for student ${spuId}!`)
    res.status(404).end();
  }
}
