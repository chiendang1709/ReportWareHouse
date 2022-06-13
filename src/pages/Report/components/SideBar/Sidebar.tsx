
import React from 'react'
import logo from 'assets/images/logo.png'
import icon__cate from 'assets/images/cate__icon.png'
import MenuItem from './MenuItem'
const Sidebar = () => {
  return (
    <div className='sidebar'>

             <div className="sidebar__header">
                <div className="sidebar__logo">
                    <img src={logo} alt="rpwh logo" />
                </div>            
             </div>
             
             <div className="sidebar__header height--small">
                <div className="sidebar__title">
                <img src={icon__cate} alt=" icon category" />    
                    <h3>CATEGORY</h3> 
                </div>
             </div>
              {/* chứa thế loại */}
             <div className="sidebar__content">
                 {/* <div className="content__type">
                     <div className="content__table">
                         <div className="content__fied"></div>
                     </div>
                 </div> */}

                    <ul className="content__type">
                              <MenuItem/>
                     </ul>
            </div>
    </div>
  )
}

export default Sidebar