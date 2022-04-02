import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import ListItems from './items/index'
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
          <Tab label="Inventory"/>
          <Tab label="Cart" />
          <Tab label="Checkout" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={classes.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
        <ListItems/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Cart
        </TabPanel>
        <TabPanel value={value} index={2}>
          Checkout 
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
