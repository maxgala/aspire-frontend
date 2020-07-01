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

class CoffeeChats extends Component {
  render() {
    return (
      <div>
        <p>COFFEE CHATS</p>
      </div>
    )
  }
}

CoffeeChats = withMyHook(CoffeeChats);
export default CoffeeChats;
