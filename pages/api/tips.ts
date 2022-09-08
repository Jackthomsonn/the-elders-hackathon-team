import type { NextApiRequest, NextApiResponse } from 'next'
import Redis from 'ioredis';

let client = new Redis("redis://:f7dc8051437441f1873dfa7439f76d8e@eu1-devoted-sunbeam-38011.upstash.io:38011");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const keys = await client.keys("*");
  const tips: any = await Promise.all(keys.map(async (key) => {
    return {
      key,
      content: await client.get(key)
    }
  }));
  
  res.status(200).json(tips)
}
