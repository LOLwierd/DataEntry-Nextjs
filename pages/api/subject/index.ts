import { NextApiRequest, NextApiResponse } from 'next';
import { Subject } from '@prisma/client';
import prisma from '../../../lib/prisma';
import { SubjectQuery, SubjectResultQuery } from '../../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await handleGET(req, res);
      break;
    case 'POST':
      await handlePOST(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const subjectData: Subject[] = req.body;
  const result = await prisma.subject.createMany({ data: subjectData });
  res.json(result);
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.query['spuId'])
    // @ts-ignore
    subjectResultQuery(req.query, res);
  // @ts-ignore
  else if (req.query["batch"]) subjectQuery(req.query, res)
  else {
    const results = prisma.subject.findMany({})
    res.json(results)
  }
}

async function subjectQuery(subjectQuery: SubjectQuery, res: NextApiResponse) {
  const results = await prisma.subject.findMany({
    where: subjectQuery,
    select: { subCode: true, subName: true },
  });
  res.json(results);
}

async function subjectResultQuery(
  subjectQuery: SubjectResultQuery,
  res: NextApiResponse
) {
  const student = await prisma.student.findUnique({
    where: { spuId: subjectQuery.spuId },
    select: { batch: true, course: true },
  });
  if (student) {
    const query = {
      sem: subjectQuery.sem,
      batch: student.batch,
      course: student.course,
    };
    console.log(query);
    const results = await prisma.subject.findMany({
      where: query,
      select: { subCode: true, subName: true },
    });
    const subjects = results.map((subject) => {
      return {
        subjectSubCode: subject.subCode,
        subName: subject.subName,
      };
    });
    res.json(subjects);
  } else res.status(500).end();
}
