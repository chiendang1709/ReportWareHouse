import React, { useEffect, useRef, useState } from 'react'
import logo from 'assets/images/logo.png'
import icon__cate from 'assets/images/cate__icon.png'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { categoryAction } from 'pages/Report/slice/categorySlice'
import MenuItem from './MenuItem'
import { listCategory } from 'interfaces/components'
import ChartsType from './ChartsType'
import { apply } from 'pages/Report/slice/applySlice'
import ap from 'assets/images/apply__icon.png'
import arrow from 'assets/images/arrow__icon.png'
import loading from 'assets/images/loading.svg'



const Sidebar = () => {
  const dispatch = useAppDispatch()
  const listCategory = useAppSelector(state => state.category)
  const listValueField = useAppSelector(state=> state.listValue) 
  
   
  //getListCategory
  useEffect(() => {
    dispatch(categoryAction.getCategory())
  }, []);

  const categorys = () => {
    let list = listCategory.listCategory.map((data :listCategory, index:number) => 
        (
             <MenuItem key={data.id} listCategory={data}  />
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
             <div className="sidebar__header ">
                <div className="sidebar__title">

                  <img src={icon__cate} alt=" icon category" />    
                    <h3>CATEGORY</h3> 
                </div>
                <div className="sidebar__content">
                    <ul className="content__type">
                        {categorys()}     
                     </ul>
            </div>
             </div>
            
            <div className="sidebar__header" >
                  <ChartsType/>
             </div>
           
            <div className="sidebar__footer" >
                  <button  onClick={()=>dispatch(apply.getApply("Apply"))}>
                      {/* <img src={ap} alt="apply" title="apply data" /> */}
                      <p>Apply</p>
                      {
                        listValueField.loading ? (""): ( <img src={loading} alt="loading" title="loading"/>)
                      }
                     
                  </button>
             </div>


    </div>
  )
}

export default Sidebar