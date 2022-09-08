import { Tip } from '../shared/types'
import styles from '../styles/Home.module.css'
import {TipEntity} from './tipEntity';

interface IProps {
  tips: Tip[]
  tipUpvotes:any;
}

export function Tips ({ tips,tipUpvotes }: IProps) {
  return <div>
    <h3 className={styles.tipsTitle}>Here are some helpful tips to save energy!</h3>
    <ul>
      {tips.map(tip => {
        return ( <TipEntity tipKey={tip.key} content={tip.content} upvotes={tipUpvotes}/>
        )
      })}
      </ul>
      
  </div>
}