import React, { useState } from 'react'

import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from 'react-chartjs-2';
import {ChartType} from 'chart.js';
ChartJS.register(...registerables);
const Charts = () => {
  const [types, setType] = useState<ChartType>('bar');
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
      <Chart  type='bar' data={datas}  />
      <button onClick={()=> setType("line")}>Line</button>
      <button onClick={()=> setType("bar")}>Bar</button>
      <button onClick={()=> setType("pie")}>Pie</button>
      </div>
     
    </div>
  );
}

export default Charts