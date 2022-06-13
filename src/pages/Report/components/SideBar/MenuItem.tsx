import React, { useEffect, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { getList, postList } from 'features/authSlice'
import Table from './Table'



const MenuItems = () => {
  const [dropright, setDropright] = useState(false);
  let ref = React.useRef<HTMLLIElement>(null)
  const dispatch = useAppDispatch()
  const listReport = useAppSelector(state => state.data)
  console.log("data", listReport)
  const onMouseEnter = () => {
    window.innerWidth > 200 && setDropright(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 200 && setDropright(false);
  };

  return (
    <div>
    <ul>
       <li className='content__item' ref={ref} onClick={()=>dispatch(getList())}  >
            <button className='content__btn' aria-expanded={dropright ? "true" : "false"}
              onClick={()=> setDropright((prev) => !prev)}>
              Kinh doanh 
            </button>
          <Table dropright ={dropright} listTable ={"heloe"}  /> 
    </li>
    </ul>

   </div>
   
    
  )
}

export default MenuItems