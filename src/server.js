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
  const headers = {
    "authorization": req.headers.authorization,
    "content-type": req.headers["content-type"] ? req.headers["content-type"] : "application/json"
  }
  const params = req.query;
  res.send(await httpGet(req.method, req.path, headers, params).catch(err => {
    if (err) {
      console.error(err);
    }
  }));
});

app.post('/api/*', async (req, res) => {
  const headers = {
    "authorization": req.headers.authorization,
    "content-type": req.headers["content-type"] ? req.headers["content-type"] : "application/json"
  }
  res.send(await httpPost(req.path, headers, req.body)
    .catch(err => {
      if (err) {
        console.error(err);
      }
    }));
});

app.put('/api/*', async (req, res) => {
  const headers = {
    "authorization": req.headers.authorization,
    "content-type": req.headers["content-type"] ? req.headers["content-type"] : "application/json"
  }
  res.send(await httpPut(req.path, headers, req.body)
    .catch(err => {
      if (err) {
        console.error(err);
      }
    }));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// In dev mode, we don't want to serve static files on requesting *
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
  });
}

function httpGet(method, path, headers, params) {
  let url = ('https://nv4pftutrf.execute-api.us-east-1.amazonaws.com/Prod' + path).replace("api/", "");
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](url, {
        headers: headers,
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function httpPost(endPoint, headers, data) {
  let url = ('https://nv4pftutrf.execute-api.us-east-1.amazonaws.com/Prod' + endPoint).replace("api/", "");
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

function httpPut(endPoint, headers, data) {
  let url = ('https://nv4pftutrf.execute-api.us-east-1.amazonaws.com/Prod' + endPoint).replace("api/", "");
  return new Promise((resolve, reject) => {
    return axios
      .put(url, data, {
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

// Choose the port and start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Running proxy server on ${PORT}`)
});
