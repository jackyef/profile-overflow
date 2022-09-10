// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { STACK_APP_COOKIE_NAME } from '../../../../lib/stackapps';
import { getBadges } from '../../../../lib/stackapps/api/badges';
import type { Badge } from '../../../../lib/stackapps/types';

type ResponseData =
  | {
      badges: Badge[];
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const id = req.query.id;
  const accessToken = req.cookies[STACK_APP_COOKIE_NAME];

  try {
    if (!id) {
      res.status(400);
      throw new Error('`id` must be provided');
    }

    const badges = await getBadges(String(id), accessToken);

    if (!badges) {
      res.status(404);
      throw new Error(`No badges found for user id: ${id}`);
    }

    // Cache for 2 days
    res.setHeader('Cache-Control', 'public, max-age=518400');
    res.status(200).json({ badges });
  } catch (err) {
    if (err instanceof Error) {
      return res.json({ error: err.message });
    }

    return res.json({ error: 'Unknown error occured 😢' });
  }
}
