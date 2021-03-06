import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import zxcvbn from "zxcvbn";

import FormField from "./FormField";

class PasswordField extends Component {
  constructor(props) {
    super(props);
    const { minStrength = 3, thresholdLength = 7 } = props;

    // set default minStrength to 3 if not a number or not specified
    // minStrength must be a a number between 0 - 4

    this.minStrength =
      typeof minStrength === "number"
        ? Math.max(Math.min(minStrength, 4), 0)
        : 3;

    // set default thresholdLength to 7 if not a number or not specified
    // thresholdLength must be a minimum value of 7

    this.thresholdLength =
      typeof thresholdLength === "number" ? Math.max(thresholdLength, 7) : 7;

    // initialize internal component state
    this.state = { passwordStrength: "", strength: 0 };
  }

  stateChanged = (state) => {
    // updating the state
    // If password does not meet our requirements, score meter will not show user a green 4/5 bar
    if (!this.checkPasswordForAWS(state.value)) {
      this.setState(
        {
          passwordStrength: state.value,
          strength: zxcvbn(state.value).score - 2,
        },
        () => this.props.onStateChanged(state)
      );
    } else {
      this.setState(
        {
          passwordStrength: state.value,
          strength: zxcvbn(state.value).score,
        },
        () => this.props.onStateChanged(state)
      );
    }
  };

  // Will return true if it meets our password criteria
  checkPasswordForAWS = (value) => {
    // Regex for contains lower case, upper case, digit, AWS cognito special chars, no white space, min length of 7, max length of 99
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+\-^$*.[\]{}()?"!@#%&/\\,><':;|_~`])\S{7,99}$/;
    return regex.test(value);
  };

  validatePasswordStrong = (value) => {
    // ensure password is long enough
    if (value.length <= this.thresholdLength)
      throw new Error("Password is short");

    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < this.minStrength)
      throw new Error("Password is weak");

    if (!this.checkPasswordForAWS(value)) {
      throw new Error("Password does not meet our criteria");
    }
  };

  render() {
    const {
      type,
      validator,
      onStateChanged,
      children,
      ...restProps
    } = this.props;
    const { passwordStrength, strength } = this.state;

    const passwordLength = passwordStrength.length;

    // TODO: Commented code was an attempt to have password field look like https://codesandbox.io/embed/8kkrpy7260?fontsize=14&view=preview
    // Currently, CSS attributes are not applied properly so we have commented the functionality out for
    // a password counter and a password field color change.

    // const passwordStrong = strength >= this.minStrength;
    // const passwordLong = passwordLength > this.thresholdLength;

    // dynamically set the password length counter class
    // Leaving in case we bring the counter back in the future.
    // const counterClass = [
    //   "badge badge-pill",
    //   passwordLong
    //     ? passwordStrong
    //       ? "badge-success"
    //       : "badge-warning"
    //     : "badge-danger",
    // ]
    //   .join(" ")
    //   .trim();

    // password strength meter is only visible when password is not empty
    const strengthClass = [
      "strength-meter mt-2",
      passwordLength > 0 ? "visible" : "invisible",
    ]
      .join(" ")
      .trim();

    return (
      <Fragment>
        <div className="position-relative">
          {/** Pass the validation and stateChanged functions as props to the form field **/}
          <FormField
            type="password"
            validator={this.validatePasswordStrong}
            onStateChanged={this.stateChanged}
            {...restProps}
          >
            {children}
            {/** Render the password strength meter **/}
            <div className={strengthClass} style={{ marginBottom: "15px" }}>
              <div
                className="strength-meter-fill"
                data-strength={strength}
              ></div>
            </div>
          </FormField>
          {/* <div className="position-absolute password-count mx-3"> */}
          {/** Render the password length counter indicator **/}
          {/* <span className={counterClass}>
              {passwordLength
                ? passwordLong
                  ? `${this.thresholdLength}+`
                  : passwordLength
                : ""}
            </span>
          </div> */}
        </div>
      </Fragment>
    );
  }
}

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func,
  minStrength: PropTypes.number,
  thresholdLength: PropTypes.number,
};

export default PasswordField;
