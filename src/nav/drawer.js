import React, { useState, useCallback } from 'react';


import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

export default function Drawer({state, toggleDrawer}) {
    const classes = useStyles();

    const list = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: false,
            })}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
        >
            <List>
                <ListItem button key={"Home"}>
                    <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItem>
                <ListItem button key={"Analytics"}>
                    <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                    <ListItemText primary={"Analytics"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {['About', 'Admin', 'Users'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment >
                <SwipeableDrawer
                    anchor={'left'}
                    open={state}
                    onClose={toggleDrawer()}
                    onOpen={toggleDrawer()}
                >
                    {list()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}