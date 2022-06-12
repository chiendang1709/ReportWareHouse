import React, { useEffect, useRef, useState } from 'react'
 import Table from './Table'

const MenuItems = () => {
  const [dropright, setDropright] = useState(false);

  let ref = React.useRef<HTMLLIElement>(null)

  // useEffect(() => {
  //   const handler = (event: TouchEvent | MouseEvent) => {
  //     if (dropright && ref.current && !ref.current.contains(event.target as HTMLLIElement)){
  //       setDropright(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler );
  //   document.addEventListener("touchstart", handler );
  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", handler );
  //     document.removeEventListener("touchstart", handler );
  //   };
  // }, [dropright]);

  const onMouseEnter = () => {
    window.innerWidth > 200 && setDropright(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 200 && setDropright(false);
  };

  // onMouseEnter={onMouseEnter}
  // onMouseLeave={onMouseLeave}
  return (
    <li className='content__item' 
          ref={ref}  
         >
            <button 
              className='content__btn' 
              aria-expanded={dropright ? "true" : "false"}
              onClick={()=> setDropright((prev) => !prev)}>
              Kinh doanh 
            </button>
          <Table       
           dropright ={dropright}      
          /> 
    </li>
    
    
  )
}

export default MenuItems