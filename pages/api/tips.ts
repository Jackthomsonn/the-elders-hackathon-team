import type { NextApiRequest, NextApiResponse } from 'next'
import Redis from 'ioredis';

let client = new Redis("redis://:cbbfe526135445fb83482db6368e6e2b@eu1-devoted-sunbeam-38011.upstash.io:38011");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const keys = await client.keys("*");
  const tips: any[] = await Promise.all(keys.map(async (key) => {
    if(key.includes('_tip')) {
      return {
        key,
        content: await client.get(key)
      }
    }
  }));

  // await client.quit()
  
  res.status(200).json(tips.filter(tip => tip?.content));
}
