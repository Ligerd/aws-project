import React from 'react';
import { Navigate } from 'react-router-dom';
import { getValueFromLocalStorage, LocalStorageKeys } from '../localStorage/localStorage';

export interface PrivateRouteProps {
  children: React.ReactElement,
  adminRoute?: boolean
  userRoute?: boolean
  userRole?: string
  redirect?: string
}
const PrivateRoute = ({
  children, adminRoute, userRole, userRoute, redirect,
}: PrivateRouteProps) => {
  const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);
  let auth = false;
  console.log(userRole);
  if (adminRoute) {
    auth = !!token && userRole === 'admin';
  }

  if (userRoute) {
    auth = !!token && userRole === 'user';
  }

  if (!adminRoute && !userRoute) {
    auth = !!token;
  }
  const redirectTo = redirect || (userRole ? '/' : '/login');
  return auth ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
