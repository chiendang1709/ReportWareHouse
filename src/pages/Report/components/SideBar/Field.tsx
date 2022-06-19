import React from 'react'

const Field = (props :{submenu: Boolean, listField: any, nameField: string, handleClick:any}) => { //
 
  const isCheck =(e: string)=>
  {
    props.handleClick(e)
  }
  return (
    <ul className={`content__field .content__submenu ${props.submenu ? "show" : " "}`}>
       <li>
           <label><input  type="checkbox" value={props.nameField} onChange={(e)=>isCheck(e.target.value)} />{props.nameField}</label>
       </li>
    </ul>
  )
}

export default Field