import React, { useContext, useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { createTheme, ThemeProvider } from "@material-ui/core";
import { InventoryContext } from "../../inventory/context";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { SalesInvoicePdf } from "../../inventory/checkout";
import ClearIcon from '@material-ui/icons/Clear';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { makeStyles } from '@material-ui/core/styles';
import { getAllInvoice } from "./services";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.addVirtualFileSystem(pdfFonts);
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version
    }/pdf.worker.js`;

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    textField: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      margin: theme.spacing(1, 0.5, 1.5),
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
      },
      '& .MuiInput-underline:before': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  }),
);




function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="medium" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="medium" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}


export default function EnhancedTable() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');
  const [invoice, setInvoice] = useState([]);

  useEffect(async ()=>{
    const res =await getAllInvoice();
    setInvoice(res)
  },[])

  var columns = [
    { field: "customer_name", flex:1, headerName: "Customer"},
    { field: "paid_amount",flex:1, type: "number", padding:"left", headerName: "Paid Amount"},
    { field: "payment_method", flex:1,headerName: "Payment Method"},
    { field: "created_at", flex:1.5,type: "date", headerName: "Date"},
  ]
  const theme = createTheme();

  columns.forEach((c) => {
    c.renderCell = (params) => {
      return (
        <ThemeProvider theme={theme}>
          <Typography variant="body1" >{params.value}</Typography>
        </ThemeProvider>
      )
    }
    c.renderHeader = () => {
      return <Typography variant="body1" >{c.headerName}</Typography>
    }
    c.headerAlign='center'
  })
    //Pdf stuff
    const [pageSize, setPageSize] = useState(0);
    const [file, setFile] = useState(undefined);
    const [openInvoice, setOpenInvoice] = useState(false);
    function handleOpenInvoice() {
        setOpenInvoice(!openInvoice);
    }

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleClose = () => {
    setOpen(!open);
  }

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = invoice.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setData(filteredRows);
  };

  const [searchText, setSearchText] = React.useState('');
  const { getDocumentDefination,getDocumentById } = useContext(InventoryContext);


  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid autoHeight 

        components={{ Toolbar: QuickSearchToolbar }}
        onRowDoubleClick={async(s) => {
          const d = await getDocumentById(s.id);
          const len = (await pdfMake.createPdf(d).getStream())._pdfMakePages.length;
          setPageSize(len);
          const pdf = pdfMake.createPdf(d);
          setFile(pdf);
          handleOpenInvoice()
        }} rows={invoice} columns={columns}
        getRowId={(row)=>{
            return row._id;
          }
        }
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
      />
      <SalesInvoicePdf pageSize={pageSize} file={file} open={openInvoice} handleOpen={handleOpenInvoice} />
    </div>
  );
}
