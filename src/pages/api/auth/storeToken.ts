// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData =
  | {
      success: boolean;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const accessToken = req.query.accessToken;
  const expires = req.query.expires;

  try {
    // Set cookie to be used in other requests
    res.setHeader(
      'Set-Cookie',
      `stackapp_access_token=${accessToken}; SameSite=Strict; HttpOnly; Max-Age=${expires}`,
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      return res.json({ error: err.message });
    }

    return res.json({ error: 'Unknown error occured 😢' });
  }
}
