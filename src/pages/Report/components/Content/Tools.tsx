import React, { Fragment, useEffect, useState } from 'react'
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
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
import undo  from 'assets/images/undo__icon.png'
import fil from 'assets/images/filter__icon.png'
import ex from 'assets/images/export__icon.png'
import loading from 'assets/images/loading.svg'
import { color } from '@mui/system';
import { groupAction } from 'pages/Report/slice/getCtGroupSlice';

type getdata = (arrayCoppy:string[], nameDep: string) => void;
// props:{ callBackData:getdata}
const Tools = () => {
  const selectGroup = ['ws_code','emp_name','dept_name','cus_name']
  const listfieldnumber =["opt_budget","opt_expect_revenue","opt_profit","opt_gross_profit","opt_commit_revenue","scon_ex_ct_value"]
  const dateFilters= ["opt_bid_open_date","opt_bid_close_date"]
  const classes = styleMui();
  const checkedIcon = <CheckBoxIcon fontSize="small"   className={classes.checkbox} />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small"  className={classes.checkbox}/>;
  const dispatch = useAppDispatch()
  const listDepartment = useAppSelector(state=> state.department)
  const listStaff = useAppSelector(state=> state.staff) 
  const listCustomer = useAppSelector(state=> state.customer) 
  const listMW = useAppSelector(state=> state.mw)  
  const listValueField = useAppSelector(state=> state.listValue)
  const listFilter = useAppSelector(state=> state.filter)
  const apply = useAppSelector(state => state.clickApply)
  
  let checFields = listValueField.listCheckField.split(",")

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
    
//filter test
const filtertest= ()=>{
  let date1 = dateFrom.split('-')
  let date2 =dateTo.split('-')
  let number_selecteds:string[] = []
  let string_selecteds:string[]=[]
  let date_filters:string=""
  let from_dates:string = ""
  let to_dates:string =""
  let type_filters :string=""
  let group_bys: string=""
  let extrass:string[]=[]
  let json:any={}

  //check date filter
  if(checFields.includes("opt_bid_open_date") == false && checFields.includes("opt_bid_close_date") == false){
    return toast.error(`${error.ERROR_NO_CHECK_DATEFILTER}`)
  }
  //check number and string
  for(let i =0; i< checFields.length; i++ ){
    if(listfieldnumber.indexOf(`${checFields[i]}`) !== -1){
      number_selecteds.push(checFields[i])
    }else if(listfieldnumber.indexOf(`${checFields[i]}`)== -1 && dateFilters.indexOf(`${checFields[i]}`)== -1) {
      string_selecteds.push(checFields[i])
    }else if(checFields[i] == "opt_bid_open_date"){
      date_filters =checFields[i]
    }else if(checFields.includes("opt_bid_open_date") === false && checFields[i] == "opt_bid_close_date" ){
      date_filters =checFields[i]
    }
  }
  //date
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
    } else if(date1[0]=== date2[0] && date1[1]===date2[1] && date1[2] === date2[2]){
      return toast.error(`${error.ERROR_INPUT_DATE}`);
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
    
    //group
    if(group === "time_code"){
      
      group_bys =type_filters
      
    }else {
      group_bys = group
    }
    json = {
      number_selected:number_selecteds.length >0 ? number_selecteds.join(","): "NULL",
      string_selected:string_selecteds.length >0 ? string_selecteds.join(","): "NULL",
      date_filter:date_filters,
      from_date:from_dates,
      to_date:to_dates,
      group_by:group_bys  ? group_bys:"NULL" ,
      type_filter:type_filters ?type_filters :"NULL",
      extras:extrass.length > 0 ? extrass.join(" AND "): "1=1"
    }

     dispatch(filterAction.getFilter(json))
     dispatch(groupAction.getGroup(group_bys))
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
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
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
                            <Checkbox
                              color='default'
                              className={classes.checkbox}
                              icon={icon}
                              checkedIcon={checkedIcon}
                            
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
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
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
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
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
                               <input type="date" value={dateFrom} className="time__field" placeholder="Day" name="day" id='day' onChange={(e)=> setDateFrom(e.target.value)} required />
                          </div>
                          <div className="time__group">
                               <label htmlFor="day" className="time__label"> To </label>
                               <input type="date" value={dateTo} className="time__field" placeholder="Day" name="day" id='day'  onChange={(e)=> setDateTo(e.target.value)} required />
                          </div>
                        </div>
    
                      <div className='br' ></div>
                      <select id='select' className='tool__top' disabled>
                          <option value="NULL"> Loading.... </option> 
                          <option value="1"> January </option>
                          <option value="2"> February </option>                          
                        </select>
                    </div>
                    
                    <div className='group__tool'>
                    <select id='selectGroup' className='tool__group'  onChange={(e)=> setGroup(e.target.value )}>
                          <option  value="NULL"> Group by </option> 
                          <option id='time_name' value="time_code"> Time </option>
                          <option id='dept_name' value="dept_code"> Bộ Phận </option>
                          <option id='emp_name' value="emp_code" > Nhân Viên </option> 
                          <option id='cus_name' value="cus_code"> Khách Hàng </option>
                          <option id='ws_code' value="ws_code"> Mã Workspase </option>                                   
                      </select>
                      <div  className='group__button'>
                      <button id="filter" onClick={()=>filtertest()} >Fitler  {
                        listFilter.loading ? (""): ( <img src={loading} alt="loading" title="loading"/>)
                      } </button>  
                      <button id="filter" onClick={()=>clear()} >Clear </button>   
                      </div>
                                        
                      
                    </div>
                   
                    

      </div>

      
      
  </Fragment>  

  )
}

export default Tools