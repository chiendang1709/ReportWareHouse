import React from 'react'
import { DataGrid, GridColDef, GridToolbarExport,GridToolbarContainer } from '@mui/x-data-grid';

import { styleMui } from 'components/common/styleMui';

const TableData = () => {
  const classes = styleMui();
  const columns: GridColDef[] = [
        { field: 'userId', headerName: 'UserId', width: 100 },
        { field: 'id', headerName: 'id', width: 100 },
        { field: 'title', headerName: 'Title', width: 130 },
      
      ];
  function CustomToolbar() {
          return (
            <GridToolbarContainer>
              <GridToolbarExport />
            </GridToolbarContainer>
          );
        }
 const rows = [
       { userId: 1,id:1, title: 'Snow'},
       { userId: 2,id:2, title: 'Lannister' },
       { userId: 3,id:3, title: 'Lannister'},
       { userId: 4,id:4, title: 'Stark' },
       { userId: 5,id:5, title: 'Targaryen' },
       { userId: 6,id:6, title: 'Melisandre' },
       { userId: 7,id:7, title: 'Clifford' },
       { userId: 8,id:8, title: 'Frances' },
       { userId: 9,id:9, title: 'Roxie' }
     ];
            
            
  return (
    <div className='content__table'>
   <div className='table'>
    <DataGrid 
        className={classes.tableMui}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection 
        // onSelectionModelChange={(ids) => {
        //     const selectedIDs = new Set(ids);
        //     const selectedRowData = rows.filter((arr:any) =>
        //       selectedIDs.has(arr.id)
        //     );
        //     console.log(selectedRowData);
        //   }}
          components={{ Toolbar: CustomToolbar }}
      /> 
      </div>
     </div>
   
  )
}

export default TableData