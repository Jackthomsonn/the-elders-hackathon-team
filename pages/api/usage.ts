import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

let client = new Redis(
  "redis://:f7dc8051437441f1873dfa7439f76d8e@eu1-devoted-sunbeam-38011.upstash.io:38011"
);
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
    const {timescale} = req.query 
    const energyData = await getEnergy(timescale)
    res.status(200).json(energyData)
  }
  catch (error)
  {
    res.status(400).send({error, message: "Something went wrong"})
  }
}

const getEnergy = async (timescale: String) => {
  switch (timescale) {
    case "daily":
      let usageData = await client.get("usage");
      let budgetData = await client.get("budget");
    case "weekly":
      usageData = await client.get("weekly_usage");
      budgetData = await client.get("weekly_budget");
    case "monthly":
      usageData = await client.get("monthly_usage");
      budgetData = await client.get("monthly_usage");
    case "yearly": 
      usageData = await client.get("yearly_usage");
      budgetData = await client.get("yearly_budget");
    default:
      
  }
    const energyData = {
      usage: wobble(usageData),
      budget: budgetData,
    };

    return energyData
}

const wobble = (value: number) => {
  return Math.round(value + Math.random() * 5.2);
}