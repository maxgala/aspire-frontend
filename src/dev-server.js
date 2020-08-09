/**
 * This is a development server to proxy requests to the backend url to 
 * avoid hitting CORS. It will not be used in production but only in local testing.
 */

const axios = require("axios");
const express = require('express');
const app = express();

app.get('/*', async (req, res) => {
  res.send(await apiCall(req.method, req.path, req.data).catch(err => {
    if (err) {
      console.error(err);
    }
  }));

});

function apiCall(method, path, data) {
  let url = process.env.REACT_APP_BACKEND_URL + path;
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](url, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}

app.listen(8080);
