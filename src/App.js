import React, {Component} from 'react';
import Dashboard from "./Components/Dashboard/DashMain";
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentScreen: []
    }
  }

  componentDidMount() {
    this.setState({
      currentScreen: <Dashboard appContext={this}/>
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
