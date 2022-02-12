import React from 'react';
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
import { ROOTS } from '../routes/paths';

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
const ListItemButton=(props)=>{
    return <ListItem button component="a" {...props} />;
}

export default function Drawer({state, toggleOpenNav}) {
    const classes = useStyles();

    const list = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: false,
            })}
            role="presentation"
            onClick={()=>{toggleOpenNav()}}
            onKeyDown={()=>toggleOpenNav()}
        >
            <List>
                <ListItemButton key={"Analytics"} href={ROOTS.app}>
                    <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </List>
            <Divider />
            <List>
                <ListItemButton key={"Admin"} href={ROOTS.admin}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary={"Admin"} />
                </ListItemButton>
            </List>
        </div>
    );

    return(
        <div>
                <SwipeableDrawer
                    anchor={'left'}
                    open={state}
                    onClose={()=>{toggleOpenNav()}}
                    onOpen={()=>{toggleOpenNav()}}
                >
                    {list()}
                </SwipeableDrawer>
        </div>
    );
}