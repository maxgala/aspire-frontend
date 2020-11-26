import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class AdminCoffeeChats extends Component {
  render() {
    return (
      <div>
        <p>Coffee Chats</p>
      </div>
    );
  }
}

AdminCoffeeChats = withMyHook(AdminCoffeeChats);
export default AdminCoffeeChats;
