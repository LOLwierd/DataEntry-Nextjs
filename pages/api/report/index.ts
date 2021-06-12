import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

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
  // @ts-ignore
  const { spuId } = req.query as string;
  const students = await prisma.student.findUnique({
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
    res.json(students);
  } else res.status(404).end();
}
