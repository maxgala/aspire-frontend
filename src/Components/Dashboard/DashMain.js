import React, {Component} from 'react';
import Button from "@material-ui/core/Button";

class DashMain extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    handleClick = (event) => {

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
            </div>
        );
    }
}

export default DashMain;