import React, {Component} from 'react';
import MohaimenComponent from "./MohaimenComponent";
import Button from "@material-ui/core/Button";
import SomeOtherComponent from "./SomeOtherComponent";

class DashMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            comp_val: []
        }
    }

    componentDidMount() {
        this.setState({
            comp_val: <MohaimenComponent appContext={this}/>
        })
    }

    handleClick = (event) => {
        this.setState({
            comp_val: <SomeOtherComponent appContext={this}/>
        })
    };

    render(){
        return (
            <div>
                <h1>Hello there. We will be adding stuff Here </h1>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.handleClick(event)}
                >
                    Change this
                </Button>
                {this.state.comp_val}
            </div>
        );
    }
}

export default DashMain;