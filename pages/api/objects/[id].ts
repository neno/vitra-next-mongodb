// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAsString } from '../../../helper';
import { fetchObjectById } from '../../../lib/api-calls';

type Data = {
  object: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  const object = await fetchObjectById(getAsString(id));

  res.status(200).json({ object });
}
