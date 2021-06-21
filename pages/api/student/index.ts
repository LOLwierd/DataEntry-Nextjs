import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Student } from "@prisma/client";
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
  const studentData: Student = req.body;
  const result = await prisma.student.create({
    data: studentData,
  });
  res.json(result);
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  const studentsData = await prisma.student.findMany({});
  res.json(studentsData);
  return;
}
