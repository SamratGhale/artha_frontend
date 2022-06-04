import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import Login from "./login";
import SignUp from "./signup";
import MuiAlert from '@material-ui/lab/Alert';
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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

export default function Auth() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severnity, setSevernity] = useState("success");

    const handleClose = () => {
        setOpen(!open);
    }

  return (
    <div className={classes.root}>
      <AppBar position="static" variant="elevation">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={classes.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <Login handleClose={handleClose} setMessage={setMessage} setSevernity={setSevernity} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp handleClose={handleClose} setMessage={setMessage} setSevernity={setSevernity} />
        </TabPanel>
      </SwipeableViews>
      <Snackbar anchorOrigin={{ horizontal:'right', vertical:'top'}} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severnity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
