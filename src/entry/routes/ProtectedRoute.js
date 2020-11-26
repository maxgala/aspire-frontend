import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Routes } from './Routes';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  // change Me!
  if (false) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  }

  return <Redirect to={Routes.Login} />;
};