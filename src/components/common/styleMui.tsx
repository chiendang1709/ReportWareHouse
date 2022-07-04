import { createStyles, makeStyles } from '@mui/styles';
import { height } from '@mui/system';


 export  const styleMui = makeStyles((theme) => ({
   
  root: {
    '.css-1r5v9hu-MuiDataGrid-root':{
        height:'100% !important',
        marginTop:'2.5vw',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-cell': {
      "&:focus-within":{
        outline: 'none !impotant',
      },
    
    },
    '.MuiDataGrid-main':{
      borderCollapse: 'collapse',
    },
    ' .MuiDataGrid-columnsContainer' :{
      position:  'relative !important',
      backgroundColor: 'rgba(255, 0, 100, 0.20)',
      
       
     },
    '& .MuiDataGrid-virtualScrollerContent': {
      boxSizing: 'content-box',
     
    },
    '& .MuiDataGrid-virtualScrollerRenderZone':{
       width:'auto !important',
      "&>*:nth-child(even)": {
        backgroundColor: '#dddddd',
      },
    },
    '&.MuiDataGrid-root .MuiDataGrid-row': {
      backgroundColor: 'white',
      borderRadius: '2px',
      width:'auto !important',
      fontSize: '12px',
      textTransform: 'capitalize',
     
      

    },
  
    
    '&.MuiDataGrid-root .css-i4bv87-MuiSvgIcon-root':{
           fill: `#c2c7d0 !important`,

    },
    '&.MuiDataGrid-icon .css-i4bv87-MuiSvgIcon-root':{
      fill: `#c2c7d0 !important`,

},

      '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
      color:`#F4F4F4 !important`,
    },   

    '&.MuiDataGrid-root .MuiDataGrid-columnHeaders': {
      border: 0,
      backgroundColor: '#1582ef',
      maxHeight: '100% !important',
      width:'100%'  ,
      color:`#F4F4F4 !important`,
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
 

 

  
