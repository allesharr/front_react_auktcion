import React from 'react';
import { alpha, makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { CircularProgress } from '@material-ui/core';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useLogout } from '../../hooks/useLogout';
import Sidebar from '../Sidebar/Sidebar'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useActions } from '../../hooks/useActions';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      display: 'flex'
    },
    appBarShift: {
      // marginLeft: drawerWidth,
      // width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    grow: {
      flex: '0 0 auto',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      // display: 'none',
      // [theme.breakpoints.up('sm')]: {
        display: 'block',
        flexGrow: 1
      // },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      // display: 'none',
      // [theme.breakpoints.up('md')]: {
        display: 'flex',
      // },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { loading } = useTypedSelector(state => state.application)

  const navigate = useNavigate()

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { setSidebarOpen, hideNotification } = useActions()

  const { sideBarOpen, notifications } = useTypedSelector(state => state.application)

  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation()
  const { pathname } = location

  const { query} = useTypedSelector(state => state.application)
  const { resource, resource_api_name, parameters, defaultParameters } = query

  React.useEffect(() => {
          for (let notificationId in notifications) {
            enqueueSnackbar(notifications[notificationId].message, { 
              variant: "error",
              autoHideDuration: 4000,
              anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
              },
          })
          hideNotification(notificationId)
      }
  }, [notifications])



  const logout = useLogout()

  const { fetchData } = useActions()

  const handleDrawerOpen = () => {
    setSidebarOpen();
  };

  const menuId = 'primary-search-account-menu';
  
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
    >
      <MenuItem onClick={()=>navigate("/profile")}>Профиль</MenuItem>
      <MenuItem onClick={()=>navigate("/settings")}>Настройки интерфейса</MenuItem>
      <MenuItem onClick={logout}>Выйти</MenuItem>
      </Menu>
  );

  const theme = useTheme()

  return (
    <div className={classes.grow}>
      <AppBar 
        position="fixed"
        elevation={1}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: sideBarOpen,
        })}
        color={theme.palette.type === "light" ? "primary" : "default"}
        >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Текущий аукцион
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            { loading > 0 ?
              <CircularProgress color="secondary" size={24} style={{padding: 8}}/> :
              (
                  <IconButton 
                    color="inherit"
                    disabled={pathname.substring(1,pathname.length).indexOf("/") > 0 || pathname === "/profile" || pathname === "/settings"}
                    onClick={e => { if (resource && resource_api_name && parameters) fetchData(resource,resource_api_name,parameters,defaultParameters) }}>
                  <RefreshIcon/>
                </IconButton>
              )

            }
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {renderMenu}
      {/* <Sidebar open={sideBarOpen} handleDrawerClose={handleDrawerClose}/> */}
    </div>
  );
}