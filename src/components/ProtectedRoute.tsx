import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'
import { useTypedSelector } from "../hooks/useTypedSelector";

const ProtectedRoutes = ({allowedRole}) => {

  const location = useLocation();
  const isAuth = useAuth();

  const { roles } = useTypedSelector(state => state.application)

  return (isAuth && roles.includes(allowedRole)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;