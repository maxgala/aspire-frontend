import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    width: '95%',
    maxWidth: '700px',
    height: '160px',
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

class CoffeeCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <p>COFFEE CHAT CARD</p>
      </div>
    )
  }
}

CoffeeCard = withMyHook(CoffeeCard);
export default CoffeeCard;