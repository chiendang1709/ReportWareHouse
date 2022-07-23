import React, {useEffect, useState }  from 'react'

import Field from './Field'
import {useAppSelector,useAppDispatch } from 'app/store/hooks';
import { getOnTable } from 'pages/Report/slice/onTable'
import triangle from 'assets/images/triangle__icon.png'

export interface listTable {
  table_name: string,
  key_code: string,
  value_code:string,
};

const Table = ( props :{ listTable: listTable[], name: string, loading:boolean }) => {  
 
  const dispatch = useAppDispatch()
  const [submenu, setSubmenu] = useState(false);
  let ref = React.useRef<HTMLLIElement>(null)
  
  const listField = () => {
    let list = props.listTable.map((data : listTable, index:number) => {
      if(data.table_name ===props.name){  
        return( <Field key={index}  keyField ={data.key_code}  nameField={data.value_code}/>)    
     } 
     });
    return list
    };
    
  return (  
    
     <li className={`submenu__item  ${submenu ? "submenu--open" : ""} `} ref={ref}>
         <button  className={`content__btn submenu__btn ${submenu ? "table__active" : " "} `} 
         type="button" aria-haspopup="menu" aria-expanded={submenu ? "true" : "false"}
          onClick={()=> {setSubmenu((prev) => !prev); dispatch(getOnTable(true));  } }>
            {props.name}
            <img src={triangle} alt="triangle" title="list field" />
        </button>
        <ul className={`content__field .content__submenu ${submenu ? "field__show" : " "}`}  >                
           {listField()}
        </ul>
     
    </li>
     
  )
}

export default Table