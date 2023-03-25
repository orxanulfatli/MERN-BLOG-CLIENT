import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux'

interface IProtectedProps {
  permission:string[]
}


const ProtectedRoute: React.FC<IProtectedProps> = ({ permission }) => {
  const { isAuth, user,accessToken } = useAppSelector(state => state.authReducer);
  const location = useLocation()

  const auth = isAuth&&accessToken&&user&&permission.includes(user.role)

  return auth ? (
    <Outlet />
  ) : user?.name ? (
    <Navigate to="*" state={{ from: location }} replace />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute