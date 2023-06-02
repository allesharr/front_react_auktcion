import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper} from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth'
import Sidebar from '../Sidebar/Sidebar'
import { authorizationAPI } from '../../api/api';
import { TablePreloader } from '../../components/Datagrid/Datagrid';
import ContentLoader from 'react-content-loader'
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const LayotPreloader = () => (
  <ContentLoader height="1500" width="80" viewBox="0 0 265 230">
    <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
    <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
    <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
    <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
</ContentLoader>
)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  }),
);


const Layout = () => {

    const classes = useStyles();
    const loggedIn = useAuth()
    const navigate = useNavigate()

    const { authorizationChecked } = useTypedSelector(state => state.application)
    const { setAuthorizationChecked, setIsAuth, setRoles } = useActions()

    React.useEffect(() => {

      const userId = localStorage.getItem("user_id")
      const session_key = localStorage.getItem("session_key")

      if (!authorizationChecked) authorizationAPI.checkAuth(session_key,Number(userId)).then(({data}) => {

        setRoles([1])
        setIsAuth(true)
        setAuthorizationChecked(true)
        
      }).catch(error => {

        if (error.status === 401) {
            localStorage.removeItem("session_key")
            localStorage.removeItem("login")
            localStorage.removeItem("user_id")
          }
        navigate('login', {replace: true})
      })
    },[])


    if (!loggedIn) return <Navigate to='/login' replace/>
    if (!authorizationChecked) return <TablePreloader />

    return <Paper style={{display: "flex", flexDirection: "column", minHeight: "100vh"}} elevation={0}>
            <Toolbar />
            <div className={classes.toolbar}/>
            <main style={{flexGrow: 1, display: "flex" }}>
                <Sidebar/>
                <div style={{ flexGrow: 1, flexBasis: 0, padding: "12px 24px", }}>
                  <Outlet />
                </div>
            </main>
            </Paper> 
}

export default Layout