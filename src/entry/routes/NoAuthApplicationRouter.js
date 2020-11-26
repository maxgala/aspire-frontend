import React from 'react';
import {Route, Switch } from 'react-router-dom';

export class LandpageRouter extends React.Component {
  render() {
    return (
        <Switch>
          {/* <Route path={Routes.Login}>
            <Suspense fallback={<LoadingSpinner />}>
              <SignInPage />
            </Suspense>
          </Route> */}
          {/* <ProtectedRoute
            exact={true}
            path="/"
            component={() => <Redirect to={Routes.Overview} />}
          /> */}
          <Route exact={true} path="/" component={<div>sdiuf</div>} />
          {/* <Route component={ErrorPage} /> */}
        </Switch>
    );
  }
}