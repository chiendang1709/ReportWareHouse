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
    console.log("testnum", param);
    
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
        console.log("test-choose",array.join(",")) 
        const test ={
          listValue :array.join(","),
          id: props.listTable.id
        }
        let a =array.join(",")
        dispatch(listValueFieldAction.getlistValueField(test))
        console.log("nice")
    }
  }   

  const listField = () => {
    let list = listNameField.map((data : string, index:number) => (
         <Field key={index} handleClick={handleClick}   nameField={data}  />
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
                   {listField()}
                </ul>
            </li>  


        

     
  )
}

export default Table