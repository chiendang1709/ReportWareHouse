import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from 'react-chartjs-2';
import {ChartType} from 'chart.js';

ChartJS.register(...registerables);
const Charts = () => {
  const [types, setType] = useState<ChartType>('bar');
  const [on, setOn] = useState(false);
  const typeCharts = useAppSelector(state => state.typeChart)
  const onChart = useAppSelector(state=> state.onChart) 
  useEffect(()=> setOn(onChart.onChart),[onChart])
  useEffect(()=> setType(typeCharts.typeChart),[typeCharts])

  const datas = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      { 
       type:types,
        label: "My First dataset",
        backgroundColor: [
          "rgb(255, 99, 32)",
          "rgb(255, 39, 32)",
          "rgb(255, 59, 32)",
          "rgb(255, 79, 32)",
          "rgb(255, 99, 132)",
          "rgb(255, 99, 211)",

         
        ],
        borderColor: "rgb(255, 99, 132)",
      
        data: [10, 5, 2, 20, 30, 85],
      },
     
    ],
  };
 
  return (
    <div  className='content__chart'>
      <div className='chart'>
        { on?

         (<Chart  type='bar' data={datas}  />)
         :(<h1> Choose your chart</h1>)
        }
      </div>
     
    </div>
  );
}

export default Charts