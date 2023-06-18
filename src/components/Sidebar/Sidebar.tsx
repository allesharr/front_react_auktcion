import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Tooltip } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import EventIcon from '@material-ui/icons/Event';
import { mdiAccountPlusOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Roles } from '../../types/application';
import DescriptionIcon from '@material-ui/icons/Description';
import  Late  from  '../../resources/Late.png'
import axios from 'axios'

import  shopping_icon from '../../resources/shopping_icon.svg'
const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      overflowX: "hidden",
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: "hidden",
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      // [theme.breakpoints.up('sm')]: {
      //   width: theme.spacing(9) + 1,
      // },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    link: {
       color: "unset",
       textDecoration: "unset",
       display: "block"
    },
    activeLink: {
      backgroundColor: "rgb(63, 81, 181,.2)"
    },
    sidebarIcon: {
      color: theme.palette.primary.main,
      width: 30,
      height: 30,
      // color: theme.palette.secondary.contrastText
    },
    minimizeIcon: {
      width: 30,
      height: 30,
    }
}
  ))


export default function MiniDrawer( ) {


  const { roles, sideBarOpen } = useTypedSelector(state => state.application)
  const classes = useStyles();

  const isActive = ({isActive}) => { return isActive ? clsx(classes.link,classes.activeLink) : classes.link }

  const [isAdmin, setIsAdmin] = useState(false);
  //no es mejor, pero ha hacemos con muy velocidad. es una requesta nombre dos
  function check_admin() {
    let link_to_fetch = `${process.env.REACT_APP_API_URL}/check_admin_status/${localStorage.getItem("session_key")}`
    axios({
      method: "get",
      url: link_to_fetch,
    }).then(function (response) {
      setIsAdmin(response.data.is_admin)
    });
    
    }

  useEffect(() => {
    check_admin()

  }, [])

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: sideBarOpen,
          [classes.drawerClose]: !sideBarOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: sideBarOpen,
            [classes.drawerClose]: !sideBarOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
        </div>
        <Divider />
        <List>

      


            <NavLink to="/aukt" className={isActive}>   
            <ListItem>
            <Tooltip title={sideBarOpen ? "" : "Аукцион"} placement="bottom-end">
                <ListItemIcon>
                  {/* <PeopleAltOutlinedIcon className={classes.sidebarIcon}/> */}
                  <img src={shopping_icon} className={classes.sidebarIcon} />
                </ListItemIcon>
            </Tooltip>
                <ListItemText>Аукцион</ListItemText>
            </ListItem>
          </NavLink>
           
        {/* { */}
          {/* // (roles && roles.includes(Roles.Admin)) */}
          {/* // && */}
          {/* // <> */}
          <Divider />

          {isAdmin ? 
            ( <NavLink to="/users" className={isActive}>
          <ListItem style={{whiteSpace: "normal"}}>
          <Tooltip title={sideBarOpen ? "" : "Пользователи" } placement="bottom-end">
            <ListItemIcon><Icon className={classes.sidebarIcon} path={mdiAccountPlusOutline} size={1}/></ListItemIcon>
            </Tooltip>
            <ListItemText>Пользователи</ListItemText>
          </ListItem>
        </NavLink>) : (
          <div>

          </div>
        ) }
             
             
              
          {/* // </> */}
        {/* // } */}

        </List>    
      </Drawer>
      </div>
  )
}