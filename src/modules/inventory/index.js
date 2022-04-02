import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cart from "./cart";
import LocalAtmSharpIcon from '@material-ui/icons/LocalAtmSharp';
import StorefrontSharpIcon from '@material-ui/icons/StorefrontSharp';
import AppBar from "@material-ui/core/AppBar";
import { SnackbarProvider } from 'notistack';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import ListItems from './items/index'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Grid } from "@material-ui/core";
import CheckOut from "./checkout";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background,
  },
  addButton: {
    color: "white",
  },
}));

export default function Inventory() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //const {user_info} = useContext(UserContext);

  return (
    <div className={classes.root}>
      <AppBar position="static" variant="elevation">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={
            <Grid>
              <Typography variant="body1">Inventory</Typography>
              <StorefrontSharpIcon />
            </Grid>
          }
          />
          <Tab label={
            <Grid>
              <Typography variant="body1">Cart</Typography>
              <AddShoppingCartIcon />
            </Grid>
          }
          />
          <Tab label={
            <Grid>
              <Typography variant="body1">Checkout</Typography>
              <LocalAtmSharpIcon />
            </Grid>
          } />
        </Tabs>
      </AppBar>
      <SnackbarProvider maxSnack={5}>
        <SwipeableViews
          axis={classes.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <ListItems />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Cart />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CheckOut/>
          </TabPanel>
        </SwipeableViews>
      </SnackbarProvider>
    </div>
  );
}
