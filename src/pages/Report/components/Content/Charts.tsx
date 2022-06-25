import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import { Chart as ChartJS, DatasetController, registerables } from "chart.js";
import { Chart } from 'react-chartjs-2';
import {ChartType} from 'chart.js';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { listChart, listDepartment } from 'interfaces/components';
import arrow from 'assets/images/arrow__icon.png'
import undo  from 'assets/images/undo__icon.png'
import undo2 from 'assets/images/undo__icon__2.png'
import { departmentAction } from 'pages/Report/slice/departmentSlice';
import { ListField } from 'pages/Report/slice/valueField';
import { filterAction } from 'pages/Report/slice/filterSlice';
import { tableDataAction } from 'pages/Report/slice/tableDataSlice';
ChartJS.register(...registerables);

export interface data {
  type:ChartType,
  label:string,
  backgroundColor:string[],
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
  const listValueAlphabet: string[]= [] 
  let fieldValues: string[]=[]  
  
  const dispatch = useAppDispatch()
  const typeCharts = useAppSelector(state => state.typeChart)
  const onChart = useAppSelector(state=> state.onChart) 
  const listValueField = useAppSelector(state=> state.listValue) 
  const listDepartment = useAppSelector(state=> state.department) 
  const listFilter = useAppSelector(state=> state.filter) 
  const listTable = useAppSelector(state => state.table)

  const [types, setType] = useState<ChartType>('bar');
  const [on, setOn] = useState(false);
  const [onTool, setOnTool] = useState(false);  
  const [onUndo, setOnUndo] = useState(undo);
  const [month1, setMonth1] =useState<string|boolean>("");
  const [year1, setYear1] =useState<string|boolean>("");
  const [month2, setMonth2] =useState<string|boolean>("");
  const [year2, setYear2] =useState<string|boolean>("");
  const [select, setSelect]=useState("");
  const [value, setValue] = useState<any[]>([])
  const [data, setData]= useState(dtChart)
  
