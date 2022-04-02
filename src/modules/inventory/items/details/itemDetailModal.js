import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
    backgroundColor:'#0f8441'
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

export default function ItemDetailModal({ item, open, handleClose, handleOpen }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


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
                <Typography  variant="h3" >
                  {item.item_name}
                </Typography>
                <Typography variant="body1" component="p"gutterBottom>
                  {item.item_description}
                </Typography>
                <Typography variant="h6">
                  Price: {item.item_price}
                </Typography>
                <Typography variant="h6">
                  Quantity left : {item.quantity}
                </Typography>
                <Typography variant="h6">
                  Category : {item.category}
                </Typography>
                <Typography variant="h6">
                  Brand : {item.brand}
                </Typography>
                <Typography variant="h6">
                  Discount%: {item.discount}
                </Typography>
                <Typography variant="h6">
                  Vat %: {item.vat}
                </Typography>
                <Typography variant="h6">
                  Item Code: {item.item_code}
                </Typography>
                <Typography variant="h6">
                  Additional Info {item.addInfo}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
