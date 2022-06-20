import React, { useEffect, useState } from 'react'

import Table from './Table'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { listCategory, listTable } from 'interfaces/components'
import { tableAction } from 'pages/Report/slice/tableSlice'
import img from 'assets/images/loading_spiner.gif'
import { getOnTable } from 'pages/Report/slice/onTable'

  

const MenuItems = (props:{listCategory:listCategory}) => {

  let ref = React.useRef<HTMLLIElement>(null)
  const [dropright, setDropright] = useState(false);
  const dispatch = useAppDispatch()
  const listTable = useAppSelector(state => state.table)
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
 
  
  const categorys = () => (  
      <li  className='content__item' ref={ref} >
            <button className={`content__btn ${dropright ? "active": ""}`}aria-expanded={dropright ? "true" : "false"}
              onClick={()=> { setDropright((prev) => !prev); dispatch(tableAction.getListTables(props.listCategory.id));}}>
              {props.listCategory.name}
        
            </button>
            <ul  className={`content__table content__submenu ${dropright ? "show" : ""}`}>
              { listTable.listTable.map((data: listTable,index:number)=>(
                  data.category == props.listCategory.id ?
                    (<Table key={data.id}  listTable={data}/>)
                    : <div></div>
              ))}
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