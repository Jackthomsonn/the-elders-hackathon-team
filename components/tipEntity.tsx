import { useEffect, useState } from "react";
import {config} from '../config';

const url = config.url;

export function TipEntity({tipKey,content, upvotes}:any){
    console.log(upvotes,tipKey);
    const key = tipKey.split('_');
    key.pop();

    const upvotesData = upvotes[key.join('_') + '_upvote'] ;
    // console.log(upvotesData, 'data');

    function onUpvote(){
      fetch(url + '/api/upvote', {
        method: 'POST',
        body: JSON.stringify({
          tipName: key.join('_')
        })
      }).then(()=> {
        // window?.refresh();
      })
    }
    // useEffect(()=>{
    //     if(!tipKey) return;
    //     fetch(url + '/api/tipupvote?tipName=' + tipKey).then((res)=>{
    //         return res.json();
    // }).then((value)=>{
    //     setUpvotes(value)
    // })
    // },[tipKey]);
    
    return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
      <div style={{marginRight: 24}} key={tipKey}>{content}</div>
      <div onClick={onUpvote} style={{display: 'flex', background: '#008e9b', padding: 24, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', color: '#FFF'}}>
        {upvotesData ?? 0} Upvote <i className="fa-solid fa-arrow-up"  style={{marginLeft: 12}}></i>
      </div>
      </div>
    </>
    )
}