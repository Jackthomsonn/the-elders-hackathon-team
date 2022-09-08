import { useMemo } from "react";
import ReactSpeedometer from "react-d3-speedometer"
import {percentageOfValue} from '../utils/math';
import styles from '../styles/Home.module.css'
import { useWobble } from "../hooks/useWobble";

interface IProps{
    maxValue?:number;
    value:number;
}

export function Speedmeter({maxValue = 500,value = 0}:IProps){
    const apiValue = useWobble(value, 2500);
    const segementStops = useMemo(()=>{
        const segements = [0];
        const firstStop = percentageOfValue(maxValue, 42.5);
        segements.push(firstStop);
        const secondStop = percentageOfValue(maxValue, 7.5) + firstStop;
        segements.push(secondStop);
        const thridStop = percentageOfValue(maxValue, 50) + secondStop;
        segements.push(thridStop);
        segements.push(maxValue);
        return segements;

    },[maxValue]);

    return <div className={styles.speed}>
    <ReactSpeedometer 
        maxValue={apiValue > maxValue ? apiValue + 100 : maxValue} 
        value={apiValue}
        needleColor="black"
        segments={3}
        height={230}
        width={400}
        segmentColors={[
            '#238823',
            '#ffbf00',
            '#d2222d'
        ]}
        customSegmentStops={
            segementStops
        }
            />

    </div>
}