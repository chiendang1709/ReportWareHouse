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
import fil from 'assets/images/filter__icon.png'
import ex from 'assets/images/export__icon.png'

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
  let x: string[]=[]
 
  let ref = React.useRef<HTMLDivElement>(null)
  
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
  const [month1, setMonth1] =useState<string|boolean>("");
  const [year1, setYear1] =useState<string|boolean>("");
  const [month2, setMonth2] =useState<string|boolean>("");
  const [year2, setYear2] =useState<string|boolean>("");
  const [dep, setDep]=useState("");
  const [nameDep, setNameDep]=useState("");
  const [nameChart, setNameChart]= useState("")
  const [value, setValue] = useState<any[]>([])
  const [data, setData]= useState(dtChart)
  
  useEffect(()=>{dispatch(tableDataAction.getListTableData(value))},[value])
  useEffect(()=>setValue(listValueField.listValueField),[listValueField.listValueField]) 
  useEffect(()=> setOn(onChart.onChart),[onChart])
  useEffect(()=> setType(typeCharts.typeChart),[typeCharts])
  useEffect(() => {dispatch(departmentAction.getDepartment())}, []);
  useEffect(()=>  setNameChart(""),[listValueField])
  useEffect(() => {
    if(listFilter.listFilter.length >0){
      setValue(listFilter.listFilter)
  }
  }, [listFilter.listFilter]);
  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (onTool && ref.current && !ref.current.contains(event.target as HTMLDivElement)){
        setOnTool(false);
      }
    };
    document.addEventListener("mousedown", handler );
    return () => {
      document.removeEventListener("mousedown", handler );
    };
  }, [onTool]);
  

  //undo
  const undos = ()=>{
    let arrayCoppy =  listValueField.listValueField.slice()
    setValue(arrayCoppy)
    setNameChart("")     
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
   const insertChart = (data:listChart)=> { 
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
 useEffect(()=>{
  valueChart.map((data)=> { 
    if(data.de.length >0){
      datasets.push( insertChart(data))      
    } 
 })
 },[valueChart])

  for(let i =0; i<value.length;i ++){
         x.push("*")
  }
  
   useEffect(()=>
   { 
   
    setData({
      labels: listValueAlphabet.length !==0 ? listValueAlphabet : x,
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
      month: m1 ? m1: "NULL",
      year2:  y2? y2 : "NULL",
      month2: m2  ? m2 : "NULL",
      departments:  Number(dep) ? dep: "NULL"
    } 
    dispatch(filterAction.getFilter(object))
    setNameChart(nameDep)
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
            <div className={`tool__list ${onTool ? 'tool--active' : ''}`} ref={ref}>
                <ul>
                  <li className='tool__item border--item'>
                  <div className='filter__group'>
                     <p> To</p>
                      {/* <input type="month" onChange={(e)=> setMonth(e.target.value) } ></input> */}
                      {/* <input type="number" style={{width: "50%",height:"30px"}} placeholder="MMMM" min="1" max="12" onChange={(e)=> setMonth2(e.target.value) } /> */}
                      <select  onChange={(e)=> setMonth1(e.target.value) }  >
                         <option value="NULL"> Choose Month </option> 
                          <option value="1"> January </option>
                          <option value="2"> February </option>
                          <option value="3"> May </option>
                          <option value="4"> April </option>
                          <option value="5"> May </option>
                          <option value="6"> June </option>
                          <option value="7"> July </option>
                          <option value="8"> August </option>
                          <option value="9"> September </option>
                          <option value="10"> October </option>
                          <option value="11"> November </option>
                          <option value="12"> December </option>
                      </select>
                     <input type="number" style={{width: "50%", height:"100%"}} placeholder="YYYY" min="2017" max="2100" onChange={(e)=> setYear1(e.target.value) } /> 
                    

                     </div>
                  </li>
                  <li className='tool__item border--item'>
                  <div className='filter__group'>
                      <p> From </p>
                     {/* <input type="month" style={{width: "210px"}} onChange={(e)=> setMonth1(e.target.value) } ></input> */}
                     {/* <input type="number" style={{width: "50%",height:"30px"}} placeholder="MMMM" min="1" max="12" onChange={(e)=> setMonth2(e.target.value) } /> */}
                     <select   onChange={(e)=> setMonth2(e.target.value) }  >
                         <option value="NULL"> Choose Month </option> 
                          <option value="1"> January </option>
                          <option value="2"> February  </option>
                          <option value="3"> May  </option>
                          <option value="4"> April  </option>
                          <option value="5"> May  </option>
                          <option value="6"> June  </option>
                          <option value="7"> July  </option>
                          <option value="8"> August  </option>
                          <option value="9"> September  </option>
                          <option value="10"> October  </option>
                          <option value="11"> November </option>
                          <option value="12"> December  </option>
                      </select>
                     <input type="number" style={{width: "50%", height:"100%"}} placeholder="YYYY" min="2017" max="2100" onChange={(e)=> setYear2(e.target.value) } />
                     </div>
                  </li>
                  <li className='tool__item border--item'>
                      <select  onChange={(e)=> {setDep(e.target.value);setNameDep(e.target.selectedOptions[0].text) ; console.log(e);
                      } }  >
                         <option value="NULL"> Choose Despartment </option>  
                         {
                          listDepartment.listDepartment.map((data: listDepartment)=>(
                            <option key={data.id} value={data.id}>{data.departments_name}</option>
                          ))
                         }
                      </select>
                  </li>
                  <li className='tool__item'>
                    <div className='filter__group'>
                        <div className='filter__button'>
                            <button id="filter" onClick={()=>filter()} >
                              <img src={fil} alt="filter" title="filter chart" />
                            </button>
                        </div>
                        <div className='filter__button filter__border'>
                            <button  onClick={()=>undos()} >
                              <img src={undo} alt="undo" title="undo chart" />
                            </button>
                        </div>
                        <div className='filter__button'>
                            <button id="print" onClick={printPDF}>
                             <img src={ex} alt="export" title="export pdf" />
                            </button>
                        </div>
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