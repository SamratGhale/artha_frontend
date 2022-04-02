import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
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



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        boxShadow: theme.shadows[5],
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 18,
    },
}));

export default function EditQuantity({ item, open, handleClose, handleOpen }) {
    const classes = useStyles();
    const {removeFromCart} = useContext(InventoryContext);
    const [quantity, setQuantity] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        setQuantity(item.cartQuantity);
    },[item])

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography variant="h5" gutterBottom>{item.item_name}</Typography>
                                <TextField id="outlined-basic" value={quantity} onChange={(e)=>{
                                    setQuantity(e.target.value);
                                }} label="Enter quantity to add " variant="outlined" type="number" />
                                <CardActions>
                                    <Button size="medium" onClick={()=>{
                                        const res = removeFromCart(item, quantity);
                                        if(res.success){
                                            enqueueSnackbar(res.message, { variant: 'success' })
                                        }else{
                                            enqueueSnackbar(res.message, { variant: 'error' })
                                        }
                                        handleClose();
                                    }}>
                                        <Typography variant="button">Okay</Typography>
                                    </Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
