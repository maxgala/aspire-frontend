import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Registration from '../Registration/Registration';

const useStyles = makeStyles(theme => ({
    senior_prof_title: {
        fontWeight: '500',
        fontSize: '35px',
        color: 'black',
        padding: '0',
        textAlign : 'left',
        margin: '5px',
        paddingTop: '5%'
    },
    subheading: {
        color: "black",
        paddingLeft: '1%',
        textAlign: 'left',
        fontSize: '22px',
        fontWeight: '100',
        margin: '0'
    },
    button: {
        backgroundColor: "#6EA0B5",
        width: '30%',
        display: 'flex',
        marginRight: 'auto',
        marginTop:"2%",
        borderRadius: 50,
        color: "white",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    }
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class SeniorExecText extends Component {
    changeToSignUp = (event) => {
        this.props.appContext.setState({
            currentScreen: <Registration appContext={this.props.appContext}/>
        })
    };

    render() {
        const classes = this.props.classes;

        return (
            <div>
                <h1 className={classes.senior_prof_title}> Our Senior Professionals</h1>
                <h3 className={classes.subheading}>We have over 100 Senior Professionals commited to the MAX Aspire Platform. Book your exclusive coffee chat!</h3>           
                <Button className={classes.button} variant="contained" onClick={this.changeToSignUp}>Join Now</Button>
            </div>
        );
    }
}

SeniorExecText = withMyHook(SeniorExecText);
export default SeniorExecText;
