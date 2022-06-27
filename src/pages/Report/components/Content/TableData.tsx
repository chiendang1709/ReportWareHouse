import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef,GridToolbarContainer,GridToolbar,GridCellParams} from '@mui/x-data-grid';

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
    key_code: "departments_name",
    value_code: "Bộ phận"
  }
]

const TableData = () => {

  var regex = new RegExp('^[0-9]*$')
  const columns: GridColDef[] = [];
  const rows:any =[];
  const classes = styleMui();

  const [on, setOn] = useState(false);

 
  const onTable = useAppSelector(state=> state.onTable) 
  const listValueField = useAppSelector(state=> state.tableData) 
  const listTable = useAppSelector(state => state.table)
   
  useEffect(()=> setOn(onTable.onTable),[onTable])

  function currencyFormatter(cur:string){

    if(regex.test(cur)){
      let sansDec = Number(cur).toFixed(0);
      let formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g,',');
       return `${formatted}`;
    } else {
      return cur
    }
   
  }
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0
  });
  const colums =()=>{
    if(listValueField.listData.length !== 0){
      let nameField =Object.keys(listValueField.listData[0])

      nameField.map((nameField:string)=> {
        for(let z = 0;z<nameTV.length; z++){
          if(nameTV[z].key_code ==`${nameField}` && nameField !=="year" && nameField !=="month_name" && nameField !=="departments_name"  ){
           columns.push({ field: nameField, headerName: nameTV[z].value_code, width: 180,renderCell: (params: GridCellParams) => formatter.format(params.value), type: "number"} )
          } else if(nameTV[z].key_code ==`${nameField}` && nameField ==="year" || nameTV[z].key_code ==`${nameField}` && nameField ==="month_name" || nameTV[z].key_code ==`${nameField}` && nameField ==="departments_name") {
           columns.push({ field: nameField, headerName: nameTV[z].value_code, width: 100,type: "number"} )  
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