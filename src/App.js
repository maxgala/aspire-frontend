import React, {Component} from 'react';
import Landing from "./Components/LandingPage/Landing";
import './App.css';
import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {

      // REQUIRED - Amazon Cognito Region
      region: process.env.REACT_APP_COGNITO_REGION,

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
  }
});


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentScreen: []
    }
  }

  componentDidMount() {
    this.setState({
      currentScreen: <Landing appContext={this}/>
    })
  }

  render(){
    return (
        <div className="App">
          {this.state.currentScreen}
        </div>
    );
  }
}

export default App;
