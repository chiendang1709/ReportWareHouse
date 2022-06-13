import React, { useEffect, useRef, useState }  from 'react'
import Field from './Field'



const Table = ( props :{ listTable: any; name:string}) => {
  const [submenu, setSubmenu] = useState(false);
  let ref = React.useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (submenu && ref.current && !ref.current.contains(event.target as HTMLLIElement)){
        setSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handler );
    document.addEventListener("touchstart", handler );
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler );
      document.removeEventListener("touchstart", handler );
    };
  }, [submenu]);
  
  const onMouseEnter = () => {
    window.innerWidth > 200 && setSubmenu(true);
  };
  const onMouseLeave = () => {
    window.innerWidth > 200  && setSubmenu(false);
  };
 
  

  return (
      
            <li ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                <button className='content__btn submenu__btn' 
                 type="button" aria-haspopup="menu" aria-expanded={submenu ? "true" : "false"}
                  onClick={()=> setSubmenu((prev) => !prev)}>
                   {props.name}
                </button>
                <Field  submenu={submenu} listField={"hello"}/>
            </li>   

         
       
  )
}

export default Table