import React,{ useEffect, useState } from 'react'



//nameField: string,
const Field = (props :{ handleClick:any, id:number }) => { 
  
const [child, setChildmenu] = useState(false);

  
  const isCheck =(e: string)=>
  {
    props.handleClick(e)
  }
 
  return (
   // value:{props.nameField} name: ${props.id} bien neu con xai
       <li>
           <button className= "name__field" onClick={()=> setChildmenu((prev) => !prev)}>
               {/* id truyen vao o name */}
                <input name='' type="checkbox" value='' onChange={(e)=>isCheck(e.target.value)} />
                  <label >
                       {/* truyen du lieu thang cha o day */}
                        name
                 </label>
          </button>
                   
           
       </li>

  )
}

export default Field