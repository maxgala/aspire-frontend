import React, {Component} from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
 container : {
 

 
},
  f1:{
    fontFamily: "Nunito Sans",
    fontSize:"40px",
    fontWeight:"bolder",
    textAlign: 'center',
  },
  
  total: {
    width: '20%',
    height: '37vh',
   padding: '2%',
 // left: '20%',
  borderRadius: "50%",
marginBottom:"400px",
      marginRight:" 400px",
  },
}));
function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class Carousal extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        const classes = this.props.classes;
        return(
            <div >
                <h1 style={{marginTop: '8vh',marginBottom: '0vh'}} className={classes.f1}><b>What our members have to say</b></h1>
                <div class="container">
                  <img class={classes.total} resizeMode="contain" src={"https://upload.wikimedia.org/wikipedia/commons/f/f6/Sean_Cunningham_Head_Shot.jpg"} alt="Avatar" />
                  <p><span>Chris Fox.</span> CEO at Mighty Schools.</p>
                  <p>John Doe saved us from a web disaster.</p>
                </div>


            </div>
        );
    }
}
Carousal = withMyHook(Carousal);

export default Carousal;