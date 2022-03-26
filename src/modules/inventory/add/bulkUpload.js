import { Alert } from "@material-ui/lab";
import React, { useContext, useState } from 'react';
import {
  Paper,
  Button,
  Modal
} from '@material-ui/core';
import readXlsxFile from 'read-excel-file';
import { SnackbarProvider, useSnackbar } from 'notistack';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from "@material-ui/core";
import UploadExcel from "./excelUpload";
import { InventoryContext } from "../context";
import MuiAlert from '@material-ui/lab/Alert';



function SnackAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  const columns= [
    { id: "item_name", numeric: false, disablePadding: true, label: "Name" },
    {
      id: "item_price",
      numeric: true,
      disablePadding: false,
      label: "Price (Rs.)",
    },
    { id: "item_code", numeric: true, disablePadding: false, label: "Code" },
    {
      id: "discount",
      numeric: true,
      disablePadding: false,
      label: "Discount (%)",
    },
    { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
    { id: "item_description", numeric: true, disablePadding: false, label: "Description" },
    { id: "vat", numeric: true, disablePadding: false, label: "Vat (%)" },
    { id: "category", numeric: true, disablePadding: false, label: "Category" },
    { id: "brand", numeric: true, disablePadding: false, label: "Brand" },
    { id: "addInfo", numeric: false, disablePadding: false, label: "Additional Info" },
  ];
  

const useStyles = makeStyles((theme) => ({
    root: {
      flexorow: 1,
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      }
    },
    container: {
      maxHeight: 440
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    },
    uploadPaper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    metaDataPaper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary
    },
    uploadText: {
      marginTop: '1rem',
      marginBottom: '1rem',
      width: '100%'
    },
    addButton: {
      width: 'fit-content',
      marginTop: '1rem',
      marginRight: '1rem'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadButton: {
      float: 'right',
      margin: '2rem'
    }
  }));

const BulkUpload = () => {
    const { enqueueSnackbar } = useSnackbar();

    const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData(item_name ,item_price,  item_code , discount, quantity, item_description, category, vat, brand, addInfo) {
    return { item_name ,item_price,  item_code , discount, quantity, item_description, category, vat, brand, addInfo};
  }
  const [formatError, setFormatError] = useState(false);
  const [openSnack, setOpenSnack ] = useState(false);

  const {addItem} = useContext(InventoryContext);


  const handleUpload=async ()=>{
    const i = 0;
    newItems.forEach(async(item,i)=>{
        try{
            await addItem(item);
            i++;
            enqueueSnackbar(`${i} items added`,{ variant: 'success'});
        }catch(err){
            enqueueSnackbar(err.data,{variant: 'error'});
        }
    })
  };
  const [newItems, setNewItems] = useState([]);
  const [open, setOpen] = useState(false);
  const handleFile = (files) => {
    setFormatError(false);
    const list = [];
    readXlsxFile(files[0])
      .then((rows) => {
        rows.forEach((row) => {
          if (row.length < 10) {
            setFormatError(true);
          } else {
            list.push(createData(...row));
          }
        });
        list.shift();
        setNewItems(list);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {formatError ? <Alert severity="error">File format invalid</Alert> : ""}

      <UploadExcel handleImages={(files) => handleFile(files)} />
      <Modal
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key={"1"}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  {/* <TableCell key={'register'}>Register</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {newItems
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.item_code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={newItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Button
            onClick={() => {
                handleUpload();
            }}
            className={classes.uploadButton}
            variant="contained"
          >
            Upload all
          </Button>

        </Paper>
      </Modal>
    </>
  );
};

export default BulkUpload;
