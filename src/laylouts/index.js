import Drawer from "../nav";
import PropTypes from 'prop-types';

import React,{useState} from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
}));
DashBoardLayout.prototype = {
    children : PropTypes.node
}

function DashBoardLayout({children}){
    const classes = useStyles();
    const [openNav, setOpenNav ] = useState(false);
    return(
        <div >
            <Drawer isOpenNav = {openNav} toggleOpenNav = { ()=>setOpenNav(!openNav)}/>
            <div className={classes.main}>{children} </div>
        </div>
    )
}
export default DashBoardLayout;
