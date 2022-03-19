import React, {useContext} from 'react';
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
import { UserContext } from '../modules/users/context';
import NavLinks from './config';


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

function renderNavItems({ items }) {
    return (
        items.map(item=> {
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

export default function Drawer({state, toggleOpenNav}) {
    const classes = useStyles();

    const {logout} = useContext(UserContext);


    const list = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: false,
            })}
            role="presentation"
            onClick={()=>{toggleOpenNav()}}
            onKeyDown={()=>toggleOpenNav()}
        >
            {NavLinks.map((list)=>{
                const Guard = list.guard;
                const authorizedUsers = list.roles || []
                return (
                    <Guard authorizedUsers={authorizedUsers}>
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