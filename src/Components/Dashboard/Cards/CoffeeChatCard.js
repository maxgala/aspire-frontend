import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    width: '80%',
    maxWidth: '300px',
    height: '120px',
    borderStyle: 'solid',
    marginBottom: '20px',
    borderRadius: '20px'
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class CoffeeChatCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <p>COFFEE CHAT CARD</p>
      </div>
    )
  }
}

CoffeeChatCard = withMyHook(CoffeeChatCard);
export default CoffeeChatCard;
