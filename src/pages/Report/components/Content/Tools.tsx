import React, { Fragment, useEffect, useState } from 'react'
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";

import { styleMui } from 'components/common/styleMui';
import { listDepartment } from 'interfaces/components';
import { departmentAction } from 'pages/Report/slice/getDeptSlice'
import { staffAction } from 'pages/Report/slice/getStaffSlice'
import { customerAction } from 'pages/Report/slice/getCusSlice'
import { mwAction } from 'pages/Report/slice/getMWSlice'

import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { filterAction } from 'pages/Report/slice/filterSlice';
import { ToastContainer, toast } from 'react-toastify';
import { error } from 'constant/error';

import ex from 'assets/images/export__icon.png'
import loading from 'assets/images/loading.svg'
import { color } from '@mui/system';
import { groupAction } from 'pages/Report/slice/getCtGroupSlice';

type getdata = (arrayCoppy:string[], nameDep: string) => void;
// props:{ callBackData:getdata}
const Tools = () => {
  const selectGroup = ['ws_code','emp_name','dept_name','cus_name']
  const listfieldnumber =["opt_budget","opt_expect_revenue","opt_profit","opt_gross_profit","opt_commit_revenue","scon_ex_ct_value"]
  const dateFilters= ["opt_bid_open_date","opt_bid_close_date","scon_posting_date","scon_date_locked"]
  const classes = styleMui();
  const checkedIcon = <CheckBoxIcon fontSize="small"   className={classes.checkbox} />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small"  className={classes.checkbox}/>;
  const dispatch = useAppDispatch()

  const listTable = useAppSelector(state => state.table)
  const listDepartment = useAppSelector(state=> state.department)
  const listStaff = useAppSelector(state=> state.staff) 
  const listCustomer = useAppSelector(state=> state.customer) 
  const listMW = useAppSelector(state=> state.mw)  
  const listValueField = useAppSelector(state=> state.listValue)
  const listFilter = useAppSelector(state=> state.filter)
  
  let checFields = listValueField.listCheckField.split(",")
  let group_bys: string=""
  let from_dates:string = ""
  let to_dates:string =""
  let type_filters :string=""
  
  let number_selecteds:string[] = []
  let string_selecteds:string[]=[] 
  const [date_filters,setdateFilter]=useState("NULL");
  const [limit,setLimit ] =useState("");
  const [compare ,setCompare]=useState("NULL");
  const [depart, setDepart] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [mvv, setMvv] = useState<any[]>([]);
  const [group,setGroup]= useState("");
  const [disdept, setdisDepart] = useState<boolean>(true);
  const [discustomer, setdisCustomer] =  useState<boolean>(true);
  const [disstaff, setdisStaff] =  useState<boolean>(true);
  const [dismvv, setdisMvv] =  useState<boolean>(true);
  const [dateFrom, setDateFrom]= useState("")
  const [dateTo, setDateTo]= useState("") 
  
  const [numberSL,setNumberSL]=useState("")
  const [stringSL,setStringSL]=useState("")
  const nameTV= [...listTable.listTable];
   //getListDept
  useEffect(() => {dispatch(departmentAction.getDepartment())}, []);
  //getListStaff
  useEffect(() => {dispatch(staffAction.getStaff())}, []);
  //getListCustomer
  useEffect(() => {dispatch(customerAction.getCustomer())}, []);
  //getListMW
  useEffect(() => {dispatch(mwAction.getMW())}, []);
 
  useEffect(()=>{
    for(let i =0; i< selectGroup.length;i++){
      let select: HTMLElement|null = document.getElementById(`${selectGroup[i]}`)
      let autocomplete: any|null = document.getElementById("dept_name_autocomplete")
      let autocompletes: HTMLElement|null = document.getElementById("emp_name_autocomplete")
      if(checFields.indexOf(selectGroup[i]) === -1){
        if(select !== null && autocomplete !=null){
          select.setAttribute('disabled', '');
          switch(selectGroup[i]){
            case 'ws_code': 
                setdisMvv(true)
                break;
            case 'emp_name': 
                setdisStaff(true)
                break;
            case 'dept_name': 
                setdisDepart(true)
                break;
            case 'cus_name':
                setdisCustomer(true) 
                break;
          }
        }
      }else {
        if(select !== null && autocomplete !=null){
          select.removeAttribute('disabled');
          switch(selectGroup[i]){
            case 'ws_code': 
                setdisMvv(false)
                break;
            case 'emp_name': 
                setdisStaff(false)
                break;
            case 'dept_name': 
                setdisDepart(false)
                break;
            case 'cus_name':
                setdisCustomer(false) 
                break;
          }
          
        }
      }
    }},[checFields])
  
  
//change 
const changelistFielter = (list:any[], name:string)=>{
  let ext:string[]= []
 
  for(let i =0 ; i< list.length; i++){
    ext.push(`'${list[i][name]}'`)
  }
  return `${name} IN(${ext.join(",")})`
  
}

//clear
    
    const clear = ()=>{
      setDepart([]) 
      setCustomer([]) 
      setStaff([]) 
      setMvv([]) 
      setDateFrom("")
      setDateTo("")
    }
    useEffect(()=>{
  
      if(listValueField.listCheckField.length == 0){
        clear()
      }
    },[listValueField.listCheckField])

//get number string
for(let i =0; i< checFields.length; i++ ){
  if(listfieldnumber.indexOf(`${checFields[i]}`) !== -1){
    number_selecteds.push(checFields[i])
  }else if(listfieldnumber.indexOf(`${checFields[i]}`)== -1) {
    string_selecteds.push(checFields[i])
  }

}
const checkGroup = (data:string)=>{
  if(data === "time_code"){
      
    group_bys =type_filters
    
  }else {
    group_bys = data
  }
}
//filter test
const filtertest= ()=>{

  let extrass:string[]=[]
  let json:any={}
  let date1 = dateFrom.split('-')
  let date2 =dateTo.split('-')
  if(checFields.includes("opt_bid_open_date") == false && checFields.includes("opt_bid_close_date") == false  && checFields.includes("scon_date_locked") == false  && checFields.includes("scon_posting_date") == false){
    return toast.error(`${error.ERROR_NO_CHECK_DATEFILTER}`)
  }
  if(date1.length == 0 || date2.length == 0){
    return toast.error(`${error.ERROR_NULL_DATE}`);
  }else {
  if(date1[0] > date2[0]){
    return toast.error(`${error.ERROR_INPUT_YEAR}`);
  } 
  else if(date1[0]===date2[0] && date1[1]> date2[1]) {
    return toast.error(`${error.ERROR_INPUT_MONTH}`);
  }
  else if (date1[0]=== date2[0] && date1[1]===date2[1] && date1[2]> date2[2]) {
    return toast.error(`${error.ERROR_INPUT_DAY}`);
  } 
  if( date1[0] !== date2[0]){
    type_filters= "YEAR"
  }else if(date1[1] !== date2[1] && date1[0] === date2[0]){
    type_filters= "MONTH"
  }else if(date1[2] !== date2[2] && date1[1] === date2[1] && date1[0] === date2[0]){
    type_filters= "DAY"
  }
  from_dates =date1.join("/")
  to_dates  =date2.join("/")  
  }

    if(depart.length >0){
      extrass.push(changelistFielter(depart,"dept_code"));
    }
    if(customer.length >0){
      extrass.push(changelistFielter(customer,"cus_code"));
    }
    if(staff.length >0){
      extrass.push(changelistFielter(staff,"emp_code"));
    }
    if(mvv.length >0){
      extrass.push(changelistFielter(mvv,"ws_code"));
    }
    //check date filter
    if(date_filters== "NULL"){
      return toast.error(`${error.ERROR_INPUT_DATE_FILTER}`);
    }
    //check limit
    if(compare !=="NULL" && limit ===""){
      return toast.error(`${error.ERROR_INPUT_LIMIT}`);
    } else if(compare =="NULL" && limit !=="") {
      return toast.error(`${error.ERROR_INPUT_LIMIT}`);
    }
    //group
    checkGroup(group)
    json = 
    {
      number_selected: numberSL.length >0 ? numberSL : number_selecteds.length >0 ? number_selecteds.join(","):  "NULL",
      string_selected: string_selecteds.length >0 ? string_selecteds.join(","):  "NULL",
      date_filter:date_filters,
      from_date:from_dates,
      to_date:to_dates,
      group_by:group_bys ? group_bys:"NULL" ,
      type_filter:type_filters ?type_filters :"NULL",
      extras:extrass.length > 0 ? extrass.join(" AND "): "1=1",
      limits: limit ? limit :"NULL",
      desc: compare ? compare :"NULL"
    }

     dispatch(filterAction.getFilter(json))
     dispatch(groupAction.getGroup(group_bys))
    }
  
  const addOption =(array :string[])=>
  {
   let list = array.map((data:string)=>
      {
        for(let z = 0;z<nameTV.length; z++){
          if(nameTV[z].key_code ==`${data}`){
           return (<option value={`${data}`}> {`${nameTV[z].value_code}`} </option>) 
           } 
      }
    })
    return list
  }
  const dateFilter =()=>
  {
   let list = checFields.map((data:string)=>
      { 
        for(let i =0; i <dateFilters.length; i++){
           if(dateFilters[i]=== `${data}`){
            for(let z = 0;z<nameTV.length; z++){
              if(nameTV[z].key_code ==`${data}`){
               return (<option value={`${data}`}> {`${nameTV[z].value_code}`} </option>) 
               } 
          }
           }
        }
        
    })
    return list
  }
  

  return (
   
  <Fragment>
        <div className="tool__header"> </div>
        <div className='tool__component' >
                    <div className='filter__name'>
                      <div className='filter_name--col'>
                        <div className="form__group"  >
                        <Autocomplete
                         noOptionsText={'No Options'}
                         multiple
                         className='none'               
                         id="dept_name_autocomplete"
                         limitTags={2}  
                         disabled={disdept}
                         disableCloseOnSelect                     
                         value={depart}
                         options={listDepartment.listDepartment}
                         onChange={(_, selectedOptions) => setDepart(selectedOptions)}
                         getOptionLabel={option => option.dept_name}
                         getOptionSelected={(option:any, value:any) =>  option.dept_code === value.dept_code}
                         renderOption={(option, { selected }) => (
                          <React.Fragment>
                            <input type="checkbox"
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {` ${option.dept_code} - ${option.dept_name}`}
                          </React.Fragment>
                        )}
                         renderInput={params =>                       
                          { 
                            const { InputProps, ...restParams } = params;
                            const { startAdornment, ...restInputProps } = InputProps;
                             const inputProps:any = params.inputProps;
                            // inputProps.disabled = true
                            
                            return (
                            <TextField 
                            { ...restParams }                                          
                            className={classes.textField}
                            
                            label="Department" 
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
                         noOptionsText={'No Options'}
                         multiple
                         id="emp_name_autocomplete"
                         limitTags={2} 
                         disabled={disstaff}
                         disableCloseOnSelect                     
                         value={staff}
                         options={listStaff.listStaff}
                         onChange={(_, selectedOptions) => setStaff(selectedOptions)}
                         getOptionLabel={option => option.emp_name}
                         getOptionSelected={(option:any, value:any) =>  option.emp_code === value.emp_code}
                         renderOption={(option, { selected }) => (
                          <React.Fragment>
                             <input type="checkbox"
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.emp_name}
                          </React.Fragment>
                        )}
                        
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
                         noOptionsText={'No Options'}
                         multiple
                         id="cus_name_autocomplete"
                         limitTags={2} 
                         disabled={discustomer}
                         disableCloseOnSelect                     
                         value={customer}
                         options={listCustomer.listCustomer}
                         onChange={(_, selectedOptions) => setCustomer(selectedOptions)}
                         getOptionLabel={option => option.cus_name}
                         getOptionSelected={(option:any, value:any) =>  option.cus_code === value.cus_code}
                         renderOption={(option, { selected }) => (
                          <React.Fragment>
                             <input type="checkbox"
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.cus_name}
                          </React.Fragment>
                        )}
                        
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
                         noOptionsText={'No Options'}
                         multiple
                         id="ws_code_autocomplete"
                         limitTags={2} 
                         disabled={dismvv} 
                         disableCloseOnSelect                     
                         value={mvv}
                         options={listMW.listMW}
                         onChange={(_, selectedOptions) => setMvv(selectedOptions)}
                         getOptionLabel={option => option.ws_code}
                         getOptionSelected={(option:any, value:any) =>  option.ws_code === value.ws_code}
                         renderOption={(option, { selected }) => (
                          <React.Fragment>
                             <input type="checkbox"
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.ws_code}
                          </React.Fragment>
                        )}
                        
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
                      <div className='time__date'>
                          <div className="time__group">
                               <label htmlFor="day" className="time__label"> From</label>
                               <input type="date"  min="2018-01-01" max="2030-01-01" value={dateFrom} className="time__field" placeholder="Day" name="day" id='day' onChange={(e)=> setDateFrom(e.target.value)} required />
                          </div>
                          <div className="time__group">
                               <label htmlFor="day" className="time__label"> To </label>
                               <input type="date" min="2018-01-01" max="2030-01-01" value={dateTo} className="time__field" placeholder="Day" name="day" id='day'  onChange={(e)=> setDateTo(e.target.value)} required />
                          </div>
                        </div>
                         
                        <select id='selectGroup' className='tool__group'  onChange={(e)=> setdateFilter(e.target.value )}>
                          <option  value="NULL"> Date Filter </option> 
                          {dateFilter()}   
                        </select>

                      <div className='br' ></div>
                      
                        <select id='selectGroup' className='tool__group'  onChange={(e)=> setGroup(e.target.value )}>
                          <option  value="NULL"> Group by </option> 
                          <option id='time_name' value="time_code"> Time </option>
                          <option id='dept_name' value="dept_code"> Bộ Phận </option>
                          <option id='emp_name' value="emp_code" > Nhân Viên </option> 
                          <option id='cus_name' value="cus_code"> Khách Hàng </option>
                          <option id='ws_code' value="ws_code"> Mã Workspase </option>        
                        </select>
                     
                    </div>
                    <div className='group__tool'>

                      <select id='select' className='tool__top' onChange={(e)=> setNumberSL(e.target.value )} >
                           <option value="NULL"> Number Select </option> 
                            {addOption(number_selecteds)}               
                      </select>
                      
                      <select id='select' className='tool__top' onChange={(e)=> setCompare(e.target.value )}>
                          <option value="NULL"> Compare </option> 
                          <option value="ASC"> Min </option>
                          <option value="DESC"> Max </option>                          
                      </select>
                      <input type="number" value={limit}   onChange={(e)=> setLimit(String(Math.round(Number(e.target.value))) )} placeholder="Top"></input>

                      <div  className='group__button'>
                      <button id="filter" onClick={()=>filtertest()} >Fitler  {
                        listFilter.loading ? (""): ( <img src={loading} alt="loading" title="loading"/>)
                      } </button> 
                      <button id="clear" onClick={()=>clear()} >Clear </button>   
                      </div>
                                        
                      
                    </div>
             
                    

      </div>

      
      
  </Fragment>  

  )
}

export default Tools