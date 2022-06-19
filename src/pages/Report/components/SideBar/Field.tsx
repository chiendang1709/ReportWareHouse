import React,{ useEffect, useState } from 'react'

const Field = (props :{ nameField: string, handleClick:any }) => { //
  
  const isCheck =(e: string)=>
  {
    props.handleClick(e)
  }
 
  return (
   
       <li>
           <input  type="checkbox" value={props.nameField} onChange={(e)=>isCheck(e.target.value)} />
           <label className='nameField'>
            {props.nameField}
            </label>
       </li>

  )
}

export default Field