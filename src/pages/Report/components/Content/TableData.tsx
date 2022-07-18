import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef,GridToolbarContainer,GridToolbar,GridCellParams,GridToolbarExport,GridToolbarColumnsButton,GridToolbarFilterButton,GridToolbarDensitySelector} from '@mui/x-data-grid';

import { useAppSelector } from 'app/store/hooks';
import { styleMui } from 'components/common/styleMui';

const nameTV = [
  {
    
    key_code: "profit",
    value_code: "Lợi Nhuận"
  },
  {
   
    key_code: "net_profit",
    value_code: "Lợi Nhuận Ròng"
  },
  {
    
    key_code: "gross_profit",
    value_code: "Lợi Nhuận Gộp"
  },
  {
   
    key_code: "total_including_tax",
    value_code: "Doanh Thu Sau Thuế"
  },
  {
   
    key_code: "month_name",
    value_code: "Tháng"
  },
  {
   
    key_code: "year",
    value_code: "Năm"
  },
  {
   
    key_code: "time",
    value_code: "Thời Gian"
  },
  {
    key_code: "departments_name",
    value_code: "Bộ phận"
  },
  {
   
    key_code: "total_excluding_tax",
    value_code: "Doanh Thu Trước Thuế"
  }
]

const TableData = () => {

  var regex = new RegExp('^[0-9]*$')
  const columns: GridColDef[] = [];
  const rows:any =[];
  const listChange:any =[]
  const classes = styleMui();

  const [on, setOn] = useState(false);
  const [pageSize, setPageSize] = useState<number>(5);
 
  const onTable = useAppSelector(state=> state.onTable) 
  const listValueField = useAppSelector(state=> state.tableData) 
  const listTable = useAppSelector(state => state.table)
   
  useEffect(()=> setOn(onTable.onTable),[onTable])

  if(listValueField.listData.length !== 0){
    let nameField =Object.keys(listValueField.listData[0])
    if(nameField.includes('month_name') && nameField.includes('year') )
    {
      listValueField.listData.map((valueField:any, index:number)=> {
        let year =valueField["year"]
        let month = valueField["month_name"]
        let coppy ={...valueField}
        coppy.time = `${month}/ ${year}`
        delete coppy["year"]
        delete coppy["month_name"]
        listChange.push(coppy)      
    })
    } else  if(nameField.includes('month_name') ==false && nameField.includes('year') )
    {
      listValueField.listData.map((valueField:any, index:number)=> {
        let year =valueField["year"]
        let coppy ={...valueField}
        coppy.time = `${year}`
        delete coppy["year"]
        listChange.push(coppy)      
    })
    }else if(nameField.includes('month_name') ==false && nameField.includes('year') ==false){
      listValueField.listData.map((valueField:any, index:number)=> {
        listChange.push(valueField)    
    })
  }}


  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 3
  });
  const colums =()=>{
    if(listChange.length !== 0){
      let nameField =Object.keys(listChange[0])

      nameField.map((nameField:string)=> {
        if(nameField =="departments_name"){
          for(let z = 0;z<nameTV.length; z++){
            if(nameTV[z].key_code ==`${nameField}`){
              columns.push({ field: nameField, headerName: nameTV[z].value_code, width: 100,type: "number"} )  
            }
        }
        }
       })
       nameField.map((nameField:string)=> {
        if(nameField !=="departments_name"){
          for(let z = 0;z<nameTV.length; z++){
            if(nameTV[z].key_code ==`${nameField}` && nameField !=="time"){
              columns.push({ field: nameField, headerName: nameTV[z].value_code, width: 180,renderCell: (params: GridCellParams) => formatter.format(params.value), type: "number"} )
             } else if(nameTV[z].key_code ==`${nameField}` && nameField ==="time") {
              columns.push({ field: nameField, headerName: nameTV[z].value_code, width: 100,type: "number"} )  
             }
        }
        }
       }) 
    }
   
  }
  
  const row = ()=>{
    if(listChange.length !== 0){
      listChange.map((valueField:any, index:number)=> {
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
      <GridToolbarExport
      csvOptions={{
        utf8WithBom: true,
      }}
      />
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    </GridToolbarContainer>
    );
  }
  return (
    <div className='content__item content__table'>
       <div className='item card table'>
              <div className='header__item'>
                  <div className='title__item'>
                        Data List
                  </div>
                  <div className='button__item'>
                      
                  </div>
              </div>
            <DataGrid            
              autoHeight
              rowHeight={29}
              className={classes.root}
              rows={ rows}          
              columns={columns}
              components={{ Toolbar: MyExportButton }}  
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
            />   
        
      </div>  
    </div>
   
  )
}

export default TableData