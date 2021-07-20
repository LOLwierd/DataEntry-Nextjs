import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { completeMarks, completeResult } from "../../../utils";
import { MarksI, ResultI, ResultMarksI } from "../../../types";
import { Marks, Result } from "@prisma/client";
import ELog from "../../../utils/ELog";

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
  res.send(405);
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  const { spuId } = req.query as { spuId: string };
  const students = await prisma.student.findUnique({
    where: { spuId: spuId },
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
  if (students && students.Result.length > 0) {
    res.json(students.Result);
  } else res.status(404).json({ messsage: "Results not found!" });
}
