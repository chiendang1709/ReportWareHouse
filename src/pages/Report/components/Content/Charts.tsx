import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import { Chart as ChartJS, DatasetController, registerables } from "chart.js";
import { Chart } from 'react-chartjs-2';
import {ChartType} from 'chart.js';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { listChart } from 'interfaces/components';

ChartJS.register(...registerables);

const Charts = () => {
  //typeChart
  let lists: string[]= [];
  const tong: Array<listChart>= []  
  let datasets: any[]= []
  let itemVa: string[]=[]  
  const [types, setType] = useState<ChartType>('bar');
  const [on, setOn] = useState(false);
  const typeCharts = useAppSelector(state => state.typeChart)
  const onChart = useAppSelector(state=> state.onChart) 
  const listValueField = useAppSelector(state=> state.listValue) 
  useEffect(()=> setOn(onChart.onChart),[onChart])
  useEffect(()=> setType(typeCharts.typeChart),[typeCharts])

  //  console.log("dta",listValueField.listValueField);
  if(listValueField.listValueField.length > 0){
      itemVa = Object.keys(listValueField.listValueField[0])
     console.log("keys", itemVa);
   
   }
      for(let i =0 ;i<itemVa.length; i++ ){
        const listValue: string[]= []
        for(let y = 0; y <listValueField.listValueField.length;y++)
        {  
           const list= listValueField.listValueField[y];
           const a = list[`${itemVa[i]}`]
           listValue.push(a)
        }
        tong.push({
          name:`${itemVa[i]}`,
          de: listValue
        })
      }
    
    const insertChart =(data:any)=> { 
   
    let converNumber = data.de.map((item:string)=> Number(item))
    console.log("converNumber",converNumber);
    let random = Math.floor(Math.random()*16777215).toString(16);
    return ( { 
        type:types,
        label:data.name,
        backgroundColor: [ `#${random}`],
        borderColor:"#FDF3F4",
        data:converNumber ,
  })
 }
     tong.map((data)=> {   
      datasets.push( insertChart(data))      
   })
 
  
  const datas = {
    labels:["*","*","*","*","*"],
    datasets: datasets,
    xAxisID:'xAxis1',
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 14,
            family: "'Montserrat', 'sans-serif'" 
          },
      }
      },
      title: {
        display: true,
        text: 'Chart reports',
        position: 'top' as const,
      },
     
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        title: {
          display: true,
          text: '%'
        },
      }},
    
  };

  //PDF
  const printPDF = () => {
    const domElement: any = document.getElementById("chart");
    html2canvas(domElement,{
      scale: 5,
     
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG",10,10,180,100);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };
  return (
    <div  className='content__chart'>
      <div id='chart' className='chart'>
      { on?
          (<Chart options={options}  type='bar' data={datas}  />)
          :(<h1> Choose your chart</h1>)
      }
      </div>
      { on?
      (<button id="print" onClick={printPDF}>Click PDF</button>) :""
     }
    </div>
  );
}

export default Charts