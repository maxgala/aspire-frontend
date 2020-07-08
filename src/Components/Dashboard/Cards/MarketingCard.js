import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    width: '90%',
    maxWidth: '700px',
    height: '170px',
    borderStyle: 'solid',
    marginBottom: '25px',
    borderRadius: '20px'
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class MarketingCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <p>Marketing Card</p>
      </div>
    )
  }
}

MarketingCard = withMyHook(MarketingCard);
export default MarketingCard;
