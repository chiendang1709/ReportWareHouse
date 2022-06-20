import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import { Chart as ChartJS, DatasetController, registerables } from "chart.js";
import { Chart } from 'react-chartjs-2';
import {ChartType} from 'chart.js';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { listChart } from 'interfaces/components';

ChartJS.register(...registerables);

export interface data {
  type:ChartType,
  label:string,
  backgroundColor:string[],
  borderColor:string,
  data:number[] ,
  
};

const Charts = () => {

  var regex = new RegExp('^[0-9]*$')
  let lists: string[]= [];
  const valueChart: Array<listChart>= []  
  let datasets: data[]= []
  const listValueAlphabet: string[]= [] 
  let fieldValues: string[]=[]  
  const [types, setType] = useState<ChartType>('bar');
  const [on, setOn] = useState(false);
  const typeCharts = useAppSelector(state => state.typeChart)
  const onChart = useAppSelector(state=> state.onChart) 
  const listValueField = useAppSelector(state=> state.listValue) 
  useEffect(()=> setOn(onChart.onChart),[onChart])
  useEffect(()=> setType(typeCharts.typeChart),[typeCharts])

  //value y
  if(listValueField.listValueField.length > 0){
    fieldValues = Object.keys(listValueField.listValueField[0])
   }
      for(let i =0 ;i<fieldValues.length; i++ ){
        const listValueNumber: string[]= []
        for(let y = 0; y <listValueField.listValueField.length;y++)
        {  
           const list= listValueField.listValueField[y][`${fieldValues[i]}`];
           if(regex.test(list)== false){   
            listValueAlphabet.push(list) 
           } else {
            listValueNumber.push(list)
           }
         
        }
        valueChart.push({
          name:`${fieldValues[i]}`,
          de: listValueNumber
        })
       
      }
      
    
    const insertChart =(data:listChart)=> { 
      let converNumber = data.de.map((item:string)=> Number(item))
      //  console.log("converNumber",converNumber);
      let random = Math.floor(Math.random()*16777215).toString(16);
      return ( { 
          type:types,
          label:data.name,
          backgroundColor: [ `#${random}`],
          borderColor:"#FDF3F4",
          data:converNumber ,
    })
 }
 valueChart.map((data)=> { 
      if(data.de.length >0){
        datasets.push( insertChart(data))      
      } 
   })
   //end value
   //value name x
  
   
  const datas = {
    labels: listValueAlphabet.length !==0? listValueAlphabet:["*","*","*","*","*"],
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