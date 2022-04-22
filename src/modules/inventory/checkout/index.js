import React, { useContext, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import GetAppIcon from '@material-ui/icons/GetApp';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Select } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InventoryContext } from '../context';
import { useSnackbar } from 'notistack';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.addVirtualFileSystem(pdfFonts);
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version
    }/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    paper: {
        boxShadow: theme.shadows[5],
    },
    root: {
        width: 300,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 9px',
        transform: 'scale(0.8)',
    },
    cardRoot: {
        minWidth: 275,
        maxWidth: 800,
        maxHeight: 900,
        position: 'center'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paperroot: {
        flexGrow: 1,
        alignItems: "row"
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function SalesInvoicePdf({ pageSize, file, open, handleOpen }) {
    const [pageNumber, setPageNumber] = useState(1);

    const [pdf, setPdf] = useState(null);

    useEffect(async () => {
        if (file) {
            const p = await file.getBuffer();
            setPdf(p);
        }
    }, [file])

    const classes = useStyles();

    return (
        <Modal
            open={open} onClose={handleOpen}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Card className={classes.cardRoot} variant="outlined">
                <CardContent>
                    <CardMedia>
                        <Document file={new Blob([pdf], { type: 'application/pdf' })} >
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </CardMedia>
                    <Button onClick={() => {
                        try {
                            file.download();
                        } catch (err) {

                        }
                    }}><GetAppIcon color="primary" /></Button>

                    {pageNumber < pageSize ? (
                        <Button onClick={() => {
                            if (pageNumber < pageSize) {
                                setPageNumber(pageNumber + 1);
                            }
                        }}><NavigateNextIcon /></Button>

                    ) : ""}

                    {pageNumber - 1 > 0 ? (
                        <Button onClick={() => {
                            setPageNumber(pageNumber - 1);
                        }}><NavigateBeforeIcon /></Button>
                    ) : ""}
                </CardContent>
            </Card>
        </Modal>

    )

}

export default function CheckOut({ open, handleOpen }) {
    const classes = useStyles();
    const [customer_name, setCustomer] = useState("");
    const [payment_method, setPaymentMethod] = useState("");
    const [openInvoice, setOpenInvoice] = useState(false);
    const [paid_amount, setPaidAmount] = useState(0);

    const { enqueueSnackbar } = useSnackbar();

    const [pageSize, setPageSize] = useState(0);

    const { getDocumentDefination, createInvoice } = useContext(InventoryContext);
    const [file, setFile] = useState(undefined);

    function handleOpenInvoice() {
        setOpenInvoice(!openInvoice);
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal} open={open} onClose={handleOpen}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <TextField id="outlined-basic" value={customer_name} onChange={(e) => {
                                    setCustomer(e.target.value);
                                }} label="Enter customer name" variant="outlined" type="text" />
                                <TextField id="outlined-basic" value={paid_amount} onChange={(e) => {
                                    setPaidAmount(e.target.value);
                                }} label="Paid amount" variant="outlined" type="number" />
                                <Typography variant="h6">Payement Method</Typography>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={payment_method}
                                    onChange={(e) => { setPaymentMethod(e.target.value) }}
                                >
                                    <MenuItem value="CASH">
                                        CASH
                                    </MenuItem>
                                    <MenuItem value={"CARD"}>CARD</MenuItem>
                                    <MenuItem value={"ESEWA"}>ESEWA</MenuItem>
                                </Select>
                            </CardContent>
                            <CardActions>
                                <Button onClick={async () => {
                                    try {
                                        const res = await createInvoice({ customer_name, payment_method, paid_amount })
                                        enqueueSnackbar('checkout successful ', { variant: 'success' });
                                        const d = getDocumentDefination(res.data);
                                        const len = (await pdfMake.createPdf(d).getStream())._pdfMakePages.length;
                                        setPageSize(len);
                                        const pdf = pdfMake.createPdf(d);
                                        setFile(pdf);
                                        handleOpenInvoice()
                                    } catch (err) {
                                        console.log(err)
                                        enqueueSnackbar(err.data, { variant: 'error' });
                                    }
                                }}
                                    variant='contained' color='primary'>Complete Checkout</Button>
                            </CardActions>
                        </Card>
                    </div>
                </Fade>
            </Modal>
            <SalesInvoicePdf pageSize={pageSize} file={file} open={openInvoice} handleOpen={handleOpenInvoice} />
        </div>
    );
}