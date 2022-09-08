import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { UsageTimescales } from '../../shared/types'

let client = new Redis("redis://:cbbfe526135445fb83482db6368e6e2b@eu1-devoted-sunbeam-38011.upstash.io:38011");
client.set("foo", "bar");

type EnergyData = {
  usage: number,
  budget: number
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnergyData|Object>
) {
  try
  {
    const {timescale}: any  = req.query

    const energyData = await getEnergy(timescale)
    // await client.quit();
    res.status(200).json(energyData)
  }
  catch (error)
  {
    // await client.quit();
    res.status(400).send({error, message: "Something went wrong"})
  }
}

const getEnergy = async (timescale?: string) => {
  let usageData: any = "0";
  let budgetData: any = "0";

  switch (timescale) {
    case UsageTimescales.DAILY:
      usageData = await client.get("usage");
      budgetData = await client.get("budget");
    case UsageTimescales.WEEKLY:
      usageData = await client.get("weekly_usage");
      budgetData = await client.get("weekly_budget");
    case UsageTimescales.MONTHLY:
      usageData = await client.get("monthly_usage");
      budgetData = await client.get("monthly_usage");
    case UsageTimescales.YEARLY: 
      usageData = await client.get("yearly_usage");
      budgetData = await client.get("yearly_budget");
    default:
      usageData = await client.get("usage");
      budgetData = await client.get("budget");
  }
    const energyData = {
      usage: wobble(usageData),
      budget: parseInt(budgetData),
    };

    return energyData
}

const wobble = (value: string) => {
  const intValue = parseInt(value)
  const val = intValue + Math.floor(Math.random() * intValue);

  return val;
}