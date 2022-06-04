import React, { useContext, useEffect, useState } from "react";
import { Button, createTheme, ThemeProvider } from "@material-ui/core";
import { InventoryContext } from "../context";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { makeStyles } from '@material-ui/core/styles';
import EditQuantity from "./editQtyModal";
import CheckOut from "../checkout";

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


export default function Cart() {
  const { cartItems } = useContext(InventoryContext);
  const [data, setData] = useState([]);

  var columns = [
    { field: "item_name", flex: 1, headerName: "Name" },
    { field: "item_price", flex: 1, type: "number", padding: "left", headerName: "Price (Rs.)" },
    { field: "vat", type: "number", flex: 1, headerName: "Vat %" },
    { field: "discount", flex: 1, type: "number", headerName: "Discount %" },
    { field: "cartQuantity", flex: 1, type: "number", headerName: "Quantity" },
    { field: "total", flex: 1, headerName: "Total" },
  ]
  //{ field: "Add", headerName: "Add", width: 200 },
  const theme = createTheme();

  columns.forEach((c) => {
    c.renderCell = (params) => {
      return (
        <ThemeProvider theme={theme}>
          <Typography variant="h6" >{params.value}</Typography>
        </ThemeProvider>
      )
    }
    c.renderHeader = () => {
      return <Typography variant="h6" >{c.headerName}</Typography>
    }
    c.headerAlign = 'center'
  })
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const d = []
    var total = 0;
    cartItems.map(item => {
      console.log(item.total);
      item.id = item._id;
      total += item.total;
      d.push(item)
    })
    setTotal(total);
    setData(d);
  }, [JSON.stringify(cartItems)])

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleClose = () => {
    setOpen(!open);
  }

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = cartItems.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setData(filteredRows);
  };

  const [searchText, setSearchText] = React.useState('');

  const [checkoutOpen, setCheckoutOepn] = useState(false);

  const handleCheckoutClose = () => {
    setCheckoutOepn(!checkoutOpen);
  }


  return (
    <div>
      {cartItems.length !== 0 ? (
        <div >
          <DataGrid autoHeight
            components={{ Toolbar: QuickSearchToolbar }}
            onRowDoubleClick={(s) => {
              if (s.id == 'totalrow') return;
              const i = cartItems.filter(e => e._id == s.id);
              setItem(i[0]);
              handleClose();
            }} rows={[...data, { id: 'totalrow', item_name: "Grand Total", total: total }]} columns={columns}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(''),
              },
            }}
          />
          <Button variant="contained" color="primary" onClick={handleCheckoutClose} >Checkout</Button>
        </div>

      ) : (
        <div>
          <Typography variant="h3">
            Cart is empty
          </Typography>
          </div>
      )}
      <EditQuantity open={open} handleClose={handleClose} item={item} />
      <CheckOut open={checkoutOpen} handleOpen={handleCheckoutClose} />
    </div>
  );
}
