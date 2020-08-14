/**
 * This is a development server to proxy requests to the backend url to 
 * avoid hitting CORS. It will not be used in production but only in local testing.
 */

const axios = require("axios");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/*', async (req, res) => {
  res.send(await httpGet(req.method, req.path, req.data).catch(err => {
    if (err) {
      console.error(err);
    }
  }));
});

app.post('/*', async (req, res) => {
  const headers = {
    "authorization": req.headers.authorization,
    "content-type": req.headers["content-type"]
  }
  res.send(await httpPost(req.path, headers, req.body)
    .catch(err => {
      if (err) {
        console.error(err);
      }
    }));
});

function httpGet(method, path, data) {
  let url = process.env.REACT_APP_BACKEND_URL + path;
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](url, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
}

const httpPost = (endPoint, headers, data) => {
  let url = process.env.REACT_APP_BACKEND_URL + endPoint;
  return new Promise((resolve, reject) => {
    return axios
      .post(url, data, {
        headers: headers
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

app.listen(8080);
