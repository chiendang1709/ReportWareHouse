import React, { useEffect, useRef, useState }  from 'react'
import Field from './Field'

const Table = ( props :{dropright: Boolean}) => {
  const [submenu, setSubmenu] = useState(false);

  let ref = React.useRef<HTMLLIElement>(null)

  // useEffect(() => {
  //   const handler = (event: TouchEvent | MouseEvent) => {
  //     if (submenu && ref.current && !ref.current.contains(event.target as HTMLLIElement)){
  //       setSubmenu(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler );
  //   document.addEventListener("touchstart", handler );
  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", handler );
  //     document.removeEventListener("touchstart", handler );
  //   };
  // }, [submenu]);
  const onMouseEnter = () => {
    window.innerWidth > 960 && setSubmenu(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setSubmenu(false);
  };
  // onMouseEnter={onMouseEnter}
  // onMouseLeave={onMouseLeave}
  return (
        <ul className={`content__table content__submenu
             ${props.dropright ? "show" : " "}`}>
            <li ref={ref}           
              >
                <button className='content__btn submenu__btn' 
                 type="button"
                 aria-haspopup="menu"
                 aria-expanded={submenu ? "true" : "false"}
                  onClick={()=> setSubmenu((prev) => !prev)}>
                    Bảng Doanh thu  
                </button>
                <Field   
                id={1}         
                submenu={submenu}
                />
            </li>   
            <li ref={ref} 
              >
                <button className='content__btn submenu__btn'   type="button"
                 aria-haspopup="menu"  aria-expanded={submenu ? "true" : "false"}
                  onClick={()=> setSubmenu((prev) => !prev)}>
                     {/* dữ liệu bảng */}
                    Bảng Doanh thu  
                </button>
                <Field  
                id={2}          
                submenu={submenu}
                />
            </li> 
         
        </ul>
  )
}

export default Table