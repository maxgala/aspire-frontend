import React, {Component} from 'react';
import Landing from "./Components/LandingPage/Landing";
import './App.css';
import Registration from "./Components/Registration/Registration";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentScreen: []
    }
  }

  componentDidMount() {
    this.setState({
      currentScreen: <Registration appContext={this}/>
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
