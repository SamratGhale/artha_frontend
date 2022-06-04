import Drawer from "../nav";
import PropTypes from 'prop-types';
import { Outlet } from "react-router-dom";

import React,{useState} from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
}));
DashBoardLayout.prototype = {
    children : PropTypes.node
}

function DashBoardLayout(){
    const classes = useStyles();
    const [openNav, setOpenNav ] = useState(false);
    return(
        <div>
        <Drawer isOpenNav = {openNav} toggleOpenNav = { ()=>setOpenNav(!openNav)}/>
        <Outlet/>
        </div>
    )
}
export default DashBoardLayout;
