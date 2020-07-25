import React, { Component } from "react";
import "./App.css";
import Amplify from "aws-amplify";
import credentials from "./aws-exports";

Amplify.configure(credentials);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: [],
    };
  }

  render() {
    return <div className="App">{this.state.currentScreen}</div>;
  }
}

export default App;