  useEffect(()=>{dispatch(tableDataAction.getListTableData(value))},[value])
  useEffect(()=>setValue(listValueField.listValueField),[listValueField.listValueField]) 
  useEffect(()=> setOn(onChart.onChart),[onChart])
  useEffect(()=> setType(typeCharts.typeChart),[typeCharts])
  useEffect(() => {dispatch(departmentAction.getDepartment())}, []);
  useEffect(() => {
    if(listFilter.listFilter.length >0){
      setValue(listFilter.listFilter)
  }
  }, [listFilter.listFilter]);
  
 
  //undo
  const undos = ()=>{
    let arrayCoppy =  listValueField.listValueField.slice()
    setValue(arrayCoppy)     
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
   const insertChart =(data:listChart)=> { 
     let converNumber = data.de.map((item:string)=> Number(item))
     let random = Math.floor(Math.random()*16777215).toString(16);
     return ( { 
         type: types,
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
  
   useEffect(()=>
   { 
    setData({
      labels: listValueAlphabet.length !==0 ? listValueAlphabet : ["*","*","*","*","*"],
      datasets: datasets,
      xAxisID:'xAxis1',
    })
  }
  ,[value,types])
  
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
        text: `Chart ${types}`,
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
  //filter
  const filter = ()=> {
    let arrayCheck: string[]= []
    let y1: string|boolean= year1
    let m1: string|boolean= month1
    let y2: string|boolean= year2
    let m2: string|boolean= month2
    let checkbox: any = document.getElementsByName('checkbox')  ;
    for (let item of checkbox) {
      if( item.checked == true){
        arrayCheck.push(item.value)
      }
     }
     if(y1 && y2  && m2 == "-1" && m1){
       y2 = false
     } else 
     if(y1 ==false || m1 == false && y2 && m2 )
    {
       y1 =y2
       m1 = m2
       y2 = false
       m2 = false
    } else if(y1 && y2 ){
           if(y1 > y2){
              toast.error("Vui lòng chọn lại năm");
           }
    }
    let object ={
      params: arrayCheck.join(","),
      year:y1? y1 : "NULL",
      month: m1? m1: "NULL",
      year2:  y2? y2 : "NULL",
      month2: m2? m2: "NULL",
      departments: Number(select) == -1 ||Number(select) ? select: "NULL"
    } 
    dispatch(filterAction.getFilter(object))
  }

  return (
    <div  className='content__chart'>
      <ToastContainer  position="top-center"  style={{width: "20%", height:"20px"}}   ></ToastContainer>
      <div id='chart' className='chart'>
      { on?
          (<Chart options={options}  type='bar' data={data}  />)
          :(<h1> Choose your chart</h1>)
      }
      </div>
      { on?
      (   <div className="chart__tool">
            <div className={`open__tool ${onTool ? 'open--active' : ''}`}>
              <button aria-expanded={onTool ? "true" : "false"}  onClick={()=> setOnTool((prev) => !prev)} >Tool
                 <img src={arrow} alt="arrow" title ="use tool" />
              </button>
            </div>
            <div className={`tool__list ${onTool ? 'tool--active' : ''}`}>
                <ul>
                  <li className='tool__item border--item'>
                  <div className='filter__group'>
                      {/* <input type="month" onChange={(e)=> setMonth(e.target.value) } ></input> */}
                      {/* <input type="number" style={{width: "50%",height:"30px"}} placeholder="MMMM" min="1" max="12" onChange={(e)=> setMonth2(e.target.value) } /> */}
                      <select  onChange={(e)=> setMonth1(e.target.value) }  >
                         <option value="-1"> MMMM </option> 
                          <option value="1"> Tháng 1 </option>
                          <option value="2"> Tháng 2  </option>
                          <option value="3"> Tháng 3  </option>
                          <option value="4"> Tháng 4  </option>
                          <option value="5"> Tháng 5  </option>
                          <option value="6"> Tháng 6  </option>
                          <option value="7"> Tháng 7  </option>
                          <option value="8"> Tháng 8  </option>
                          <option value="9"> Tháng 9  </option>
                          <option value="10"> Tháng 10  </option>
                          <option value="11"> Tháng 11 </option>
                          <option value="12"> Tháng 12  </option>
                      </select>
                     <input type="number" style={{width: "50%", height:"100%"}} placeholder="YYYY" min="2017" max="2100" onChange={(e)=> setYear1(e.target.value) } /> 
                      <div className='filter__undo'>
                        <button onMouseEnter={()=>setOnUndo(undo2)} onClick={()=>undos()} onMouseLeave={()=>setOnUndo(undo)}>
                          <img src={onUndo} alt="undo" title="undo chart" />
                        </button>
                      </div>

                     </div>
                  </li>
                  <li className='tool__item border--item'>
                     {/* <input type="month" style={{width: "210px"}} onChange={(e)=> setMonth1(e.target.value) } ></input> */}
                     {/* <input type="number" style={{width: "50%",height:"30px"}} placeholder="MMMM" min="1" max="12" onChange={(e)=> setMonth2(e.target.value) } /> */}
                     <select style={{width: "50%"}}  onChange={(e)=> setMonth2(e.target.value) }  >
                         <option value="-1"> MMMM </option> 
                          <option value="1"> Tháng 1 </option>
                          <option value="2"> Tháng 2  </option>
                          <option value="3"> Tháng 3  </option>
                          <option value="4"> Tháng 4  </option>
                          <option value="5"> Tháng 5  </option>
                          <option value="6"> Tháng 6  </option>
                          <option value="7"> Tháng 7  </option>
                          <option value="8"> Tháng 8  </option>
                          <option value="9"> Tháng 9  </option>
                          <option value="10"> Tháng 10  </option>
                          <option value="11"> Tháng 11 </option>
                          <option value="12"> Tháng 12  </option>
                      </select>
                     <input type="number" style={{width: "50%", height:"100%"}} placeholder="YYYY" min="2017" max="2100" onChange={(e)=> setYear2(e.target.value) } />
                  </li>
                  <li className='tool__item border--item'>
                      <select  onChange={(e)=> setSelect(e.target.value) }  >
                         <option value="-1"> All </option> 
                         {
                          listDepartment.listDepartment.map((data: listDepartment)=>(
                            <option key={data.id} value={data.id}>{data.departments_name}</option>
                          ))
                         }
                      </select>
                  </li>
                  <li className='tool__item'>
                    <div  style={{display: "flex"}}>
                       <button id="filter" onClick={()=>filter()} >Filter</button>
                       <button id="print" onClick={printPDF}>Click PDF</button>
                       </div>
                  </li>            
                 </ul>
            </div>        
          </div>) :""
     }
    </div>
  );
}

export default Charts