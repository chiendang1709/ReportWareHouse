import { createStyles, makeStyles } from '@mui/styles';
import { height } from '@mui/system';


 export  const styleMui = makeStyles((theme) => ({
   
  root: {
    ' .MuiDataGrid-columnsContainer' :{
      position:  'relative !important',
      backgroundColor: 'rgba(255, 0, 100, 0.20)',
       
     },
    '& .MuiDataGrid-virtualScrollerContent': {
      boxSizing: 'content-box',
     
    },
    '& .MuiDataGrid-virtualScrollerRenderZone':{
      width:'100% !important'
    },
    '&.MuiDataGrid-root .MuiDataGrid-row': {
      backgroundColor: 'white',
      borderRadius: '2px',
      width:'100% !important',
      fontSize: '12px',
      

    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaders': {
      border: 0,
      backgroundColor: 'rgba(242,160,61, 0.5)',
      maxheight: '30px !important'
    },   
    
    '& .MuiDataGrid-cell .MuiDataGrid-cell--textLeft': {
      
      whiteSpace: 'normal',
    },
    
    '& .MuiDataGrid-row': {
      fontSize: '12px',
    },
    '& .MuiDataGrid-cell' :{
      width: '100%',
    },
    '& .MuiDataGrid-footerContainer':{
      margin : '0 0 5px 0',
     
    },
    '& .MuiDataGrid-panelWrapper': {
      width:'30px !important'
    }
  },
  }));
 

 

  
