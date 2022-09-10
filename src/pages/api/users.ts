// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { STACK_APP_COOKIE_NAME } from '../../lib/stackapps';
import { getUsers } from '../../lib/stackapps/api/users';
import type { StackUserData } from '../../lib/stackapps/types';

type ResponseData =
  | {
      users: StackUserData[];
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const name = req.query.name;
  const accessToken = req.cookies[STACK_APP_COOKIE_NAME];

  try {
    if (!name) {
      res.status(400);
      throw new Error('`name` must be provided');
    }

    const users = await getUsers(String(name), accessToken);

    // Cache for 2 days
    res.setHeader('Cache-Control', 'public, max-age=518400');
    res.status(200).json({ users });
  } catch (err) {
    if (err instanceof Error) {
      return res.json({ error: err.message });
    }

    return res.json({ error: 'Unknown error occured 😢' });
  }
}
