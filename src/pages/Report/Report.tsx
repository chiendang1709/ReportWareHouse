import { Table } from '@mui/material'
import React, { Fragment, useState } from 'react'
import Sidebar from './components/SideBar/Sidebar'
import './assets/report.scss'
import Chart from './components/Content/Charts'
import TableData from './components/Content/TableData'
import Header from './components/Content/Header'
import {ChartType} from 'chart.js';

const Report = () => {
 
  return (
   <Fragment>
            <Sidebar></Sidebar>
            <div className='main__content'>
                <Header></Header>
                <Chart ></Chart>
                <TableData></TableData>
            </div>
  </Fragment>
  )
}

export default Report