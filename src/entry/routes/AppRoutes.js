import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "../../Components/Authentication/SignIn";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Landing from "../../Components/LandingPage/Landing";
import Registration from "../../Components/Registration/Registration";
import AdminDashboard from "../../Components/Admin/Dashboard";
import { Routes } from "./Routes";

export class AppRoutes extends React.Component {
  render() {
    return (
      <Switch>
        {/* <ProtectedRoute
          path={ApplicationPrefix}
          component={AuthApplicationRouter}
        />
        <Route component={LandpageRouter} /> */}
        <Route path={Routes.AdminDashboard}>
          <AdminDashboard appContext={this} />
        </Route>
        <Route path={Routes.Dashboard}>
          <Dashboard appContext={this} />
        </Route>
        <Route exact={true} path={Routes.Login}>
          <SignIn appContext={this} />
        </Route>
        <Route path={Routes.Register}>
          <Registration appContext={this} />
        </Route>
        <Route exact={true} path={Routes.Landpage}>
          <Landing appContext={this} />
        </Route>
      </Switch>
    );
  }
}
