import React from 'react';
import { Switch } from 'react-router-dom';
// import { FullPage } from './FullPage';
// import { ProtectedRoute } from './ProtectedRoute';
// import { Routes } from './Routes';

export class AuthApplicationRouter extends React.Component {
  render() {
    return (
      <Switch>
        {/* <ProtectedRoute path={Routes.Overview} component={null}>
          <FullPage>
            <Overview />
          </FullPage>
        </ProtectedRoute> */}
      </Switch>
    );
  }
}