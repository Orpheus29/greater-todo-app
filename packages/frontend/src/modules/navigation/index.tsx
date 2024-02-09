import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import HomePageContainer from '../pages/home';
import { ProtectedRoute } from './protected-route.component';
import { ROUTER_KEYS } from '../common/consts/app-keys.const';
import LoginPageContainer from '../pages/login';
import RegistrationPageContainer from '../pages/registration';
import RequestResetPage from '../pages/request-reset';
import ResetPasswordPage from '../pages/reset-password';
import { PublicOnlyRoute } from './public-route.component';
import { ProfilePage } from '../pages/profile';
import { ChangePasswordPage } from '../pages/change-password';

export const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTER_KEYS.HOME} element={<HomePageContainer />} />
        <Route path={ROUTER_KEYS.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTER_KEYS.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
        <Route path="*" element={<Navigate to={ROUTER_KEYS.HOME} />} />
      </Route>
      <Route element={<PublicOnlyRoute />}>
        <Route path={ROUTER_KEYS.SIGN_IN} element={<LoginPageContainer />} />
        <Route path={ROUTER_KEYS.SIGN_UP} element={<RegistrationPageContainer />} />
        <Route path={ROUTER_KEYS.REQUEST_RESET} element={<RequestResetPage />} />
        <Route path={ROUTER_KEYS.RESET_PASSWORD} element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
