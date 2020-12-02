import { config } from "../config";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export const authenticate = (username, password) => {
  var authenticationData = {
    Username: username,
    Password: password,
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  var poolData = {
    UserPoolId: config.REACT_APP_USER_POOL_ID,
    ClientId: config.REACT_APP_CLIENT_ID,
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
    Username: username,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
        localStorage.setItem("idToken", result.idToken.jwtToken);
        localStorage.setItem("accessToken", accessToken);
        resolve(accessToken);
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
};
