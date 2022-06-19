import React from 'react'

import { DataGrid, GridColDef, GridToolbarExport,GridToolbarContainer,GridToolbar } from '@mui/x-data-grid';

import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { styleMui } from 'components/common/styleMui';

const TableData = () => {
  const classes = styleMui();
  
  const columns: GridColDef[] = [];
  const rows:any =[];
  const listValueField = useAppSelector(state=> state.listValue) 

  const colums =()=>{
    if(listValueField.listValueField.length !== 0){
      let nameField =Object.keys(listValueField.listValueField[0])
      nameField.map((nameField:string)=> {
        columns.push({ field: nameField, headerName: nameField, width: 200 })
      })
    }
  }

  const row = ()=>{
    if(listValueField.listValueField.length !== 0){
      listValueField.listValueField.map((valueField:any, index:number)=> {
        const newObj ={...valueField}
     
        newObj.id= index
        rows.push(newObj)

      })
    }
  }
  colums();         
  row();  
         
  return (
    <div className='content__table'>
   <div className='table'>
    <DataGrid 
        rowHeight={29}
        className={classes.root}
        rows={rows}

        columns={columns}
        components={{ Toolbar: GridToolbar }}
      /> 
      </div>
     </div>
   
  )
}

export default TableData