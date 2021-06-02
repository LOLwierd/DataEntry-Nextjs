import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Student } from ".prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const student: Student = req.body;
  const result = await prisma.student.create({
    data: student,
  });
  res.json(result);
}
