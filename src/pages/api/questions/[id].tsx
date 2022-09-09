// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getQuestionById } from '../../../lib/stackapps/api/questionById';
import type { Question } from '../../../lib/stackapps/types';

type ResponseData =
  | {
      question: Question;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const id = req.query.id;

  try {
    if (!id) {
      res.status(400);
      throw new Error('`id` must be provided');
    }

    const question = await getQuestionById(String(id));

    if (!question) {
      res.status(404);
      throw new Error(`No question found for id: ${id}`);
    }

    // Cache for 2 days
    res.setHeader('Cache-Control', 'public, max-age=518400');
    res.status(200).json({ question });
  } catch (err) {
    if (err instanceof Error) {
      return res.json({ error: err.message });
    }

    return res.json({ error: 'Unknown error occured 😢' });
  }
}
