import { NextApiRequest, NextApiResponse } from "next";
import { Subject } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { SubjectQuery } from "../../../interfaces";

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

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const subjectData: Subject = req.body;
  const result = await prisma.subject.create({ data: subjectData });
  res.json(result);
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  const subjectQuery: SubjectQuery = req.body;
  const results = await prisma.subject.findMany({
    where: {
      AND: [
        { sem: subjectQuery.sem },
        { batch: subjectQuery.batch },
        { course: subjectQuery.batch },
      ],
    },
  });
  res.json(results)
}
