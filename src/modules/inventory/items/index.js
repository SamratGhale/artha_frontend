import React, { useContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
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
import AddToCartModal from "../cart/addToCartModal";

import { makeStyles } from '@material-ui/core/styles';

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
  const { items, refreshData } = useContext(InventoryContext);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');

  var columns = [
    { field: "item_name", flex:1, headerName: "Name"},
    { field: "item_price",flex:1, type: "number", padding:"left", headerName: "Price (Rs.)"},
    { field: "item_code", flex:1,headerName: "Code"},
    { field: "discount", flex:1,type: "number", headerName: "Discount %"},
    { field: "quantity", flex:1.5,type: "number", headerName: "Quantity Available"},
    { field: "brand", flex:1,headerName: "Brand" }
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
    c.headerAlign='center'
  })
  useEffect(() => {
    refreshData()
    const d = []
    items.map(item => {
      item.id = item._id;
      d.push(item)
    })
    setData(d);
  }, [items])

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleClose = () => {
    setOpen(!open);
  }

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = items.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setData(filteredRows);
  };

  const [searchText, setSearchText] = React.useState('');


  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid autoHeight 

      style={{'backgroundColor':'#9e9780'}}
        components={{ Toolbar: QuickSearchToolbar }}
        onRowDoubleClick={(s) => {
          const i = items.filter(e => e._id == s.id);
          setItem(i[0]);
          handleClose();
        }} rows={data} columns={columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
      />

      <AddToCartModal open={open} handleClose={handleClose} item={item} />
    </div>
  );
}
