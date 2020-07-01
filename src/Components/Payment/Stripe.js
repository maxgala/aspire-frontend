import React, {Component } from "react";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    Elements,
    ElementsConsumer,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {logEvent, Result, ErrorResult} from './util';
import './cardStyle.css';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
        marginTop:"15px",
        height: 50,
        width: '30%',
        borderStyle: 'solid',
        borderRadius: 50,
        backgroundColor: "#b5a165",
        color: "white",
        borderColor: '#484848',
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    }
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '18px',
            color: '#424770',
            letterSpacing: '0.025em',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            postal: '',
            errorMessage: null,
            paymentMethod: null,
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {stripe, elements} = this.props;
        const {name, postal} = this.state;

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name,
                address: {
                    postal_code: postal,
                },
            },
        });

        if (payload.error) {
            console.log('[error]', payload.error);
            this.setState({
                errorMessage: payload.error.message,
                paymentMethod: null,
            });
        } else {
            console.log('[PaymentMethod]', payload.paymentMethod);
            this.setState({
                paymentMethod: payload.paymentMethod,
                errorMessage: null,
            });
        }
    };

    render() {
        const {stripe} = this.props;
        const {postal, name, paymentMethod, errorMessage} = this.state;
        const classes = this.props.classes;
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input
                    id="name"
                    required
                    placeholder="Mohaimen Khan"
                    value={name}
                    onChange={(event) => {
                        this.setState({name: event.target.value});
                    }}
                />
                <label htmlFor="cardNumber">Card Number</label>
                <CardNumberElement
                    id="cardNumber"
                    onBlur={logEvent('blur')}
                    onChange={logEvent('change')}
                    onFocus={logEvent('focus')}
                    onReady={logEvent('ready')}
                    options={ELEMENT_OPTIONS}
                />
                <label htmlFor="expiry">Card Expiration</label>
                <CardExpiryElement
                    id="expiry"
                    onBlur={logEvent('blur')}
                    onChange={logEvent('change')}
                    onFocus={logEvent('focus')}
                    onReady={logEvent('ready')}
                    options={ELEMENT_OPTIONS}
                />
                <label htmlFor="cvc">CVC</label>
                <CardCvcElement
                    id="cvc"
                    onBlur={logEvent('blur')}
                    onChange={logEvent('change')}
                    onFocus={logEvent('focus')}
                    onReady={logEvent('ready')}
                    options={ELEMENT_OPTIONS}
                />
                <label htmlFor="postal">Postal Code</label>
                <input
                    id="postal"
                    required
                    placeholder="12345"
                    value={postal}
                    onChange={(event) => {
                        this.setState({postal: event.target.value});
                    }}
                />
                {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
                {paymentMethod && (
                    <Result>Got PaymentMethod: {paymentMethod.id}</Result>
                )}<br/>
                <Button
                    type="submit"
                    disabled={!stripe}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    <b>Pay</b>
                </Button>
            </form>
        );
    }
}

const InjectedCheckoutForm = () => (
    <ElementsConsumer>
        {({stripe, elements}) => (
            <CheckoutForm stripe={stripe} elements={elements} />
        )}
    </ElementsConsumer>
);


const stripePromise = loadStripe('pk_test_51Gug4qLfzbEt5UVhauq1BUNsK43H4mkdAChHAGxumOZ6Jpks8VaGIbGlbxG0bP0v2n3V5nl31yJG3ewzPzEs5N6E00wcmCJI8p');

class Stripe extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    }

    handleClose = (event) => {
        this.setState({
            open: false
        })
    }

    render() {
        return(
            <Dialog
                maxWidth={"md"}
                fullWidth={true}
                onClose={this.handleClose}
                aria-labelledby="stripe-dialog"
                open={this.state.open}
            >
                <Elements stripe={stripePromise}>
                    <InjectedCheckoutForm />
                </Elements>
            </Dialog>
        )
    }
}
CheckoutForm = withMyHook(CheckoutForm);

export default Stripe;