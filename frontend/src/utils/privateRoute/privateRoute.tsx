import React from 'react';
import { Navigate } from 'react-router-dom';
import { getValueFromLocalStorage, LocalStorageKeys } from '../localStorage/localStorage';

export interface PrivateRouteProps {
  children: React.ReactElement,
  adminRoute?: boolean
  userRole?: string
}
const PrivateRoute = ({ children, adminRoute, userRole }: PrivateRouteProps) => {
  const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);
  let auth = false;
  console.log(userRole);
  if (adminRoute) {
    auth = !!token && userRole === 'admin';
  } else {
    auth = !!token;
  }
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
