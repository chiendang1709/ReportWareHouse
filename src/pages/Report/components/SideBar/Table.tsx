import React, { Children, useEffect, useRef, useState }  from 'react'

import Field from './Field'
import {useAppSelector,useAppDispatch } from 'app/store/hooks';
import { listTable } from 'interfaces/components';
import { fieldAction } from 'pages/Report/slice/fieldSlice';
import { listValueFieldAction } from 'pages/Report/slice/valueField';
import { getOnTable } from 'pages/Report/slice/onTable'


const Table = ( props :{ listTable: listTable }) => {  
 
  let listNameField: string[]= []
  const dispatch = useAppDispatch()
  const [submenu, setSubmenu] = useState(false);
  const [array, setArray] = useState([]as string[])
  const apply = useAppSelector(state => state.clickApply)
  const list= useAppSelector(state => state.field)
  const [check, isCheck] = useState(false)
  //
  let ref = React.useRef<HTMLLIElement>(null)
    useEffect(() => {
      const handler = (event: TouchEvent | MouseEvent) => {
        if (submenu && ref.current && !ref.current.contains(event.target as any)){
          setSubmenu(false);
        }
      };
      document.addEventListener("mousedown", handler );
      return () => {
        document.removeEventListener("mousedown", handler );
      };
    }, [submenu]);
  //
  
 //list name Field
  if(list.listField.length !==0){
    listNameField =list.listField
  }
  //getNameField
 
  const handleClick= (param: string)=> {

     if(array.includes(param)){
      const newObj = Object.assign(array);
      newObj.splice(newObj.indexOf(param),1)
      setArray(newObj);
     } else {
      const newObj = Object.assign(array);
      newObj.push(param)
      setArray(newObj);
     }
   };
  if(apply.apply === 'Apply'){ 
    if(array.length !==0)  {
        const test ={
          listValue :array.join(","),
          id: props.listTable.id
        }
        let a =array.join(",")
        dispatch(listValueFieldAction.getlistValueField(test))
    }
  }   
  

  let checkbox: any = document.getElementsByName(`${props.listTable.id}`)  ;
  function changeListner(e:any) {
    const isSelectorChecked = e.target.checked;
    if (isSelectorChecked) {
      for (let item of checkbox) {
        item.checked = true;
      }
    } else {
      for (let item of checkbox) {
        item.checked = false;
      }
    }
  }
  
  const listField = () => {
    let list = listNameField.map((data : string, index:number) => (
         <Field key={index} handleClick={handleClick} id={props.listTable.id}  nameField={data}  />
    ));
    return list
    };

  return ( 
             <li  ref={ref}>
                <button  className={`content__btn submenu__btn ${submenu ? "table__active" : " "} `} 
                 type="button" aria-haspopup="menu" aria-expanded={submenu ? "true" : "false"}
                  onClick={()=> {setSubmenu((prev) => !prev); dispatch(getOnTable(true)); dispatch(fieldAction.getListFields(props.listTable.id)); } }>
                   {props.listTable.reports_name}
                </button>
                <ul className={`content__field .content__submenu ${submenu ? "show" : " "}`}  >                
                  <input className="select-all" onChange={(e)=>changeListner(e)} type="checkbox" name="acs" value="Select All"/>Select All 
                   {listField()}
                </ul>
            </li>  


        

     
  )
}

export default Table