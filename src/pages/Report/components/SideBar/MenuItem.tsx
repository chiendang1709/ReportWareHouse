import React, { useEffect, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { getList, postList } from 'features/tableSlice'
import { getCategory, postCategory } from 'features/categorySlice'
import Table from './Table'
import { listTable } from 'interfaces/components'
import index from 'utils'


  
const es = [
  {id:1,
  name: "doanh thuat"},
  {id:2,
    name: "nhan su"},
  {id:3,
    name: "ky thuat"}
]
const MenuItems = (props:{list:listTable}) => {
  const [dropright, setDropright] = useState(false);
<<<<<<< HEAD
  const [t, seta] = useState(false);
  let ref = React.useRef<HTMLLIElement>(null)
  // const dispatch = useAppDispatch()
  // const listCategory = useAppSelector(state => state.category)
  // console.log("data", listCategory)
=======
 
  let ref = React.useRef<HTMLLIElement>(null)
>>>>>>> 539587522d5e7fe804e07fcb74485550f3496122
  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (dropright && ref.current && !ref.current.contains(event.target as HTMLLIElement)){
        setDropright(false);
<<<<<<< HEAD
        seta(false)
=======
>>>>>>> 539587522d5e7fe804e07fcb74485550f3496122

      }
    };
    document.addEventListener("mousedown", handler );
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler );
    };
  }, [dropright]);
  
  // useEffect(() => {
  //   dispatch(getCategory())
  // }, [listCategory]);
  const categorys = () => (
    
      <li key={props.list.id} className='content__item' ref={ref} >
            <button className={`content__btn ${dropright ? "active" : " "} `} aria-expanded={dropright ? "true" : "false"}
              onClick={()=> { setDropright((prev) => !prev)} }>
              {props.list.name}
            </button>
          <ul className={`content__table content__submenu ${dropright ? "show" : " "}`}>
           {es.map((da,index)=>(
<<<<<<< HEAD
              <Table key={props.list.id} active={t}  name={da.name}  listTable ={"heloe"}  /> 
=======
              <Table key={props.list.id}  name={da.name}  listTable ={"heloe"}  /> 
>>>>>>> 539587522d5e7fe804e07fcb74485550f3496122
           ))} 
           </ul>
      </li>

  );
  console.log("cate",props.list)
  return (
      <React.Fragment>
        {categorys()} 
      </React.Fragment>
   
    
  )
}

export default MenuItems