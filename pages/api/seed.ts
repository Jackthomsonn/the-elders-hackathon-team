import type { NextApiRequest, NextApiResponse } from 'next'
import Redis from 'ioredis';

let client = new Redis("redis://:cbbfe526135445fb83482db6368e6e2b@eu1-devoted-sunbeam-38011.upstash.io:38011");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Boolean>
) {
  const tips = [
    {
      name: 'shorter_showers_tip',
      content: 'Reduce your shower time to less than 5 minutes'
    },
    {
      name: 'kettle_water_tip',
      content: 'Only boil the amount of water you need for your cuppa'
    },
    {
      name: 'wear_warm_clothing_tip',
      content: 'Wear warm jumpers and socks and turn your thermostat down a couple of degrees'
    }
  ]
  
  for  (const tip of tips) {
     client.set(tip.name, tip.content)
  }
   client.set("usage", 250)
   client.set("budget", 500)

   client.set("weekly_usage", 1800)
   client.set("weekly_budget", 3750)

   client.set("monthly_usage", 8000)
   client.set("monthly_budget", 15000)

   client.set("yearly_usage", 91250)
   client.set("yearly_budget", 180000)

  // await client.quit();
  res.status(200).json(true)
}
