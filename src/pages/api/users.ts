// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
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

  try {
    if (!name) {
      res.status(400);
      throw new Error('`name` must be provided');
    }

    const users = await getUsers(String(name));

    res.status(200).json({ users });
  } catch (err) {
    if (err instanceof Error) {
      return res.json({ error: err.message });
    }

    return res.json({ error: 'Unknown error occured 😢' });
  }
}
