import React, { Fragment, useEffect, useState } from 'react'
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";

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
import { color } from '@mui/system';

type getdata = (arrayCoppy:string[], nameDep: string) => void;
// props:{ callBackData:getdata}
const Tools = () => {
  const selectGroup = ['ws_code','emp_name','dept_name','cus_name']
  const classes = styleMui();
  const checkedIcon = <CheckBoxIcon fontSize="small"   className={classes.checkbox} />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small"  className={classes.checkbox}/>;
  const dispatch = useAppDispatch()
  const listDepartment = useAppSelector(state=> state.department) 
  const listValueField = useAppSelector(state=> state.listValue)
  const listFilter = useAppSelector(state=> state.filter)
  const onTool = useAppSelector(state=> state.onTool)
  let checFields = listValueField.listCheckField.split(",")
  const [depart, setDepart] = useState<any[]>([]);
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
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
    { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    { title: "The Lord of the Rings: The Two Towers", year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
    { title: "Alien", year: 1979 },
    { title: "Sunset Boulevard", year: 1950 },
    {
      title:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964
    },
    { title: "The Great Dictator", year: 1940 },
    { title: "Cinema Paradiso", year: 1988 },
    { title: "The Lives of Others", year: 2006 },
    { title: "Grave of the Fireflies", year: 1988 },
    { title: "Paths of Glory", year: 1957 },
    { title: "Django Unchained", year: 2012 },
    { title: "The Shining", year: 1980 },
    { title: "WALL·E", year: 2008 },
    { title: "American Beauty", year: 1999 },
    { title: "The Dark Knight Rises", year: 2012 },
    { title: "Princess Mononoke", year: 1997 },
    { title: "Aliens", year: 1986 },
    { title: "Oldboy", year: 2003 },
    { title: "Once Upon a Time in America", year: 1984 },
    { title: "Witness for the Prosecution", year: 1957 },
    { title: "Das Boot", year: 1981 },
    { title: "Citizen Kane", year: 1941 },
    { title: "North by Northwest", year: 1959 },
    { title: "Vertigo", year: 1958 },
    { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 }
  ];
  
  useEffect(()=>{
  for(let i =0; i< selectGroup.length;i++){
    let select: HTMLElement|null = document.getElementById(`${selectGroup[i]}`)
    if(checFields.indexOf(selectGroup[i]) === -1){
      if(select !== null){
        select.setAttribute('disabled', '');
      }
    }else {
      if(select !== null){
        select.removeAttribute('disabled');
      }
    }
  }},[checFields])
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
  console.log("checkfield",listValueField.listCheckField);
  
  
 
  let date1 = dateFrom.split('-')
  let date2 =dateTo.split('-')
  console.log("dep",depart);
  console.log("staff",staff);
  console.log("cus",customer);
  console.log("mvv",mvv);
  // console.log("select", select);
  
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
        <div className="tool__header"> </div>
        <div className='tool__component' >
                    <div className='filter__name'>
                      <div className='filter_name--col'>
                        <div className="form__group " >
                        <Autocomplete
                         noOptionsText={'No Options'}
                         multiple
                         id="tags-standard"
                         limitTags={2}  
                         disableCloseOnSelect                     
                         value={depart}
                         options={top100Films}
                         onChange={(_, selectedOptions) => setDepart(selectedOptions)}
                         getOptionLabel={option => option.title}
                         getOptionSelected={(option:any) => depart.find(v => v.title === option.title)}
                         renderOption={(option, { selected }) => (
                          <React.Fragment>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.title}
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
                         id="tags-standard"
                         limitTags={2}  
                         disableCloseOnSelect                     
                        value={staff}
                         options={top100Films}
                         onChange={(_, selectedOptions) => setStaff(selectedOptions)}
                         getOptionLabel={option => option.title}
                         getOptionSelected={(option:any) => staff.find(v => v.title === option.title)}
                         renderOption={(option, { selected }) => (
                          <React.Fragment>
                            <Checkbox
                              color='default'
                              className={classes.checkbox}
                              icon={icon}
                              checkedIcon={checkedIcon}
                            
                              checked={selected}
                            />
                            {option.title}
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
                         id="tags-standard"
                         limitTags={2}  
                         disableCloseOnSelect                     
                        value={customer}
                         options={top100Films}
                         onChange={(_, selectedOptions) => setCustomer(selectedOptions)}
                         getOptionLabel={option => option.title}
                         getOptionSelected={(option:any) => customer.find(v => v.title === option.title)}
                         renderOption={(option, { selected }) => (
                          <React.Fragment>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.title}
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
                         id="tags-standard"
                         limitTags={2}  
                         disableCloseOnSelect                     
                         value={mvv}
                         options={top100Films}
                         onChange={(_, selectedOptions) => setMvv(selectedOptions)}
                         getOptionLabel={option => option.title}
                         getOptionSelected={(option:any) => mvv.find(v => v.title === option.title)}
                         renderOption={(option, { selected }) => (
                          <React.Fragment>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                             
                            />
                            {option.title}
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
                      <select className='select__time' id='time' onChange={(e)=> setTime(e.target.value)}>
                            <option value="Day"> Day </option> 
                            <option value="Month"> Month </option>
                            <option value="Year"> Year </option> 
                            
                      </select>
                      {renderContent()}
                      <div className='br' ></div>
                      <select id='select' className='tool__top'>
                          <option value="NULL"> Top </option> 
                          <option value="1"> January </option>
                          <option value="2"> February </option>                          
                        </select>
                    </div>
                    
                    <div className='group__tool'>
                    <select id='selectGroup' className='tool__group'>
                          <option  value="NULL"> Group by </option> 
                          <option id='ws_code' value="ws_code"> Bộ Phận </option>
                          <option id='emp_name' value="emp_name" > Nhân Viên </option> 
                          <option id='dept_name' value="dept_name"> Khách Hàng </option>
                          <option id='cus_name' value="cus_name"> Mã Workspase </option>                                   
                      </select>
                      <button id="filter" onClick={()=>filtertest()} >Fitler </button>                     
                      
                    </div>
                   
                    

      </div>

      
      
  </Fragment>  

  )
}

export default Tools