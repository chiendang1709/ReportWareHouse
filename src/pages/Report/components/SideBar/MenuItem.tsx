import React, { useEffect, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { getList, postList } from 'features/authSlice'
import Table from './Table'
import { doesNotMatch } from 'assert'



const MenuItems = ( props:{id:number, title:string , table: { id: number; title: string;}[]} ) => {
  const [dropright, setDropright] = useState(false);
  let ref = React.useRef<HTMLLIElement>(null)
  const dispatch = useAppDispatch()
  const listReport = useAppSelector(state => state.data)
  console.log("data", listReport)

  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (dropright && ref.current && !ref.current.contains(event.target as HTMLLIElement)){
        setDropright(false);
      }
    };
    document.addEventListener("mousedown", handler );
    document.addEventListener("touchstart", handler );
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler );
      document.removeEventListener("touchstart", handler );
    };
  }, [dropright]);

  const onMouseEnter = () => {
    window.innerWidth > 200 && setDropright(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 200 && setDropright(false);
  };

  const table = props.table;
  return (
       <li className='content__item' ref={ref}  onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={()=>dispatch(getList())}  >
            <button className='content__btn' aria-expanded={dropright ? "true" : "false"}
              onClick={()=> setDropright((prev) => !prev)}>
              {props.title} 
            </button>
            <ul className={`content__table content__submenu ${dropright ? "show" : " "}`}>
              {  
                  
                    table.map((table) =>
                   <Table key={table.id} title={table.title}  /> 
                    )}
            </ul>
    </li>
   
    
  )
}

export default MenuItems