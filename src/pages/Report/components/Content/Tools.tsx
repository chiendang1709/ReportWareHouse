import React, { Fragment, useEffect, useState } from 'react'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { styleMui } from 'components/common/styleMui';
import { listDepartment } from 'interfaces/components';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { filterAction } from 'pages/Report/slice/filterSlice';
import { ToastContainer, toast } from 'react-toastify';
import { error } from 'constant/error';
import undo  from 'assets/images/undo__icon.png'
import fil from 'assets/images/filter__icon.png'
import ex from 'assets/images/export__icon.png'
import loading from 'assets/images/loading.svg'

type getdata = (arrayCoppy:string[], nameDep: string) => void;
// props:{ callBackData:getdata}
const Tools = () => {
  const classes = styleMui();
  const dispatch = useAppDispatch()
  const listDepartment = useAppSelector(state=> state.department) 
  const listValueField = useAppSelector(state=> state.listValue)
  const listFilter = useAppSelector(state=> state.filter)
  const onTool = useAppSelector(state=> state.onTool)

  const [depart, setDepart] = useState<string[]>([]);
  const [customer, setCustomer] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [mvv, setMvv] = useState<any[]>([]);
  const [month1, setMonth1] =useState<string|boolean>("NULL");
  const [year1, setYear1] =useState<string|boolean>("");
  const [month2, setMonth2] =useState<string|boolean>("NULL");
  const [year2, setYear2] =useState<string|boolean>("");
  const [dep, setDep]=useState("NULL");
  const [nameDep, setNameDep]=useState("");
  const [time, setTime] = useState("Day");

  const [dateFrom, setDateFrom]= useState("")
  const [dateTo, setDateTo]= useState("") 
  const top100Films = ["Elephant","Zebra", "Tiger", "Rabbit"]

  //filter
  // useEffect(() => {
  //   if(listFilter.listFilter.length >0){ 
  //       // props.callBackData(listFilter.listFilter,'')  
  //   } 
  // }, [listFilter.listFilter]);
  // const filter = ()=> {
  //   let arrayCheck: string[]= []
  //   let y1: string|boolean= year1
  //   let m1: string|boolean= month1
  //   let y2: string|boolean= year2
  //   let m2: string|boolean= month2
  //   let checkbox: any = document.getElementsByName('checkbox')  ;
  //   for (let item of checkbox) {
  //    if( item.checked == true){
  //       arrayCheck.push(item.value)
  //     }
  //    }
  //    // 4 null
  //    if(year1 =="" && month1==="NULL" && year2 =="" && month2 ==="NULL" &&  dep==="NULL"){
  //         let arrayCoppy =  listValueField.listValueField.slice()   
  //         // props.callBackData(arrayCoppy,"") 
  //    }   
  //    else {
  //       if(y1 =="" && m1==="NULL" && y2 =="" && m2 ==="NULL" &&  dep!=="NULL"){
  //         m1 ="NULL"
  //         y1 =""
  //         m2 = "NULL"
  //         y2 =""
  //         setDep(dep)
  //        }  else
  //       if(y1 =="" && y2 ==""  ){
  //         return toast.error("Please Choose Year!");
  //        } 
  //      else   
  //       if(y1 !== "" && y2 !="" &&  Number(y1)  > Number(y2)){
  //          return toast.error("Please Choose Year Again!");
  //        }
  //      else 
  //        if(y1 && y2 && m2 == "NULL" && m1 =="NULL"){
  //          y2 = y2
  //        } 
  //     else 
  //        if(y1 === y2 && m1 !=="" && m2 !=="" && Number(m1)  > Number(m2) ){
         
  //         let object ={
  //           params: arrayCheck.join(","),
  //           year:y1,
  //           month: m1,
  //           year2:  y2,
  //           month2: m2  ,
  //           departments: dep
  //         } 
         
          
  //         return  toast.error("Please Choose Month Again!");
  //        } 
  //       else
  //         if(y1 !=="" && y2 !=="" && m2 !== "NULL" && m1 !=="NULL"){
  //           y1 =y1
  //           y2 =y2
  //           m1 =m1
  //           m2 = m2
  //         }
  //       else 
  //        if(y1 ==false || m1 == false && y2 && m2 )
  //        {
  //          y1 =y2
  //          m1 = m2
  //          y2 = false
  //          m2 = false
  //        } 
  //       else 
  //        if(m1 =="NULL" && y1 !=="" && m2 && y2 ==""){
  //          m1 ="NULL"
  //          y1 =y1
  //          m2 = "NULL"
  //          y2 =""
  //       }  
  //        else
  //         if(m1 !== "NULL" && y1 !=="" && y2 !=="" || m1 !=="NULL"){
  //           m1 =m1
  //           y1 = y1
  //           y2 =""
  //           m2 = "NULL"
  //         }
  //       let object ={
  //         params: arrayCheck.join(","),
  //         year:y1? y1 : "NULL",
  //         month: m1 ? m1: "NULL",
  //         year2:  y2? y2 : "NULL",
  //         month2: m2  ? m2 : "NULL",
  //         departments:  Number(dep) ? dep: "NULL"
  //       } 
  //        dispatch(filterAction.getFilter(object))
  //    } 
     
    
    // if(nameDep === "Choose Despartment")
    // {
    //     props.callBackData(listFilter.listFilter,"")   
    // }else {
    //     props.callBackData(listFilter.listFilter,nameDep)   
    // }
   
//}

//undo
    const undos = ()=>{
        let arrayCoppy =  listValueField.listValueField.slice()
        //  props.callBackData(arrayCoppy,"")   
       }
//filter test
const filtertest= ()=>{
  let date1 = dateFrom.split('-')
  let date2 =dateTo.split('-')
  console.log("dep",depart);
  console.log("staff",staff);
  console.log("cus",customer);
  console.log("mvv",mvv);
 
  switch(time){
    case 'Day': 
       if(date1[0] > date2[0]){
         return toast.error(`${error.ERROR_INPUT_YEAR}`);
       } 
       else if(date1[0]===date2[0] && date1[1]> date2[1]) {
         return toast.error(`${error.ERROR_INPUT_MONTH}`);
       }
       else if (date1[0]=== date2[0] && date1[1]===date2[1] && date1[2]> date2[2]) {
         return toast.error(`${error.ERROR_INPUT_DAY}`);
       }
       console.log("day", `from ${date1} to ${date2} `);     
       break;
    case 'Month': 
       if(date1[0] > date2[0]){
         return toast.error(`${error.ERROR_INPUT_YEAR}`);
       } 
       else if(date1[0]===date2[0] && date1[1]> date2[1]) {
         return toast.error(`${error.ERROR_INPUT_MONTH}`);
       }
       console.log("motnh", `from ${date1} to ${date2} `);     
       break;
    case 'Year':
      if(date1[0] > date2[0]){
        return toast.error(`${error.ERROR_INPUT_YEAR}`);
      } 
      console.log("year", `from ${date1} to ${date2} `);
      break;
    default: 
      return null;
  }
  
}
const renderContent = React.useCallback(() => {
  switch(time) {
   
    case 'Day': 
      
      return <div className='time__date'>
                 <div className="time__group">
                      <label htmlFor="day" className="time__label"> From (Day) </label>
                      <input type="date" className="time__field" placeholder="Day" name="day" id='day' onChange={(e)=> setDateFrom(e.target.value)} required />
                 </div>
                 <div className="time__group">
                      <label htmlFor="day" className="time__label"> To (Day) </label>
                      <input type="date" className="time__field" placeholder="Day" name="day" id='day'  onChange={(e)=> setDateTo(e.target.value)} required />
                 </div>
            </div>;
    
    case 'Month': 
    
      return  <div className='time__date'>
              <div className="time__group">
                   <label htmlFor="Month" className="time__label"> From (Month) </label>
                   <input type="month" className="time__field" placeholder="Month" name="Month" id='Month' onChange={(e)=> setDateFrom(e.target.value)} required />
              </div>
              <div className="time__group">
                   <label htmlFor="Month" className="time__label"> To (Month) </label>
                   <input type="month" className="time__field" placeholder="Month" name="Month" id='Month' onChange={(e)=> setDateTo(e.target.value)} required />
              </div>
            </div>;
      
    case 'Year': 
    
    
    return <div className='time__date'>
              <div className="time__group">
                   <label htmlFor="day" className="time__label"> From (Year) </label>
                   <input type="date" className="time__field" placeholder="Year" name="Year" id='Year' required />
              </div>
              <div className="time__group">
                   <label htmlFor="Year" className="time__label"> To (Year) </label>
                   <input type="date" className="time__field" placeholder="Year" name="Year" id='Year' required />
              </div>
            </div>;
    default: 
      return null;
    
  }
}, [time]);
  return (
   
  <Fragment>
        <div className="tool__header">
        <div className='tool__component' >
                    <div className='filter__name'>
                      <div className='filter_name--col'>
                        <div className="form__group ">
                    <Autocomplete
                         multiple
                         id="tags-standard"
                         limitTags={3}
                         freeSolo
                         filterSelectedOptions
                         options={top100Films}
                         onChange={(e, newValue) =>{setDepart(newValue)
                         } }
                         getOptionLabel={option => option}
                         value={depart}                         
                         renderInput={params =>                       
                          { 
                            const { InputProps, ...restParams } = params;
                            const { startAdornment, ...restInputProps } = InputProps;
                          
                            return (
                           <TextField 
                             {...restParams}  
                              id="outlined-basic"                                     
                              className={classes.textField}
                              label="Department " 
                              variant="outlined"
                              placeholder="enter"                                                                 
                              multiline
                              fullWidth
                              InputProps={ startAdornment ?  {
                                ...restInputProps, 
                                 startAdornment: (
                                   <div style={{height: "auto", maxHeight: 55, overflowY: 'auto'}}>
                                     {startAdornment}
                                   </div>
                                 ),
                            } : {...restInputProps} }
                          
                        />
                       
                        )}}          
                        /> 
                        
                        </div>
                        
                        <div className="form__group ">
                    <Autocomplete
                         multiple
                         id="tags-standard"
                         limitTags={3}
                         freeSolo
                         filterSelectedOptions
                         options={top100Films}
                         onChange={(e, newValue) =>{setStaff(newValue); console.log("new", newValue);
                         } }
                         getOptionLabel={option => option}
                         value={staff}
                         renderInput={params =>                       
                          { 
                            const { InputProps, ...restParams } = params;
                            const { startAdornment, ...restInputProps } = InputProps;
                            return (
                            <TextField 
                            { ...restParams }                                          
                            className={classes.textField}
                            label="Staff" 
                            variant="outlined"
                            placeholder="enter"                                                                    
                            multiline
                            fullWidth
                            InputProps={ startAdornment ?  {
                              ...restInputProps,
                              startAdornment: (
                                <div style={{height: "auto", maxHeight: 55, overflowY: 'auto'}}>
                                  {startAdornment}
                                </div>
                              ),
                         } :  {...restInputProps} }
                           
                        />)}}          
                        /> 
                        </div>
                      </div>
                    
                      <div className='filter_name--col'>
                        <div className="form__group ">
                    <Autocomplete
                         multiple
                         id="tags-standard"
                         limitTags={3}
                         freeSolo
                         filterSelectedOptions
                         options={top100Films}
                         onChange={(e, newValue) =>{setCustomer(newValue); console.log("new", newValue);
                         } }
                         getOptionLabel={option => option}
                         value={customer}
                         renderInput={params =>                       
                          { 
                            const { InputProps, ...restParams } = params;
                            const { startAdornment, ...restInputProps } = InputProps;
                            return (
                            <TextField 
                            { ...restParams }                                          
                            className={classes.textField}
                            label="Customer" 
                            variant="outlined"
                            placeholder="enter"                                                                    
                            multiline
                            fullWidth
                            InputProps={ startAdornment ?  {
                              ...restInputProps,
                              
                              startAdornment: (
                                <div style={{height: "auto", maxHeight: 55, overflowY: 'auto'}}>
                                  {startAdornment}
                                </div>
                              ),
                         } :  {...restInputProps} }
                           
                        />)}}          
                        /> 
                        </div>

                        <div className="form__group ">
                    <Autocomplete
                         multiple
                         id="tags-standard"
                         limitTags={3}
                         freeSolo
                         filterSelectedOptions
                         options={top100Films}
                         onChange={(e, newValue) =>{setMvv(newValue); console.log("new", newValue);
                         } }
                         getOptionLabel={option => option}
                         value={mvv}
                         renderInput={params =>                       
                          { 
                            const { InputProps, ...restParams } = params;
                            const { startAdornment, ...restInputProps } = InputProps;
                            return (
                            <TextField 
                            { ...restParams }                                          
                            className={classes.textField}
                            label="MVV" 
                            variant="outlined"
                            placeholder="enter"                                                                    
                            multiline
                            fullWidth
                            InputProps={ startAdornment ?  {
                              ...restInputProps,
                              
                              startAdornment: (
                                <div style={{height: "auto", maxHeight: 55, overflowY: 'auto'}}>
                                  {startAdornment}
                                </div>
                              ),
                         } :  {...restInputProps} }
                           
                        />)}}          
                        /> 
                        </div>
                      </div>                 
                    </div>

                    <div className='filter__time'>
                      <select className='select__time' id='time' onChange={(e)=> setTime(e.target.value)}>
                            <option value="Day"> Day </option> 
                            <option value="Month"> Month </option>
                            <option value="Year"> Year </option> 
                            
                      </select>
                      {renderContent()}
                    </div>

                    <div className='group__tool'>
                      <select id='select' className='tool__group'>
                          <option value="NULL"> Group by </option> 
                          <option value="1"> January </option>
                          <option value="2"> February </option>                          
                      </select>
                      <button id="filter" onClick={()=>filtertest()} >Fitler </button>                     
                      
                    </div>
                   
                    

      </div>

        </div>
      
  </Fragment>  

  )
}

export default Tools