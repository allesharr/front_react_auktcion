import React from 'react'
import NotFound from "./components/Common/NotFound";
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from "./components/Layout/Layout";
import LoginPage from './components/LoginPage/LoginPage'
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings' 
import ProtectedRoute from './components/ProtectedRoute';
import { Roles } from './types/application';
import { TablePreloader } from './components/Datagrid/Datagrid';
import Auktsion  from './components/Auktsion/Auktsion'


const UsersTable  = React.lazy(() => import('./components/Users/UsersTable'))
const CreateEditUserInformation  = React.lazy(() => import('./components/Users/CreateEditUserInformation'))

const App = () => {

  return <Routes>
              <Route path="/login" element={ <LoginPage /> }/>
              <Route path="/" element={ <Layout /> }>
                    
                    <Route path='/aukt' element={ <Auktsion />} />
                    
                    <Route element={<ProtectedRoute allowedRole={Roles.Admin} />}>
                        <Route path="/users" element={<React.Suspense fallback={<TablePreloader />}><UsersTable /></React.Suspense>} />
                        <Route path="/users/create" element={<React.Suspense><CreateEditUserInformation mode={"create"}/> </React.Suspense>} />
                        <Route path="/users/:id/edit" element={<React.Suspense><CreateEditUserInformation mode={"edit"}/> </React.Suspense>} />
                    </Route>
                    
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />

                    <Route path="*" element={ <NotFound /> } />
              </Route>
          </Routes>
}

export default App;
