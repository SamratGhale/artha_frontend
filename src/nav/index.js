import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MainDrawer from './drawer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function DenseAppBar({ isOpenNav, toggleOpenNav }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onMouseEnter={toggleOpenNav} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleOpenNav} aria-label="menu">
                        <Typography variant="h6" color="inherit" >
                            Artha
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <MainDrawer state={isOpenNav} toggleOpenNav={toggleOpenNav} />
        </div>
    );
}