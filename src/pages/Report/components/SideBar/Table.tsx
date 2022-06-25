import React, { Children, useEffect, useRef, useState }  from 'react'


import Field from './Field'
import {useAppSelector,useAppDispatch } from 'app/store/hooks';
import { listTable } from 'interfaces/components';
import { listValueFieldAction } from 'pages/Report/slice/valueField';
import { getOnTable } from 'pages/Report/slice/onTable'
import triangle from 'assets/images/triangle__icon.png'
import triangle2 from 'assets/images/triangle__icon__2.png'

export interface test {
  table_name: string,
  key_code: string,
  value_code:string,
  
};


const Table = ( props :{ listTable: test[], name: string }) => {  
 
  const dispatch = useAppDispatch()
  const [submenu, setSubmenu] = useState(false);
  const [arrow, setArrow] = useState(triangle)
  let arrayCheck: string[]= []
  const apply = useAppSelector(state => state.clickApply)
  let ref = React.useRef<HTMLLIElement>(null)
    
 
  
 
    if(apply.apply === 'Apply'){ 
      let checkbox: any = document.getElementsByName('checkbox')  ;
      for (let item of checkbox) {
        if( item.checked == true){
          arrayCheck.push(item.value)
        }
       }
       if(arrayCheck.length >0){
        let array =arrayCheck.join(",")
        dispatch(listValueFieldAction.getlistValueField(array))    
       }
    }   
  
 
  
  const listField = () => {
    let list = props.listTable.map((data : test, index:number) => {
      if(data.table_name ===props.name){  
         return( <Field key={index}  keyField ={data.key_code}  nameField={data.value_code}/>)    
     } 
     });
    return list
    };
    
  return ( 
          

<li  ref={ref}>
        <button  className={`content__btn submenu__btn ${submenu ? "table__active" : " "} `} 
         type="button" aria-haspopup="menu" aria-expanded={submenu ? "true" : "false"}
         onMouseEnter={()=>setArrow(triangle2)}  
         onMouseLeave={()=>setArrow(triangle)} 
          onClick={()=> {setSubmenu((prev) => !prev); dispatch(getOnTable(true));  } }>
            {props.name}
           {submenu ?
            (<img src={triangle2} alt="triangle" title="list field" />)
            : (<img src={arrow} alt="triangle" title="list field" />)
           }
        </button>
        <ul className={`content__field .content__submenu ${submenu ? "show" : " "}`}  >                
           {listField()}

            </ul>
</li>  


        

     
  )
}

export default Table