import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
   // '@media (max-width: 1277px)': {width: '95%'},
   // '@media (min-width: 1278px)': {width: '100%'},
   width: '95%',
    maxWidth: '400px',
    height: '40px',
    borderStyle: 'solid',
    marginBottom: '20px',
    borderRadius: '12px',
    borderColor:'#707070',
    borderWidth:'thin',
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class FilterCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <p> </p>
      </div>
    )
  }
}

FilterCard = withMyHook(FilterCard);
export default FilterCard;
