import { NextApiRequest, NextApiResponse } from "next";
import { Result } from ".prisma/client";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resultData: Result = req.body;
  const result = await prisma.result.create({ data: resultData });
  res.json(result);
}
