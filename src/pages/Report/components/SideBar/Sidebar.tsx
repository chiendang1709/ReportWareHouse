
import React from 'react'
import logo from 'assets/images/logo.png'
import icon__cate from 'assets/images/cate__icon.png'
import MenuItem from './MenuItem'
import { doesNotMatch } from 'assert'
const Sidebar = () => {
    
  const Category = [
    {
      id:1,
      title: "kinh doanh",
      table:[
                {
                id: 1,
                title:"Doanh thu"
                },
                {
                    id: 2,
                title:"Tài chính"
                }
            ]    
    },
    {
      id:2,
      title: "kỹ thuật", 
    table: [
                {
                id: 1,
                title:"vật liệu"
                }
            ]    
    },

    {
        id:3,
        title: "Nhân sự",
        table:[
                {
                    id: 1,
                    title:"nhân viên"
                    },
                 {
                    id: 2,
                    title:"lương"
                    }
         ]     
    }
  ]
    
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

                    <ul className="content__type">
                        { Category.map((category) =>
                              <MenuItem key={category.id} id={category.id} title={category.title} table={category.table}/>
                        )}
                     </ul>
            </div>
    </div>
  )
}

export default Sidebar