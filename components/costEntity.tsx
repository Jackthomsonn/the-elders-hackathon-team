

export function CostEntinty({timescale, usage, budget}: any){
    return <div>
      <div key={usage.timescale}>{usage.timescale} Usage: {usage.usage} Budget: {usage.budget}</div>)
    </div>
}