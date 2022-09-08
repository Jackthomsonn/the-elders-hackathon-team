import { UsageWithTimescale } from '../shared/types'
import styles from '../styles/Home.module.css'
interface IProps {
 usages: UsageWithTimescale[]
}


export function Costs ({usages }: IProps) {
  return <div className={styles.costs}> 
      <h3>Costs</h3>
      {usages.map(usage =>
      <div style={{ marginBottom: '10px'}} key={usage.timescale}>{usage.timescale} Usage: {usage.usage}<br/> {usage.timescale} Budget: {usage.budget}</div>)
       }
  </div>
}