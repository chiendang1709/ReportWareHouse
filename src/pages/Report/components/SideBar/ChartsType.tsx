import { useAppDispatch } from 'app/store/hooks'

import { getTypeChart } from 'pages/Report/changeChart'
import React, { useState } from 'react'


import bar from 'assets/images/bar__icon.png'
import line from 'assets/images/line__icon.png'
import pie from 'assets/images/pie__icon.png'
import bar2 from 'assets/images/bar__icon__2.png'
import line2 from 'assets/images/line__icon__2.png'
import pie2 from 'assets/images/pie__icon__2.png'



 
 const ChartsType = () => {
     const [iconbar, setIconBar] = useState(bar)
     const [iconline, setIconLine] = useState(line)
     const [iconpie, setIconPie] = useState(pie)   

     const dispatch = useAppDispatch()
 
     return (
        <div className='sidebar__chart'>
         
             <button onMouseEnter={()=>setIconBar(bar2)} 
                        onMouseLeave={()=>setIconBar(bar)} 
                        onClick={()=>dispatch(getTypeChart('bar'))}>
                        <img src={iconbar} title="choose bar chart"  alt="bar" />
             </button>
             <button 
                        onMouseEnter={()=>setIconPie(pie2)}  
                        onMouseLeave={()=>setIconPie(pie)} 
                        onClick={()=>dispatch(getTypeChart('pie'))}>
                    <img   src={iconpie} title="choose pie chart" alt="pie" />        
            </button>
            <button 
                        onMouseEnter={()=>setIconLine(line2)}  
                        onMouseLeave={()=>setIconLine(line)}                      
                        onClick={()=>dispatch(getTypeChart('line'))}>
                    <img   src={iconline} title="choose line chart" alt="line" />  
            </button>
        </div>
   )
 }
 
 export default ChartsType