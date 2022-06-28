import React, { useEffect, useRef, useState } from 'react'
import logo from 'assets/images/logo.png'
import icon__cate from 'assets/images/cate__icon.png'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { categoryAction } from 'pages/Report/slice/categorySlice'
import {getOnTool} from 'pages/Report/slice/onTool'
import MenuItem from './MenuItem'
import { listCategory } from 'interfaces/components'
import ChartsType from './ChartsType'
import { apply } from 'pages/Report/slice/applySlice'
import ap from 'assets/images/apply__icon.png'
import arrow from 'assets/images/arrow__icon.png'



const Sidebar = () => {
  const dispatch = useAppDispatch()
  const listCategory = useAppSelector(state => state.category)
  const onTool = useAppSelector(state=> state.onTool)
   
   
  //getListCategory
  useEffect(() => {
    dispatch(categoryAction.getCategory())
  }, []);

  const categorys = () => {
    let list = listCategory.listCategory.map((data :listCategory, index:number) => 
        (
             <MenuItem key={data.id} listCategory={data} />
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
             <div className={`sidebar__header tool--header ${onTool.onTool ? "open--active" :" "}`}>  
          
              <button className={`tool__button `} aria-expanded={onTool.onTool ? "true" : "false"}  onClick={()=>dispatch(getOnTool())} >
                <p>Tool</p>
                 <img src={arrow} alt="arrow" title ="use tool" />
              </button>
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
            <div className="sidebar__footer" >
                  <button  onClick={()=>dispatch(apply.getApply("Apply"))}>
                      <img src={ap} alt="apply" title="apply data" />
                  </button>
             </div>


    </div>
  )
}

export default Sidebar