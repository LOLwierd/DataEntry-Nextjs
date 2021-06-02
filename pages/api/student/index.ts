import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Student } from "@prisma/client";

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
  const studentData: Student = req.body;
  const result = await prisma.student.create({
    data: studentData,
  });
  res.json(result);
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(405).end();
}
