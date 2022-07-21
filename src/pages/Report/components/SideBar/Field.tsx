import React,{ useEffect, useState } from 'react'


const Field = (props :{ key:number, nameField: string, keyField:string, drop ?: boolean }) => { 
  const [isCheck, setCheck] = useState(false);
  return (
       <li>
           <button className="name__field" onClick={()=>setCheck(!isCheck)}>
           <input  type="checkbox" name='checkbox' value={props.keyField} checked={isCheck} onChange={()=>{}}  />
           <label >{props.nameField}</label>
          </button>
       </li>

  )
}

export default Field