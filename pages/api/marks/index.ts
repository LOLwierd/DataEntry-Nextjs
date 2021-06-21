import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Marks } from "@prisma/client";
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
  const marksData: Marks[] = req.body;
  const results = await prisma.marks.createMany({ data: marksData });
  res.json(results);
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(405).end();
}
