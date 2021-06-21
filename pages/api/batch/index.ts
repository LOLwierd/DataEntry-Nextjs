import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import ELog from '../../../utils/ELog';

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
  const batches = await prisma.batch.findMany({});
  res.json(batches);
}
