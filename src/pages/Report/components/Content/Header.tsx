import React, { useState } from 'react'
import burger from 'assets/images/burger__icon.png'
import tool from 'assets/images/tool__icon.png'
import Tools from './Tools';
import {getOnSidebar} from 'pages/Report/slice/onSidebar'
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
const Header = () => {

    const [Tool, setTool] = useState(false);  
    const dispatch = useAppDispatch()
    const onSidebar = useAppSelector( state=>state.onSidebar)
  return (
    <div className='header'>
        <nav className="header__navbar">
            <button className="sidebar__button"aria-expanded={onSidebar.onSidebar ? "true" : "false"} onClick={()=>dispatch(getOnSidebar())} > 
                <img src={burger} alt="burger__icon" title="burger icon"/>
            </button>
            <button className={`tool__button  ${Tool ? " tool__active" : ""} `} onClick={()=>{setTool((prev) => !prev)}}> 
                <p>Công Cụ</p> 
                <img src={tool} alt="tool__icon" title="tool icon"/>
            </button>
        </nav>
        <div className={`tool__content  ${Tool ? " tool--active" : ""}` }>
             <Tools></Tools>
        </div>
    </div>
  )
}

export default Header