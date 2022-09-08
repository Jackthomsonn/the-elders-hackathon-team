import type { NextApiRequest, NextApiResponse } from 'next'
import Redis from 'ioredis';

let client = new Redis("redis://:f7dc8051437441f1873dfa7439f76d8e@eu1-devoted-sunbeam-38011.upstash.io:38011");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Boolean>
) {
  const tips = [
    {
      name: 'shorter_showers',
      content: 'Reduce your shower time to less than 5 minutes'
    },
    {
      name: 'kettle_water',
      content: 'Only boil the amount of water you need for your cuppa'
    },
    {
      name: 'wear_warm_clothing',
      content: 'Wear warm jumpers and socks and turn your thermostat down a couple of degrees'
    }
  ]
  
  for (const tip of tips) {
    client.set(tip.name, tip.content)
  }
  client.set("usage", 250)
  client.set("budget", 500)
  res.status(200).json(true)
}
