import React from 'react'

const Field = (props :{submenu: Boolean, listField: any}) => {
  
  return (
    <ul className={`content__field .content__submenu ${props.submenu ? "show" : " "}`}>
       <li>
          {/* dữ liệu cột */}
            maHD
        </li>
        <li>
            luong
        </li> 
    </ul>
  )
}

export default Field