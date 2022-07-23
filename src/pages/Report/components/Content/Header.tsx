import React, { useState } from 'react'
import burger from 'assets/images/burger__icon.png'
import tool from 'assets/images/tool__icon.png'
import Tools from './Tools';
import { Class } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
const Header = () => {
    const [Tool, setTool] = useState(false);  
  return (
    <div className='header'>
        <nav className="header__navbar">
            <button className="sidebar__button">
                <img src={burger} alt="burger__icon" title="burger icon"/>
            </button>
            <button className="tool__button" onClick={()=>{setTool((prev) => !prev)}}> 
                <p>Tool</p> 
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