import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Speedmeter} from '../components/speedmeter';
import {Costs} from '../components/costs'
import {Tips} from '../components/tips'
import { Tree } from '../components/tree';
import {config} from '../config';
import { Tip, Usage, UsageTimescales } from '../shared/types'
import { InferGetStaticPropsType } from 'next'
import { useNotLogged } from '../hooks/useNotLogged';
import { useAuth } from '../context/auth';

const Home: NextPage<any> = ({ dailyUsage, weeklyUsage , monthlyUsage, yearlyUsage, usage, tips, tipUpvotes }) => {
  const {budget, usage:use} = usage as any;
  const {user} = useAuth()
  console.log('Daily Usage',...dailyUsage);
  console.log('Weekly Usage',...weeklyUsage);
  console.log('Monthly Usage',...monthlyUsage);
  console.log('Yearly Usage',...yearlyUsage);
  console.log('upvotes',...tipUpvotes);

  // console.log(usage);
  // console.log(tips)
  return (
    <div className={styles.container}>
      <Head>
        <title>The elders</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer" 
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.mainHeader}>The Elders Got Your Back {user} <i className="fa-solid fa-lightbulb"></i></h1>  
        <div className={styles.costsAndSpeedometerContainer}>
          <Costs usages={[{timescale: 'Daily', ...dailyUsage}, {timescale: 'Weekly', ...weeklyUsage}, {timescale: 'Monthly',...monthlyUsage}, {timescale: 'Yearly', ...yearlyUsage}]} />  
          <Speedmeter maxValue={+budget * 2} value={use}/>
        </div>  
        <div className={styles.tipsContainer}>
          <Tips tips={tips} tipUpvotes={tipUpvotes} />
          <Tree />
        </div>      
        <div>
          
        </div>
      </main>
    </div>
  )
}
const url = config.url;

const fe = async () => {
  const usageRes = await fetch('api/usage');
  const dailyUsageRes = await fetch( `api/usage?timescale=${UsageTimescales.DAILY}`)
  const weeklyUsageRes = await fetch( `api/usage?timescale=${UsageTimescales.WEEKLY}`)
  const monthlyUsageRes = await fetch( `api/usage?timescale=${UsageTimescales.MONTHLY}`)
  const yearlyUsageRes = await fetch( `api/usage?timescale=${UsageTimescales.YEARLY}`)
  const tipsRes = await fetch( 'api/tips');
  const tipupVotesRes = await fetch( 'api/tipupvote');
  const usage: Usage = await usageRes.json()
  const dailyUsage: Usage = await dailyUsageRes.json()
  const weeklyUsage: Usage = await weeklyUsageRes.json()
  const monthlyUsage: Usage = await monthlyUsageRes.json()
  const yearlyUsage: Usage = await yearlyUsageRes.json()
  const tips: Tip[] = await tipsRes.json()
  const tipUpvotes = await tipupVotesRes.json();

  return Promise.resolve({
      dailyUsage,
      weeklyUsage,
      monthlyUsage,
      yearlyUsage,
      usage,
      tips,
      tipUpvotes: tipUpvotes.tipUpvotes
  });
}
export async function getStaticProps(){
  try {
    const {dailyUsage, weeklyUsage, monthlyUsage, yearlyUsage, usage, tips, tipUpvotes} = await fe();
    return {
      props:{
        dailyUsage,
        weeklyUsage,
        monthlyUsage,
        yearlyUsage,
        usage,
        tips,
        tipUpvotes: tipUpvotes.tipUpvotes
      }
    }
  }catch {
    console.log("error");
    return  {
      props: {
        dailyUsage: 0,
        weeklyUsage: 0,
        monthlyUsage: 0,
        yearlyUsage: 0,
        usage: 0,
        tips: 0,
        tipUpvotes: {}
      } 
    }
  }

}

export default Home
