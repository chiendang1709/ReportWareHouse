import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import {categoryAction} from 'pages/Report/categorySlice'
import Table from './Table'
import { listTable } from 'interfaces/components'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

  
const es = [
  {id:1,
  name: "doanh thu",
  field: {
    id :['1','2','3','4','5'],
    moneydt: ['1000','2000','3000','4000','5000'],
    datedt :['23/1/2010','23/2/2010','23/3/2010','23/4/2010','23/5/2010']
  }
},
  {id:2,
    name: "loi nhuan",
    field: {
      id :['1','2','3','4','5'],
      moneynl: ['2600','2700','3300','1000','3040'],
      dateln:['23/1/2010','23/2/2010','23/3/2010','23/4/2010','23/5/2010']
    }
  },
  {id:3,
    name: "thue",
    field: {
      id :['1','2','3','4','5'],
      moneyt: ['260','270','330','100','304'],
      datet :['23/1/2010','23/2/2010','23/3/2010','23/4/2010','23/5/2010']
    }
  },
]
const MenuItems = (props:{list:listTable}) => {
  const [dropright, setDropright] = useState(false);
  let ref = React.useRef<HTMLLIElement>(null)

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
  
  // useEffect(() => {
  //   dispatch(getCategory())
  // }, [listCategory]);

  const categorys = () => (  
      <li key={props.list.id} className='content__item' ref={ref} >
            <button className={`content__btn ${dropright ? "active" : " "} `} aria-expanded={dropright ? "true" : "false"}
              onClick={()=> { setDropright((prev) => !prev)} }>
              {props.list.name}
              {/* <DoubleArrowIcon></DoubleArrowIcon> */}
            </button>
            <ul className={`content__table content__submenu ${dropright ? "show" : " "}`}>
              {es.map((da,index)=>(
                 <Table key={props.list.id}  name={da.name}  listTable ={da.field}  /> 
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