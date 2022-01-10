import React from 'react';
import { Navigate } from 'react-router-dom';
import { getValueFromLocalStorage, LocalStorageKeys } from '../localStorage/localStorage';

const PrivateRoute = ({ children }: {children: React.ReactElement}) => {
  const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);
  const auth = false;
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
