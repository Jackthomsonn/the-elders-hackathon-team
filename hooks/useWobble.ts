import {useState,useEffect} from 'react';
import {config} from '../config';

const url = config.url;

export function useWobble(initalValue:any, delay:number){
    const [value, setValue] = useState(initalValue);

    useEffect(()=>{
        const id = setInterval(callAPI, delay)
        return () => clearInterval(id);
    },[delay]);


    async function callAPI(){
        const res = await fetch(url + '/api/usage');
        const json = await res.json();
        setValue(json.usage);
    }
    return value;
}