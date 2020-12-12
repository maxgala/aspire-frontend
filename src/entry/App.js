import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import Amplify from "aws-amplify";
import { SnackbarProvider } from "notistack";

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_COGNITO_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
  },
});

class App extends Component {
  render() {
    return (
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </SnackbarProvider>
    );
  }
}

export default App;
