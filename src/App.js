import React, {Component} from 'react';
import Landing from "./Components/LandingPage/Landing";
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
//import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure({
  Auth: {

      // REQUIRED - Amazon Cognito Region
      region: 'us-east-1',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_osaXQ2xh5',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '1ev0u0hf43ank26v9t9oo693bb',
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
