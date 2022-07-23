import React, { useEffect, useRef, useState } from 'react'
import {toast } from 'react-toastify';

import logo from 'assets/images/logo.png'
import icon__cate from 'assets/images/cate__icon.png'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { listValueFieldAction } from 'pages/Report/slice/valueField';
// import { categoryAction } from 'pages/Report/slice/categorySlice'
import MenuItem from './MenuItem'
import { listCategory } from 'interfaces/components'
import { apply } from 'pages/Report/slice/applySlice'
// import ap from 'assets/images/apply__icon.png'
// import arrow from 'assets/images/arrow__icon.png'
import { error } from 'constant/error';
import loading from 'assets/images/loading.svg'



const Sidebar = () => {
  let arrayCheck: string[]= []
  const listCategory =[
    {
      id: 1,
      reports_category_name: 'kinh doanh',
    },
    {
      id: 2 ,
      reports_category_name: 'nhân sự',
    },
    {
      id: 3 ,
      reports_category_name: 'kỹ thuật',
    },  
  ]

  const dispatch = useAppDispatch()
  const applys = useAppSelector(state => state.clickApply)
  const listValueField = useAppSelector(state=> state.listValue) 
 
  // //getListCategory
  // useEffect(() => {
  //   dispatch(categoryAction.getCategory())
  // }, []);

  //onClick Apply get Check field
  if(applys.apply === 'Apply'){ 
    let checkbox: any = document.getElementsByName('checkbox')  ;
    for (let item of checkbox) {
      if( item.checked == true){
        arrayCheck.push(item.value)
      }
    }
     if(arrayCheck.length ==0){
      dispatch(listValueFieldAction.getlistValueField("")) 
      toast.error(`${error.ERROR_NO_CHECK_FIELD}`);
      dispatch(apply.getApply("null") )  
     } 
  }  

  useEffect(()=>{
    if(arrayCheck.length >0){
      console.log("check", arrayCheck);
      let array =arrayCheck.join(",")
      dispatch(listValueFieldAction.getlistValueField(array)) 
      dispatch(apply.getApply("null") )  
     }
  }, [arrayCheck])


  const categorys = () => {
    let list = listCategory.map((data :listCategory, index:number) => 
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
        
            <div className="sidebar__footer" >
                  <button  onClick={()=>dispatch(apply.getApply("Apply"))}>
                      {/* <img src={ap} alt="apply" title="apply data" /> */}
                      
                      {
                        listValueField.loading ? (<p>Apply</p>): ( <img src={loading} alt="loading" title="loading"/>)
                      }
                     
                  </button>
             </div>


    </div>
  )
}

export default Sidebar