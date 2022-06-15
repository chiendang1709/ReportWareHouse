import React, { Children, useEffect, useRef, useState }  from 'react'
import Field from './Field'



<<<<<<< HEAD
const Table = ( props :{ listTable: any; name:string; active:boolean}) => {  
=======
const Table = ( props :{ listTable: any; name:string; }) => {  
>>>>>>> 539587522d5e7fe804e07fcb74485550f3496122
 
  const [submenu, setSubmenu] = useState(false);
  // useEffect(()=>{
  // if(submenu === true){
  //   setSubmenu(false)
  // }},[submenu])
  return (
            
            <li>
                <button className={`content__btn submenu__btn ${submenu ? "table__active" : " "} `} 
                 type="button" aria-haspopup="menu" aria-expanded={submenu ? "true" : "false"}
                  onClick={()=> setSubmenu((prev) =>  !prev)}>
                   {props.name}
                </button>
                <Field  submenu={submenu} listField={"hello"}/>
            </li>  
        

         
       
  )
}

export default Table