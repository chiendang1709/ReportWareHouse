import React, { useEffect, useState } from 'react'

import Table from './Table'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { listCategory, listTable } from 'interfaces/components'
import { tableAction } from 'pages/Report/slice/tableSlice'
import arrow from 'assets/images/arrow__icon.png'

 

const MenuItems = (props:{listCategory:listCategory}) => {

  let ref = React.useRef<HTMLLIElement>(null)

  const [dropright, setDropright] = useState(false);
  
  const dispatch = useAppDispatch()
  const listTable = useAppSelector(state => state.table)
  let nameTable: string[]=[]  
  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (dropright && ref.current && !ref.current.contains(event.target as HTMLLIElement)){
        setDropright(false);
      }
    };
    document.addEventListener("mousedown", handler );
    return () => {
      document.removeEventListener("mousedown", handler );
    };
  }, [dropright]);
  
  
  for(let y = 0; y <listTable.listTable.length;y++)
  {  
     const list= listTable.listTable[y].table_name;
      if(nameTable.indexOf(list)=== -1){   
        nameTable.push(list)
      }
  }
  const category =()=>(nameTable.map((data: string,index:number)=>{
     if(props.listCategory.id === 1){
       return <Table key={index} name={data}  listTable={listTable.listTable}/>
     }else {
      return null
     }
    
    }))
  
  const categorys = () => (  
      <li  className='content__item' ref={ref} >
            <button className={`content__btn ${dropright ? "active": ""}`}aria-expanded={dropright ? "true" : "false"}
              onClick={()=> { setDropright((prev) => !prev); dispatch(tableAction.getListTables(props.listCategory.id));}}>
              {props.listCategory.reports_category_name}
              <img src={arrow} alt="arrow" title="click ra"/>
            </button>
            <ul  className={`content__table content__submenu ${dropright ? "show" : ""}`}>
              {category()}
          </ul>
            
      </li>

  );

  return (
      <React.Fragment>
        {categorys()} 
      </React.Fragment>
   
    
  )
}

export default MenuItems