import { NextApiRequest, NextApiResponse } from "next";
import { IReport, Report } from "../../../interfaces";
import prisma from "../../../lib/prisma";
import { completeMarks, completeReport, completeResult } from "../../../utils";

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
  res.status(405).end();
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    // @ts-ignore
    const { spuId } = req.query as string;
    const students: IReport | null = await prisma.student.findUnique({
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
    if (students) {
      const report: Report = completeReport(students)
      res.json(report);
    } else res.status(404).end();
  } catch (e) {
    console.log(e);
    throw e;
  }
}
