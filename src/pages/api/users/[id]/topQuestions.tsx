// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTopQuestions } from '../../../../lib/stackapps/api/topQuestions';
import type { Question } from '../../../../lib/stackapps/types';

type ResponseData =
  | {
      questions: Question[];
      total: number;
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

    const result = await getTopQuestions(String(id));

    // Cache for 2 days
    res.setHeader('Cache-Control', 'public, max-age=518400');
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      return res.json({ error: err.message });
    }

    return res.json({ error: 'Unknown error occured 😢' });
  }
}
