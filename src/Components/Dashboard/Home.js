import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Home extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div>
          <p>HOME / DASHBOARD</p>
        </div>
      </div>
    )
  }
}

Home = withMyHook(Home);
export default Home;