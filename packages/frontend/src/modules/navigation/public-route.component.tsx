import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../common/hooks/auth/auth.hook';
import { APP_KEYS } from '../common/consts';

export const PublicOnlyRoute: FC = () => {
  const { isFetching, error } = useAuth();
  if (isFetching) return <CircularProgress color="primary" />;
  if (!error) {
    return <Navigate to={APP_KEYS.ROUTER_KEYS.HOME} replace />;
  }
  return <Outlet />;
};
