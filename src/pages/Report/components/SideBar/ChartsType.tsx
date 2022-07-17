import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { getTypeChart } from 'pages/Report/slice/changeChart'
import { getOnChart } from 'pages/Report/slice/onChart'

import bar from 'assets/images/bar__icon.png'
import line from 'assets/images/line__icon.png'
import pie from 'assets/images/pie__icon.png'




 const ChartsType = () => {
  
     const typeCharts = useAppSelector(state => state.typeChart)
     const onChart = useAppSelector(state=> state.onChart) 
     const dispatch = useAppDispatch()

     return (
        <div className='sidebar__chart'>
       
<<<<<<< HEAD
             <button className={`char_button ${ typeCharts.typeChart=='bar' ? 'active__chart' : ''}`} 

                        onClick={()=>{dispatch(getTypeChart('bar')) }}>
                        <img src={bar} title="choose bar chart"  alt="bar" />
                        
             </button>
             <button className={` char_button ${ typeCharts.typeChart=='pie' ? 'active__chart' : ''}`}
                    
                        onClick={()=>{dispatch(getTypeChart('pie'))}}>
=======
             <button className={`char_button ${onChart.onChart==true && typeCharts.typeChart=='bar' ? 'active__chart' : ''}`} 

                        onClick={()=>{dispatch(getTypeChart('bar')); dispatch(getOnChart(true)); }}>
                        <img src={bar} title="choose bar chart"  alt="bar" />
                        
             </button>
             <button className={` char_button ${onChart.onChart==true && typeCharts.typeChart=='pie' ? 'active__chart' : ''}`}
                    
                        onClick={()=>{dispatch(getTypeChart('pie')); dispatch(getOnChart(true));}}>
>>>>>>> fc20cb84a7d29d9f5b8ba9c5ad64b5caa78e9808
                        <img src={pie} title="choose pie chart"  alt="pie" />
                            
                        
            </button>
<<<<<<< HEAD
            <button   className={` char_button ${ typeCharts.typeChart=='line' ? 'active__chart' : ''}`}
                                          
                        onClick={()=>{dispatch(getTypeChart('line'))}}>
=======
            <button   className={` char_button ${onChart.onChart==true && typeCharts.typeChart=='line' ? 'active__chart' : ''}`}
                                          
                        onClick={()=>{dispatch(getTypeChart('line')); dispatch(getOnChart(true));}}>
>>>>>>> fc20cb84a7d29d9f5b8ba9c5ad64b5caa78e9808
                   
                            <img src={line} title="choose line chart"  alt="line" />
                           
                              
            </button>
        </div>
   )
 }
 
 export default ChartsType