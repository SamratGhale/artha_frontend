import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './drawer';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function DenseAppBar({isOpenNav, toggleOpenNav}) {
    const classes = useStyles();
    const {pathname} = useLocation();

    useEffect(()=>{
        if(isOpenNav && toggleOpenNav){
            toggleOpenNav();
        }
    },[pathname])

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={()=>{toggleOpenNav()}} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Artha
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer state={isOpenNav} toggleOpenNav ={toggleOpenNav} />
        </div>
    );
}