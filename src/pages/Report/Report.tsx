import { Table } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from './components/SideBar/Sidebar'
import './assets/report.scss'
import Chart from './components/Content/Charts'
import TableData from './components/Content/TableData'
import Header from './components/Content/Header'
import {ChartType} from 'chart.js';

const Report = () => {
 
  return (
    <div>
          <Sidebar></Sidebar>
          <div className='main__content'>
              <Header></Header>
              <Chart ></Chart>
              <TableData></TableData>
          </div>
    </div>
  )
}

export default Report