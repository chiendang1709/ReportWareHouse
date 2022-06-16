import React, { useEffect, useRef, useState } from 'react'
import logo from 'assets/images/logo.png'
import icon__cate from 'assets/images/cate__icon.png'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { getCategory, postCategory } from 'pages/Report/categorySlice'
import MenuItem from './MenuItem'
import { listTable } from 'interfaces/components'
import ChartsType from './ChartsType'
import { getTypeChart } from 'pages/Report/changeChart'



const Sidebar = () => {
  const dispatch = useAppDispatch()
  const listCategory = useAppSelector(state => state.category)
  console.log("data", listCategory)
  useEffect(() => {
    dispatch(getCategory())
  }, []);
  const categorys = () => {
    let list = listCategory.listCategory.map((data :listTable, index:number) => (
             <MenuItem key={index} list={data} />
    ));
    return list
    };
  return (
    <div className='sidebar'>

             <div className="sidebar__header">
                <div className="sidebar__logo">
                 <a href="/">
                    <img src={logo} title="go home page" alt="rpwh logo" />
                   </a>
                </div>            
             </div>
             <div className="sidebar__header" >
                  <ChartsType/>
             </div>
             <div className="sidebar__header height--small">
                <div className="sidebar__title">

                <img src={icon__cate} alt=" icon category" />    
                    <h3>CATEGORY</h3> 
                </div>
             </div>
             <div className="sidebar__content">
                    <ul className="content__type">
                        {categorys()}     
                     </ul>
            </div>
            {/* <div className="sidebar__footer" >
                  <button>Apply</button>
             </div> */}


    </div>
  )
}

export default Sidebar