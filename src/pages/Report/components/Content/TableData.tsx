import React, { Fragment, useEffect, useState } from 'react'
import { useAppSelector } from 'app/store/hooks';
import { styleMui } from 'components/common/styleMui';
import { DataGrid, GridColDef,GridToolbarContainer,GridToolbar,GridCellParams,GridToolbarExport,GridToolbarColumnsButton,GridToolbarFilterButton,GridToolbarDensitySelector} from '@mui/x-data-grid';


// const nameTV = [
//   {
    
//     key_code: "id",
//     value_code: "STT"
//   },
//   {
    
//     key_code: "profit",
//     value_code: "Lợi Nhuận"
//   },
//   {
   
//     key_code: "net_profit",
//     value_code: "Lợi Nhuận Ròng"
//   },
//   {
    
//     key_code: "gross_profit",
//     value_code: "Lợi Nhuận Gộp"
//   },
//   {
   
//     key_code: "total_including_tax",
//     value_code: "Doanh Thu Sau Thuế"
//   },
//   {
   
//     key_code: "total_excluding_tax",
//     value_code: "Doanh Thu Trước Thuế"
//   },
//   {
//     key_code: "departments_name",
//     value_code: "Bộ phận"
//   },
//   {
   
//     key_code: "month_name",
//     value_code: "Tháng"
//   },
//   {
   
//     key_code: "year",
//     value_code: "Năm"
//   },
//   {
   
//     key_code: "time",
//     value_code: "Thời Gian"
//   },
//   {
//     key_code: "total",
//     value_code: "Tổng"
//   }
  
// ]

const TableData = () => {

  var regex = new RegExp('^[0-9]*$')
  const columns: GridColDef[] = [];
  const rows:any =[];
 
  const listChange:any =[]
  const classes = styleMui();

  const onTable = useAppSelector(state=> state.onTable) 
  const listValueField = useAppSelector(state=> state.tableData) 
  const listTable = useAppSelector(state => state.table)

  const [on, setOn] = useState(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const [total, setTotal] = useState(0);
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
        value_code: "Thời Gian",
        table_name: "Thêm",
      },{
        key_code: "YEAR",
        value_code: "Năm",
        table_name: "Thêm",
      }
  ];
  useEffect(()=> setOn(onTable.onTable),[onTable])

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 1
  });
  if(listValueField.listData.length !== 0){
    let nameField =Object.keys(listValueField.listData[0])
    if(nameField.includes('MONTH') && nameField.includes('YEAR') )
    {
      listValueField.listData.map((valueField:any, index:number)=> {
        let year =valueField["YEAR"]
        let month = valueField["MONTH"]
        let coppy ={...valueField}
        coppy.DATE = `${month}/ ${year}`
        coppy.total = ""
        delete coppy["YEAR"]
        delete coppy["MONTH"]
        listChange.push(coppy)      
    })
    } else  if(nameField.includes('MONTH') ==false && nameField.includes('YEAR') )
    {
      listValueField.listData.map((valueField:any, index:number)=> {
        let year =valueField["YEAR"]
        let coppy ={...valueField}
        coppy.DATE = `Năm ${year}`
        coppy.total = ""
        delete coppy["YEAR"]
        listChange.push(coppy)      
    })
    }else if(nameField.includes('MONTH') ==false && nameField.includes('YEAR') ==false){
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
    if(regex.test(value.value)) {
      return  formatter.format(value.value)
    }
  }
  // const getRowIndex = React.useCallback<GridSortApi['getRowIndex']>(
  //   (id:any) => apiRef.current.getSortedRowIds().indexOf(id),
  //   [apiRef],
  // );

  
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
              columns.push({ field: nameField, headerName: nameTV[z].value_code,minWidth:130, width:220,renderCell:(params: GridCellParams) =>converNumber(params), type: "number",align:'center'} )
             } else if(nameTV[z].key_code ==`${nameField}` && nameField ==="id") {
              columns.push( {field: 'stt',headerName: 'STT',width: 10,valueGetter: getIndex, sortable: false})
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
            
            //  if(typeof(sum) === NaN){
            //   sum = 0
            //  }else {
            //   sum = sum
            //  }
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
                        Data List
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