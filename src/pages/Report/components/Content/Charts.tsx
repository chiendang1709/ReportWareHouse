import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import { Chart as ChartJS, DatasetController, registerables } from "chart.js";
import { Chart } from 'react-chartjs-2';
import {ChartType} from 'chart.js';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

ChartJS.register(...registerables);

const es = [
    { name : 'id',
      de :'1,2,3,4,5'
    },
    { name :'moneydt',
      de: '10,20,30,40,50'},
    { name :'datedt',
      de:'23/1/2010,23/2/2010,23/3/2010,23/4/2010,23/5/2010'},
    { name :'namedt',
      de:'bt1,bt2,bt3,bt4,bt5'},
      { name :'thue',
      de:'23,45,78,34,45'},
      { name :'loi nhuan',
      de:'23,45,78,34,45'}
]
const Charts = () => {
  //typeChart
  const [types, setType] = useState<ChartType>('bar');
  const [on, setOn] = useState(false);
  const typeCharts = useAppSelector(state => state.typeChart)
  const onChart = useAppSelector(state=> state.onChart) 
  useEffect(()=> setOn(onChart.onChart),[onChart])
  useEffect(()=> setType(typeCharts.typeChart),[typeCharts])

  //pass data to the chart
  
   var regex = new RegExp('^[0-9]*$')
   const isNumber = (array: string[])=> {
    let ketQua = array.every(function (item: string ){
      return regex.test(item); 
    })
    return ketQua
   }
   let     datasets: any[]= []
   const dataNumber = es.filter((data:any) => {
          let item = Object.values(data)[1]
          let i =`${item}`.split(',')
          return   isNumber(i)  
   })
   console.log("dataset", dataNumber)
   const insertChart =(data:any)=> { 
    let i =`${data.de}`.split(',')
    let converNumber = i.map((item:string)=> Number(item))
    let random =   Math.floor(Math.random()*16777215).toString(16);
    return ( { 
        type:types,
        label: data.name,
        backgroundColor: [ `#${random}`],
        borderColor:"#FDF3F4",
        data:converNumber ,
  })
}
    dataNumber.map((data)=> {  
      datasets.push( insertChart(data))      
   })
   
  const datas = {
    labels: [1,2,5,7,7],
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
      pdf.addImage(imgData, "JPEG",10,10,160,100);
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