import React,{ useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'

const Field = (props :{submenu: Boolean, nameField: string, handleClick:any }) => { //
  
  const isCheck =(e: string)=>
  {
    props.handleClick(e)
  }
 
  return (
    <ul className={`content__field .content__submenu ${props.submenu ? "show" : " "}`}  >
       <li>
           <input  type="checkbox" value={props.nameField} onChange={(e)=>isCheck(e.target.value)} />
           <label className='nameField'>
            {props.nameField}
            </label>
       </li>
    </ul>
  )
}

export default Field