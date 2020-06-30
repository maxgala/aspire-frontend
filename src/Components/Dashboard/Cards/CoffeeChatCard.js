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

class CoffeeChatCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div style={{width: '300px', height: '120px', borderStyle: 'solid', marginBottom: '20px'}}>
          <p>COFFEE CHAT CARD</p>
        </div>
      </div>
    )
  }
}

CoffeeChatCard = withMyHook(CoffeeChatCard);
export default CoffeeChatCard;
