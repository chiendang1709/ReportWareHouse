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
           <button className={`name__field ${child ? 'active' : "" }`} onClick={()=> setChildmenu((prev) => !prev)}>
               {/* id truyen vao o name */}
                <input name='' type="checkbox" value='' onChange={(e)=>isCheck(e.target.value)} />
                  <label >
                       {/* truyen du lieu thang cha o day */}
                        name
                 </label>
          </button>
                    <ul className={`${child ? 'show' : '' }`}>
                       {/* chay vong lap o day */}
                        <li>
                            {/* id truyen vao o name */}
                          <input name='' type="checkbox" value='' onChange={(e)=>isCheck(e.target.value)} />
                          <label className='name__field child--field'>
                                  {/* truyen du lieu vao day */}
                                  name
                          </label>
                        </li>
                        <li>
                          <input name={`${props.id}`} type="checkbox" value='' onChange={(e)=>isCheck(e.target.value)} />
                          <label className='name__field  child--field'>
                                    2
                          </label>
                        </li>
                        <li>
                          <input name={`${props.id}`} type="checkbox" value='' onChange={(e)=>isCheck(e.target.value)} />
                          <label className='name__field  child--field'>
                                    3
                          </label>
                        </li>

                    </ul>
           
       </li>

  )
}

export default Field