import React, { useEffect, useState } from 'react'

import { DataGrid, GridColDef, GridToolbarExport,GridToolbarContainer,GridToolbar, GridColTypeDef  } from '@mui/x-data-grid';


import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { styleMui } from 'components/common/styleMui';


const TableData = () => {

  const columns: GridColDef[] = [];
  const rows:any =[];
  const classes = styleMui();

  const [on, setOn] = useState(false);

 
  const onTable = useAppSelector(state=> state.onTable) 
  const listValueField = useAppSelector(state=> state.tableData) 
  const listTable = useAppSelector(state => state.table)
  

  useEffect(()=> setOn(onTable.onTable),[onTable])

  function currencyFormatter(cur:number){
    let sansDec = cur.toFixed(0);
    let formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g,',');
    return `${formatted}`;
  }
 
  const colums =()=>{
    if(listValueField.listData.length !== 0){
      let nameField =Object.keys(listValueField.listData[0])
      nameField.map((nameField:string)=> {
        for(let z = 0;z<listTable.listTable.length; z++){
          if(listTable.listTable[z].key_code ==`${nameField}`){
        columns.push({ field: nameField, headerName: listTable.listTable[z].value_code, width: 200, valueFormatter: ({ value }) => currencyFormatter(Number(value))} )
          }
      }})
    }
   
  }
  
  const row = ()=>{
    if(listValueField.listData.length !== 0){
      listValueField.listData.map((valueField:any, index:number)=> {
  
        const newObj ={...valueField}
        newObj.id= index
        rows.push(newObj)
      })
    }
  }
  colums();           
  row();  
   
  
  function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbar
        csvOptions={{
          fileName: 'customerDataBase',
          delimiter: ';',
          utf8WithBom: true,
        }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <div className='content__table'>
   <div className='table'>
      {on?
         ( <DataGrid 
              rowHeight={29}
              className={classes.root}
              rows={ rows}          
              columns={columns}
              components={{ Toolbar: MyExportButton }}
              
            />
             
            
         )
        :<h1> choose your data</h1>
        }   
     </div>
     </div>
   
  )
}

export default TableData