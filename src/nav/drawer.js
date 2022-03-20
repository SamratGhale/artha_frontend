import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { UserContext } from '../modules/users/context';
import { Drawer } from '@material-ui/core';
import NavLinks from './config';


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
const ListItemButton = (props) => {
    return <ListItem button component="a" {...props} />;
}

function renderNavItems({ items }) {
    return (
        items.map(item => {
            return (
                <ListItemButton key={item.title} href={item.href}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            )
        }
        )
    )
}

export default function MainDrawer({state, toggleOpenNav}) {
    const classes = useStyles();
    const { logout } = useContext(UserContext);


    const list = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: false,
            })}
            role="presentation"
            onClick={() => { toggleOpenNav() }}
            onKeyDown={() => toggleOpenNav()}
            onMouseLeave={()=>{toggleOpenNav()}} 
        >
            {NavLinks.map((list) => {
                const Guard = list.guard;
                const authorizedUsers = list.roles || []
                return (
                    <Guard key={list.items[0].title} authorizedUsers={authorizedUsers}>
                        <List>
                            {renderNavItems({
                                items: list.items
                            })}
                        </List>
                    </Guard>
                )
            })}
            <Divider />
            <List>
                <ListItemButton key={"Logout"} onClick={logout}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                </ListItemButton>
            </List>
        </div>
    );

    return (
        <div>
            <Drawer
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                anchor={'left'}
                open={state}
                variant="temporary"
                classes={{
                    paper: classes.drawerPaper,
                  }}
                onClose={() => { toggleOpenNav() }}
            >
                {list()}
            </Drawer>
        </div>
    );
}