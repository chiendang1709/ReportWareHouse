import React,{ useEffect, useState } from 'react'


const Field = (props :{ key:number, nameField: string, keyField:string, drop ?: boolean }) => { 
  return (
       <li>
           <button className="name__field">
             
                <input  type="checkbox" name='checkbox' value={props.keyField}  />
                  <label >
                       {props.nameField}
                 </label>
          </button>
       </li>

  )
}

export default Field