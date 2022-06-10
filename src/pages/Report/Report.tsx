import { Table } from '@mui/material'
import React from 'react'
import Sidebar from './components/Sidebar'
import './assets/report.scss'

const Report = () => {
  return (
    <div>
          <Sidebar></Sidebar>
          <div className='main__content'>
                {/* <Menu></Menu> */}
                 {/* <Chart></Chart> */}
                 {/* <Table></Table> */}
                  {/* <Apply></Apply> */}
          </div>
    </div>
  )
}

export default Report