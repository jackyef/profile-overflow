// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTopAnswers } from '../../../../lib/stackapps/api/topAnswers';
import type { Answer } from '../../../../lib/stackapps/types';

type ResponseData =
  | {
      answers: Answer[];
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

    const result = await getTopAnswers(String(id));

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
