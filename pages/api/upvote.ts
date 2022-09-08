import type { NextApiRequest, NextApiResponse } from 'next'

import Redis from 'ioredis';

let client = new Redis("redis://:cbbfe526135445fb83482db6368e6e2b@eu1-devoted-sunbeam-38011.upstash.io:38011");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number | { message: string }>
) {
  const tipName = req.body.tipName;

  if(!tipName) return res.status(400).send({message: "Tip name is required"});

  const suffix = "upvote";
  const tipUpvoteName = `${tipName}_${suffix}`;

  const tipUpvote = await client.get(tipUpvoteName);

  const tipUpVoteParsed = parseInt(tipUpvote as string);

  if (!tipUpvote) {
    client.set(tipUpvoteName, 1);
  } else {
    client.set(tipUpvoteName, tipUpVoteParsed + 1);
  }

  // await client.quit();

  res.status(200).json(tipUpVoteParsed ? tipUpVoteParsed + 1 : 1);
}
