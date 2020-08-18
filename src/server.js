/**
 * This is a development server to proxy requests to the backend url to 
 * avoid hitting CORS. It will not be used in production but only in local testing.
 */

const axios = require("axios");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname)));

app.get('/api/*', async (req, res) => {
  res.send(await httpGet(req.method, req.path, req.data).catch(err => {
    if (err) {
      console.error(err);
    }
  }));
});

app.post('/api/*', async (req, res) => {
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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

function httpGet(method, path, data) {
  let url = (process.env.REACT_APP_BACKEND_URL + path).replace("api/", "");
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

function httpPost(endPoint, headers, data) {
  let url = (process.env.REACT_APP_BACKEND_URL + endPoint).replace("api/", "");
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
