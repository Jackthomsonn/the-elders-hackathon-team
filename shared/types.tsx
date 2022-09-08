export type Tip = {
  key: string,
  content: string
}

export type Usage = {
  usage: number,
  budget: string | number
}

export type UsageWithTimescale = {
  timescale: string,
  usage: number,
  budget: string | number
}

export enum UsageTimescales {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}