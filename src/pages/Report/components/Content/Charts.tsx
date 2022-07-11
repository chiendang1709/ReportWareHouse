import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { Chart as ChartJS, DatasetController, registerables } from "chart.js";
import {ChartType} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { chartColors } from 'constant/color';
import { listChart, listDepartment } from 'interfaces/components';

import { departmentAction } from 'pages/Report/slice/departmentSlice';
import { tableDataAction } from 'pages/Report/slice/tableDataSlice';
import Tools from './Tools';
ChartJS.register(...registerables ,ChartDataLabels);

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

 
  const valueChart: Array<listChart>= []  
  let datasets: data[]= []
  let listValueAlphabet: string[]= [] 
  let fieldValues: string[]=[]  
  let x: string[]=[]
 
  let ref = React.useRef<HTMLDivElement>(null)
  
  const dispatch = useAppDispatch()
  const typeCharts = useAppSelector(state => state.typeChart)
  const onChart = useAppSelector(state=> state.onChart) 
  const onTool = useAppSelector(state=> state.onTool)
  const listValueField = useAppSelector(state=> state.listValue) 
  const listFilter = useAppSelector(state=> state.filter) 
  const listTable = useAppSelector(state => state.table)

  const [types, setType] = useState<ChartType>('bar');
  const [on, setOn] = useState(false);
  const [Tool, setTool] = useState(false);  
 
  const [nameChart, setNameChart]= useState("")
  const [value, setValue] = useState<any[]>([])
  const [data, setData]= useState<any>(dtChart)
  
  useEffect(()=>{dispatch(tableDataAction.getListTableData(value))},[value])
  useEffect(()=> setOn(onChart.onChart),[onChart])
  useEffect(() => setTool(onTool.onTool),[onTool])
  useEffect(()=> setType(typeCharts.typeChart),[typeCharts])
  useEffect(() => {dispatch(departmentAction.getDepartment())}, []);
  useEffect(()=>  setNameChart(""),[listValueField])
  useEffect(()=>(setValue(listValueField.listValueField)),[listValueField.listValueField]) 
 
  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (onTool && ref.current && !ref.current.contains(event.target as HTMLDivElement)){
        setTool(false);
      }
    };
    document.addEventListener("mousedown", handler );
    return () => {
      document.removeEventListener("mousedown", handler );
    };
  }, [onTool]);
  

  //getFilter
   const getdata= (arrayCoppy:string[], nameDep: string)=>{  
      setValue(arrayCoppy)
      setNameChart(nameDep)  
   }
 
  // x null
  for(let i =0; i<value.length;i ++){
    x.push("*")
  }
  //getNumber
    if(value.length > 0){
      fieldValues = Object.keys(value[0])
    }

   for(let i =0 ;i<fieldValues.length; i++ ){
    const listValueNumber: string[]= []
    if(fieldValues[i] !=="month_name" &&fieldValues[i] !=="year"){
      for(let y = 0; y <value.length;y++)
      {  
         const list= value[y][`${fieldValues[i]}`];
         listValueNumber.push(list)
      }
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
    
   
    //getAlphabet
    if(fieldValues.includes('month_name') && fieldValues.includes('year') )
    {
        for(let y = 0; y <value.length;y++)
        {  
           const year= value[y]['year'];
           const month_name= value[y]['month_name'];
           let list =`${month_name}/ ${year}`
           listValueAlphabet.push(list) 
        }
    }else if(fieldValues.includes('month_name') && fieldValues.includes('year')== false) 
    {
        for(let y = 0; y <value.length;y++)
        {  
           const list= value[y]['month_name'];
           listValueAlphabet.push(list) 
        }
   } else if(fieldValues.includes('month_name')== false && fieldValues.includes('year')) 
   {
        for(let y = 0; y <value.length;y++)
        {  
           const list= value[y]['year'];
           listValueAlphabet.push(list) 
        }
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
      //   display: function(context:any) {
      //     return context.dataset.data[context.dataIndex] >= 1;
      // },
        formatter: (value:any, ctx:any) => { 
          let percentage:string =""
          let dataArr = ctx.chart.data.datasets;
          for(let i =0; i<dataArr.length;i++){
            let sum = 0;
            ctx.chart.data.datasets[i].data.map((item: number)=>{
              sum += item; 
            })
            ctx.chart.data.datasets[i].data.map((item: number)=>{
                if(value ===item){
                  percentage = (value * 100 / sum).toFixed(1) + "%";
                  return percentage
                }
               
            })
          }
          return percentage;
         
      },
        color: '#fff',
        font:(context: any) => {
          console.log("context",context);
          
          var width = context.chart.width;
          var size = Math.round(width / 65);
          console.log("size",size);
          
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
        title: {
          display: true,
          text: 'Time'
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
 

  //filter
  

  return (
    <div  className='content__item content__chart'>
      <ToastContainer  position="top-center"  style={{width: "30%", height:"20px"}} ></ToastContainer>
      { on?
       (<div id='chart' className=' item card chart'>
         <Chart options={types !=="pie" ? options: optionPie}  type='bar' data={data} />
   
      </div>)
         :''
        }
    <Tools Tool={Tool} ref={ref} callBackData={getdata}></Tools>
    </div>
  );
}

export default Charts