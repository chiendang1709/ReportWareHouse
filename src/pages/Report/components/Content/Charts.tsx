import React, { Fragment, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { Chart as ChartJS, DatasetController, registerables } from "chart.js";
import {ChartType} from 'chart.js';
import  {Chart}  from 'react-chartjs-2';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import zoom from "chartjs-plugin-zoom";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { chartColors } from 'constant/color';
import { listChart, listDepartment } from 'interfaces/components';
import ChartsType from '../Content/ChartsType'
import ex from 'assets/images/export__icon.png'
import { tableDataAction } from 'pages/Report/slice/tableDataSlice';
ChartJS.register(...registerables ,ChartDataLabels,zoom);

export interface data {
  type:ChartType,
  label:string,
  backgroundColor:string,
  borderColor:string,
  data:number[] ,
  
};
export interface dataChart {
  labels: string[],
  datasets: data[],
  xAxisID:string,
  
};
let dtChart : dataChart = {
  labels:[],
  datasets: [],
  xAxisID:"",
}


const Charts = () => {

  const listfieldnumber =["opt_budget","opt_expect_revenue","opt_profit","opt_gross_profit","opt_commit_revenue","scon_ex_ct_value"]
  const valueChart: Array<listChart>= []  
  let datasets: data[]= []
  let listValueAlphabet: string[]= [] 
  let fieldValues: string[]=[]  
  let x: string[]=[]
 
  let ref = React.useRef<HTMLDivElement>(null)
  
  const dispatch = useAppDispatch()
  const typeCharts = useAppSelector(state => state.typeChart)
  const onChart = useAppSelector(state=> state.onChart) 
  const listValueField = useAppSelector(state=> state.listValue) 
  const listFilter = useAppSelector(state=> state.filter) 
  const listTable = useAppSelector(state => state.table)
  const categoryGroup = useAppSelector(state => state.categoryGroup)
  
 
 
  const [types, setType] = useState<ChartType>('bar');
  const [on, setOn] = useState(false);

 
  const [nameChart, setNameChart]= useState("")
  const [value, setValue] = useState<any[]>([])
  const [data, setData]= useState<any>(dtChart)
  
  useEffect(()=> setType(typeCharts.typeChart),[typeCharts])
  useEffect(()=>{dispatch(tableDataAction.getListTableData(value))},[value])
  useEffect(()=> setOn(onChart.onChart),[onChart])
  useEffect(()=> setNameChart(""),[listValueField])
  useEffect(()=>(setValue(listValueField.listValueField)),[listValueField.listValueField]) 
  useEffect(()=>(setValue(listFilter.listFilter)),[listFilter.listFilter]) 

  
  //getNumber

    if(value.length > 0){
      fieldValues = Object.keys(value[0])
    }else if(value.length === 0) {
      fieldValues=[]
      x=[]
    }
// x null
  useEffect(()=>{
      if(value.length ==0){
        setData({
          labels: [],
          datasets: [],
          xAxisID:'xAxis1',
        })
      }
    },[value])
for(let i =0; i<value.length;i ++){
   
  x.push("*")
}
    
    
   for(let i =0 ;i<fieldValues.length; i++ ){
    const listValueNumber: string[]= []
    if(listfieldnumber.indexOf(fieldValues[i]) !==-1){
      for(let y = 0; y <value.length;y++)
      {  
         const list= value[y][`${fieldValues[i]}`];       
         listValueNumber.push(list)
      }
      for(let z = 0;z<listTable.listTable.length; z++){
      if(listTable.listTable[z].key_code ==`${fieldValues[i]}`){
        valueChart.push({
          name:`${listTable.listTable[z].value_code}`,
          de: listValueNumber
        }) 
      }
    } 
   }
  }
    
   
    //getAlphabet
    const getAlphabet =(name:string, group :string)=>{
      if(group === ""){
        for(let y = 0; y <value.length;y++)
        {  
         let list =`${value[y][name]}`
         listValueAlphabet.push(list) 
        }
      }else if(group === "DAY" || group ==="MONTH" ||group ==="YEAR") {
        if(group ==="DAY"){
          for(let y = 0; y <value.length;y++)
          {  
           let list =`${value[y][name]}`
           listValueAlphabet.push(list) 
          }
        }else {
          for(let y = 0; y <value.length;y++)
          {  
           let list =`${value[y][group]}`
           listValueAlphabet.push(list) 
          }
        }
        
      }else if(group !== "DAY") {
       
        for(let y = 0; y <value.length;y++)
        {  
         let list =`${value[y][name]} - ${value[y][group.replace("code","name")]}`
         listValueAlphabet.push(list) 
        }
      }
      
    }

    if(fieldValues.includes('opt_bid_open_date'))
    {
      getAlphabet("opt_bid_open_date",categoryGroup.group)
    }else if(fieldValues.includes('opt_bid_open_date')== false && fieldValues.includes('opt_bid_close_date') ) {
      getAlphabet("opt_bid_close_date",categoryGroup.group)
    }else if(fieldValues.includes('opt_bid_open_date')== false && fieldValues.includes('opt_bid_close_date')==false ) 
    {  
      if(categoryGroup.group =="DAY"){
        getAlphabet("DATE",categoryGroup.group)
      }
      if(categoryGroup.group !=="DAY")
      getAlphabet("DATE",categoryGroup.group)
    }
    
  
    //get value in chart
    let y : number = 0
    const insertChart = (data:listChart)=> { 
     
      let converNumber = data.de.map((item:string)=> Number(item))
       let random =  chartColors[y++];
      return ( { 
          type: types,
          label:data.name,
          backgroundColor:random,
          borderColor:types ==="pie"? "#F7EDE6":random  ,
          data:converNumber ,
          
    })
  }
 useEffect(()=>{
  valueChart.map((data)=> { 
    if(data.de.length >0){
      datasets.push( insertChart(data))      
    } 
 })
 },[valueChart])

   useEffect(()=>
   { 
    if(value.length ==0){
      setOn(false)
    }
    else  { 
      if(onChart.onChart){
        setOn(true)
      }
      
        setData({
          labels: listValueAlphabet.length !==0 ? listValueAlphabet : x,
          datasets: datasets,
          xAxisID:'xAxis1',
        })
    
        
        
      }
      
    
   
  
}
  ,[value,types])


  const optionPie = {
    responsive: true,
    clamp: true,
    
    plugins: {
      datalabels: {
        formatter: (value:any, ctx:any) => { 
          let percentage:string =""
          let dataArr = ctx.chart.data.datasets;
    
          console.log("t", dataArr);
          for(let i =0; i<dataArr.length;i++){
            let sum = 0;
            let total =  dataArr[i].data.reduce((pre: number, val: number)=>pre + val,sum
            ) 
            console.log("data", ctx.chart.data.datasets[i].data);
            dataArr[i].data.map((item: number)=>{
                if(value === item){
                  percentage = (item * 100 / total).toFixed(1);
                  if(Number(percentage) >5){
                    percentage=percentage +"%"
                    return percentage;
                  }else {
                    percentage="" 
                    return percentage;
                  }
                  
                  
                 
                }
            })
            
           
          }
         
           return percentage;
           
              
            
      },
        color: '#fff',
        font:(context: any) => {          
          var width = context.chart.width;
          var size = Math.round(width / 65);
          
            return {
              size: size,
             
            };
        },
       
        
       
    },
   
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 14,
            weight:"boldness",
            family: "'Montserrat', 'sans-serif'" 
          },
      }
      },
      title: {
        display: true,
        text: `Chart ${types} ${nameChart}`,
        position: 'top' as const,
      },
      
    },
    scales: {
      x: {
        display:false
      },
      y: {
        display:false
      }},
     
   
  };
  
  const options = {
    responsive: true  ,
    plugins: {
      datalabels: {
         display: false
    },
    
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 14,
            weight:"boldness",
            family: "'Montserrat', 'sans-serif'" 
          },
      }
      },
      title: {
        display: true,
        text: `Chart ${types} ${nameChart}`,
        position: 'top' as const,
      },
     
    },
    scales: {
     
      x: {
       
        ticks: {
         
          callback: function(value:any, index:any, values:any) {
            let newthis = this as any;
            let val=  newthis.getLabelForValue(value)
            if (val.length > 10) {
                return val.substr(0, 10) + '...';
            } else {
                return val
              }
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Money'
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
 

  //filter
  

  return (
    <Fragment>
      <ToastContainer  position="top-center"  style={{width: "30%", height:"20px"}} ></ToastContainer>
      <div className='content__item  content__chart'>
        <div className=' item card chart'>
          <div className='header__item'>
              <div className='title__item'>
                    Chart
              </div>
              <div className='button__item'>
              <button id="print" onClick={printPDF}>
                             <img src={ex} alt="export" title="export pdf" />
                    </button>
                    <ChartsType/>
                   
              </div>
          </div>
          <div className="chart__item">
              <div id='chart'>
                  <Chart options={types !=="pie" ? options: optionPie}  type='bar' data={data} /> 
              </div>
          </div>
          </div>
      </div>
    </Fragment>
  );
}

export default Charts