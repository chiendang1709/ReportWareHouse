import React, { Children, useEffect, useRef, useState }  from 'react'

import Field from './Field'
import {useAppSelector } from 'app/store/hooks';

const Table = ( props :{ listTable: any; name:string; }) => {  
 
  const [submenu, setSubmenu] = useState(false);
  const listFields = Object.keys(props.listTable)

  //getNameField
  const [array, setArray] = useState([]as string[])
  const tests = useAppSelector(state => state.clickApply)

   const handleClick= (num: string)=> {
     if(array.includes(num)){
      array.splice(array.indexOf(num),1)
      setArray(array);
     } else {
      array.push(num)
      setArray(array);
     }
   };
  if(tests.apply === 'Apply'){ 
    if(array.length !==0)  {
        console.log(props.name, array) //dispatch api
        console.log("nice")   
    }
  } 
 
  
  const listField = () => {
    let list = listFields.map((data : string, index:number) => (
         <Field handleClick={handleClick} submenu={submenu} listField={"hehe"}  nameField={data}  />
    ));
    return list
    };
  return (
            
            <li>
                <button className={`content__btn submenu__btn ${submenu ? "table__active" : " "} `} 
                 type="button" aria-haspopup="menu" aria-expanded={submenu ? "true" : "false"}
                  onClick={()=> setSubmenu((prev) =>  !prev)}>
                   {props.name}
                </button>
                {listField()}
            </li>  
        

         
       
  )
}

export default Table