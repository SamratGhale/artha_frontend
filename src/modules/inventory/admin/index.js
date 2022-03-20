import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { InventoryContext } from "../context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    padding: theme.spacing(3),
  },
  paper: {
    color: theme.palette.text.secondary,
  },
}));

export default function AdminInventory() {
  const { addItem } = useContext(InventoryContext);
  const classes = useStyles();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [vat, setVat] = useState(0);
  const [brand, setBrand] = useState("");
  const [addInfo, setAddInfo] = useState("");

  const handleItemAdd = () => {};
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <TextField
              id="name"
              value={name}
              type={"text"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label="name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="price"
              value={price}
              type={"number"}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              label="price"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="code"
              value={code}
              type={"text"}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              label="code"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <TextField
              id="discount"
              value={discount}
              type={"number"}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              label="discount %"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="quantity"
              value={quantity}
              type={"number"}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              label="quantity"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <TextField
              id="description"
              value={description}
              type={"text"}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              label="description"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="category"
              value={category}
              type={"text"}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              label="category"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="vat"
              value={vat}
              type={"number"}
              onChange={(e) => {
                setVat(e.target.value);
              }}
              label="vat %"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <TextField
              id="brand"
              value={brand}
              type={"text"}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              label="brand"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="AddInfo"
              value={addInfo}
              type={"text"}
              onChange={(e) => {
                setAddInfo(e.target.value);
              }}
              label="Additional Info"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <Button
              onClick={handleItemAdd}
              variant="contained"
              color="secondary"
            >
              Add item
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
