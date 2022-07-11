import React, { useEffect, useState } from 'react'

import { listDepartment } from 'interfaces/components';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { filterAction } from 'pages/Report/slice/filterSlice';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ToastContainer, toast } from 'react-toastify';
import undo  from 'assets/images/undo__icon.png'
import fil from 'assets/images/filter__icon.png'
import ex from 'assets/images/export__icon.png'
import loading from 'assets/images/loading.svg'

type getdata = (arrayCoppy:string[], nameDep: string) => void;
const Tools = (props:{Tool: boolean, ref:React.RefObject<HTMLDivElement>,callBackData:getdata}) => {
  const dispatch = useAppDispatch()
  const listDepartment = useAppSelector(state=> state.department) 
  const listValueField = useAppSelector(state=> state.listValue)
  const listFilter = useAppSelector(state=> state.filter) 

  const [month1, setMonth1] =useState<string|boolean>("NULL");
  const [year1, setYear1] =useState<string|boolean>("");
  const [month2, setMonth2] =useState<string|boolean>("NULL");
  const [year2, setYear2] =useState<string|boolean>("");
  const [dep, setDep]=useState("NULL");
  const [nameDep, setNameDep]=useState("");

  //filter
  useEffect(() => {
    if(listFilter.listFilter.length >0){ 
        props.callBackData(listFilter.listFilter,'')  
    } 
  }, [listFilter.listFilter]);
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
     // 4 null
     if(year1 =="" && month1==="NULL" && year2 =="" && month2 ==="NULL" &&  dep==="NULL"){
          let arrayCoppy =  listValueField.listValueField.slice()   
          props.callBackData(arrayCoppy,"") 
     }   
     else {
        if(y1 =="" && m1==="NULL" && y2 =="" && m2 ==="NULL" &&  dep!=="NULL"){
          m1 ="NULL"
          y1 =""
          m2 = "NULL"
          y2 =""
          setDep(dep)
         }  else
        if(y1 =="" && y2 ==""  ){
          return toast.error("Please Choose Year!");
         } 
       else   
        if(y1 !== "" && y2 !="" &&  Number(y1)  > Number(y2)){
           return toast.error("Please Choose Year Again!");
         }
       else 
         if(y1 && y2 && m2 == "NULL" && m1 =="NULL"){
           y2 = y2
         } 
      else 
         if(y1 === y2 && m1 !=="" && m2 !=="" && Number(m1)  > Number(m2) ){
         
          let object ={
            params: arrayCheck.join(","),
            year:y1,
            month: m1,
            year2:  y2,
            month2: m2  ,
            departments: dep
          } 
         
          
          return  toast.error("Please Choose Month Again!");
         } 
        else
          if(y1 !=="" && y2 !=="" && m2 !== "NULL" && m1 !=="NULL"){
            y1 =y1
            y2 =y2
            m1 =m1
            m2 = m2
          }
        else 
         if(y1 ==false || m1 == false && y2 && m2 )
         {
           y1 =y2
           m1 = m2
           y2 = false
           m2 = false
         } 
        else 
         if(m1 =="NULL" && y1 !=="" && m2 && y2 ==""){
           m1 ="NULL"
           y1 =y1
           m2 = "NULL"
           y2 =""
        }  
         else
          if(m1 !== "NULL" && y1 !=="" && y2 !=="" || m1 !=="NULL"){
            m1 =m1
            y1 = y1
            y2 =""
            m2 = "NULL"
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
     } 
     
    
    // if(nameDep === "Choose Despartment")
    // {
    //     props.callBackData(listFilter.listFilter,"")   
    // }else {
    //     props.callBackData(listFilter.listFilter,nameDep)   
    // }
   
  }
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
//undo
    const undos = ()=>{
        let arrayCoppy =  listValueField.listValueField.slice()
        props.callBackData(arrayCoppy,"")   
       }
  return (
    <div className="chart__tool">
            <div className={`tool__list ${props.Tool ? 'tool--active' : ''}`} ref={props.ref}>
                <ul>
                  <li className='tool__item border--item'>
                  <div className='filter__group'>
                     <p> From </p>
                      <select id='select'  onChange={(e)=> setMonth1(e.target.value) }  >
                          <option value="NULL"> Choose Month </option> 
                          <option value="1"> January </option>
                          <option value="2"> February </option>
                          <option value="3"> March </option>
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
                     <input type="number" id='year' style={{width: "50%", height:"100%"}} placeholder="YYYY" min="2017" max="2100" onChange={(e)=> setYear1(e.target.value) } /> 
                    

                     </div>
                  </li>
                  <li className='tool__item border--item'>
                  <div className='filter__group'>
                      <p> To </p>
                     <select id='select'  onChange={(e)=> setMonth2(e.target.value) }  >
                         <option value="NULL"> Choose Month </option> 
                          <option value="1"> January </option>
                          <option value="2"> February  </option>
                          <option value="3"> March  </option>
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
                     <input type="number"  id='year' style={{width: "50%", height:"100%"}} placeholder="YYYY" min="2017" max="2100" onChange={(e)=> setYear2(e.target.value) } />
                     </div>
                  </li>
                  <li className='tool__item border--item'>
                      <select  onChange={(e)=> {setDep(e.target.value);setNameDep(e.target.selectedOptions[0].text) ;
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
                              {
                                    listFilter.loading ? (""): ( <img src={loading} alt="loading" title="loading"/>)
                            }
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
          </div>
  )
}

export default Tools