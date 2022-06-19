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
      textTransform: 'capitalize',
      

    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaders': {
      border: 0,
      backgroundColor: '#ff4500',
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
      display: 'none'
    },
    '& .MuiToolbar-root MuiToolbar-gutters' :{
      maxheight: '30px !important',
      minheight:'30px !important',
    },
    '& .MuiDataGrid-panelWrapper': {
      width:'30px !important'
    }
    
  },
  
  }));
 

 

  
