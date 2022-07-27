import React, { Fragment, useEffect, useState } from 'react'
import { useAppSelector } from 'app/store/hooks';
import { styleMui } from 'components/common/styleMui';
import { DataGrid, GridColDef,GridToolbarContainer,GridToolbar,GridCellParams,GridToolbarExport,GridToolbarColumnsButton,GridToolbarFilterButton,GridToolbarDensitySelector} from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';



const TableData = () => {

  var regex = new RegExp('^[0-9]*$')
  const columns: GridColDef[] = [];
  const rows:any =[];
 
  const listChange:any =[]
  const classes = styleMui();

  const listValueField = useAppSelector(state=> state.tableData) 
  const listTable = useAppSelector(state => state.table)
  const dateFilters = useAppSelector(state => state.datefilter)
  const dateFilter = dateFilters.datefilter
  const [pageSize, setPageSize] = useState<number>(5);
  
  const nameTV= [...listTable.listTable
    ,{
        key_code: "total",
         value_code: "Tổng",
         table_name: "Thêm",
      },
      {
        key_code: "id",
        value_code: "ID",
        table_name: "Thêm",
      },
      {
        key_code: "MONTH",
        value_code: "Tháng",
        table_name: "Thêm",
      },
      {
        key_code: "DATE",
        value_code: "Khoảng Thời Gian",
        table_name: "Thêm",
      },{
        key_code: "YEAR",
        value_code: "Năm",
        table_name: "Thêm",
      },
      {
        key_code: "dept_code",
        value_code: "Mã Bộ Phận",
        table_name: "Thêm",
      },
      {
        key_code: "emp_code",
        value_code: "Mã Nhân Viên",
        table_name: "Thêm",
      },
      {
        key_code: "cus_code",
        value_code: "Mã Khách Hàng",
        table_name: "Thêm",
      }
  ];

  

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0
  });

  if(listValueField.listData.length !== 0){
    let nameField =Object.keys(listValueField.listData[0])
    if(nameField.includes(`${dateFilter}_month`) && nameField.includes(`${dateFilter}_year`) )
    {
      listValueField.listData.map((valueField:any, index:number)=> {
        let year =valueField[`${dateFilter}_year`]
        let month = valueField[`${dateFilter}_month`]
        let coppy ={...valueField}
        coppy.DATE = `${month}/${year}`
        coppy.total = ""
        delete coppy[`${dateFilter}_year`]
        delete coppy[`${dateFilter}_month`]
        listChange.push(coppy)      
    })
    } else  if(nameField.includes(`${dateFilter}_month`) ==false && nameField.includes(`${dateFilter}_year`) )
    {
      listValueField.listData.map((valueField:any, index:number)=> {
        let year =valueField[`${dateFilter}_year`]
        let coppy ={...valueField}
        coppy.DATE = `Năm ${year}`
        coppy.total = ""
        delete coppy[`${dateFilter}_year`]
        listChange.push(coppy)      
    })
    }else if(nameField.includes(`${dateFilter}_month`) ==false && nameField.includes(`${dateFilter}_year`) ==false){
      listValueField.listData.map((valueField:any, index:number)=> {
        let coppy ={...valueField}
        coppy.total = ""
        listChange.push(coppy)    
    })
  }}
  if(listChange.length !=0){
    for(let i =0; i < listChange.length; i++){
      let total : number =0
      let array :string[] = Object.values(listChange[i])
         array.map((value:string)=> {
          if(regex.test(value)){
              total += Number(value)      
          }
         })
      listChange[i].total = total   
      }
  }
  const converNumber = (value: GridCellParams)=>{
    if(regex.test(value.value) && value.value !== "") {
      return  formatter.format(value.value)
    } else if(value.value === ""){
      return "-"
    }else if(regex.test(value.value)== false && value.value !== ""){
      return value.value
    }
  }


  
  //add STT
  function getIndex(params:any) {

    if(params.row.stt){
      return params.row.stt
    }else {
      return  params.api.getRowIndex (params.row.id)
    }
    
    
  }
 

  const colums =()=>{
    if(listChange.length !== 0){
      let nameField =Object.keys(listChange[0])
        nameField.unshift("id")
       
        nameField.map((nameField:string)=> {
          for(let z = 0;z<nameTV.length; z++){
            if(nameTV[z].key_code ==`${nameField}` && nameField !=="id"){
              columns.push({ field: nameField, headerName: nameTV[z].value_code,minWidth:130, width:220,renderCell:(params: GridCellParams) => (
                <Tooltip title={params.value} >
                 <span className="table-cell-trucate">{converNumber(params)}</span>
                 </Tooltip>
               ), align:'center', sortable: false} )
             } else if(nameTV[z].key_code ==`${nameField}` && nameField ==="id") {
              columns.push( {field: 'stt',headerName: 'STT',width: 10,valueGetter: getIndex, sortable: false,type: "number"})
             }   
        }    
       })
    }
   
  }
 
  
  const addTotal = ()=> {
    if(listChange.length !== 0){
    let nameField =Object.keys(listChange[0])
    let field: any ={stt:"Total"}
    for(let i =0; i<nameField.length; i++){
      let sum: number= 0
        for(let j=0; j< listChange.length;j++ ){
             sum = sum + Number(listChange[j][nameField[i]])
        }
        if(String(sum) == "NaN"){
          field[nameField[i]]= "-"
        } else {
          field[nameField[i]]= sum
        }     
    }
    listChange.unshift(field)
    
    }
   }
   addTotal();

  const row = ()=>{
    
    if(listChange.length !== 0){
      let y =0
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
                        Bảng Dữ Liệu
                  </div>
              </div>
              <div className='table__item'>
                  <DataGrid            
                  autoHeight
                  rowHeight={29}      
                  className={classes.root}
                  rows={ rows}          
                  columns={columns}
                  components={{ Toolbar: MyExportButton}}  
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}                 
                  pagination
                />   
              </div>
        
      </div>  
      
    </div>
  
   
  )
}

export default TableData