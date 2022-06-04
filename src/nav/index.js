import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MainDrawer from './drawer';

import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListSubheader, ListItemButton } from '@mui/material';


const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      color: theme.palette.text.primary
    })
  );
  
  const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main
    }
  }));
  
  const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

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

function NavItem({ item, isShow }) {
    const theme = useTheme();
    const { pathname } = useLocation();
    const { title, path, icon, info, children } = item;
    const isActiveRoot = path ? !!matchPath({ path, end: false }, pathname) : false;

    const [open, setOpen] = useState(isActiveRoot);

    const handleOpen = () => {
        setOpen(!open);
    };

    const activeRootStyle = {
        color: 'primary.main',
        fontWeight: 'fontWeightMedium',
        bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        '&:before': { display: 'block' }
    };

    const activeSubStyle = {
        color: 'text.primary',
        fontWeight: 'fontWeightMedium'
    };

    if (children) {
        return (
            <>
                <ListItemStyle
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot && activeRootStyle)
                    }}
                >
                    <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

                    {isShow && (
                        <>
                            <ListItemText disableTypography primary={title} />
                            {info && info}
                            <Box
                                component={Icon}
                                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                                sx={{ width: 16, height: 16, ml: 1 }}
                            />
                        </>
                    )}
                </ListItemStyle>

                {isShow && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {children.map((item) => {
                                const { title, path } = item;
                                const isActiveSub = path ? !!matchPath({ path, end: false }, pathname) : false;

                                return (
                                    <ListItemStyle
                                        key={title}
                                        component={RouterLink}
                                        to={path}
                                        sx={{
                                            ...(isActiveSub && activeSubStyle)
                                        }}
                                    >
                                        <ListItemIconStyle>
                                            <Box
                                                component="span"
                                                sx={{
                                                    width: 4,
                                                    height: 4,
                                                    display: 'flex',
                                                    borderRadius: '50%',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: 'text.disabled',
                                                    transition: (theme) => theme.transitions.create('transform'),
                                                    ...(isActiveSub && {
                                                        transform: 'scale(2)',
                                                        bgcolor: 'primary.main'
                                                    })
                                                }}
                                            />
                                        </ListItemIconStyle>
                                        <ListItemText disableTypography primary={title} />
                                    </ListItemStyle>
                                );
                            })}
                        </List>
                    </Collapse>
                )}
            </>
        );
    }

    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot && activeRootStyle)
            }}
        >
            <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
            {isShow && (
                <>
                    <ListItemText disableTypography primary={title} />
                    {info && info}
                </>
            )}
        </ListItemStyle>
    );
}



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