import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Student } from ".prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { spuId } = req.query as { spuId: string };
  const student = await prisma.student.findUnique({ where: { spuId: spuId } });
  if (student) res.json(student);
  else res.status(404).json({ messsage: "Student not found!" });
}
