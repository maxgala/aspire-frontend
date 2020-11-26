import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "../../Components/Authentication/SignIn";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Landing from "../../Components/LandingPage/Landing";
import Registration from "../../Components/Registration/Registration";
import { AuthApplicationRouter } from "./AuthApplicationRouter";
import AdminDashboard from "../../Components/Admin/Dashboard";
import { LandpageRouter } from "./NoAuthApplicationRouter";
import { ProtectedRoute } from "./ProtectedRoute";
import { ApplicationPrefix, Routes } from "./Routes";
import CoffeeChats from "../../Components/Dashboard/CoffeeChats";
import JobBoard from "../../Components/Dashboard/Jobs";
import ResumeBank from "../../Components/Dashboard/ResumeBank";
import Community from "../../Components/Dashboard/Community";

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
