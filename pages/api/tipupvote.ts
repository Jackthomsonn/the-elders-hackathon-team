import type { NextApiRequest, NextApiResponse } from 'next'

import Redis from 'ioredis';

let client = new Redis("redis://:cbbfe526135445fb83482db6368e6e2b@eu1-devoted-sunbeam-38011.upstash.io:38011");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { tipName } = req.query;
  const keys = await client.keys("*")

  const tipUpvotes: any[] = [];
  for(let i =0; i < keys.length; i++){
    if(keys[i].includes(`_upvote`)) {
      tipUpvotes.push({
        data: await client.get(keys[i]),
        key:keys[i]
      })
    }
  }
  const results = await Promise.all(
    tipUpvotes
  );

  

  const tipUp = results.reduce((prevItem, nextItem)=>{
    return {
      ...prevItem,
      [nextItem.key]: nextItem.data
    }
  },{})

  return res.status(200).json({tipUpvotes:tipUp});
}
