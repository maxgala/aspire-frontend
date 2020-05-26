import React, {Component} from "react";
import { Button } from '@material-ui/core';

class MainImage extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        var sectionStyle = {
            width: "100%",
            height: "500px",
            // backgroundImage: `url(${Background})`
            backgroundColor: "gray",
            marginRight : "0",
            marginLeft  : "0"
          };

        const h1style = {
            color: "white",
            padding: "",
            fontFamily: "Arial",
            fontSize: "50px",
            textAlign: 'center',
            marginBottom: "0"
          };

        const subheading = {
            color: "white"
        };
        const networkstyle = {
            color: "gold",
            marginTop: "10px"
        };

        const button = {
            backgroundColor: "#6EA0B5",
            marginTop:"5%",
            borderRadius: 50,
            color: "white"
        };

        const total = {
            marginTop: '10vh',
            position: 'absolute', left: '50%', top: '40%',
            transform: 'translate(-50%, -50%)'
        };
        return(
            <div style={sectionStyle}>
                <div style={total}>
                    <div>
                        <h1 style={h1style}>Aspire for Excellence</h1>
                        <h3 style={subheading}>Any successful career starts with a <span style={networkstyle}>good network</span></h3>
                        <Button style={button}variant="contained">Learn More</Button>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default MainImage;