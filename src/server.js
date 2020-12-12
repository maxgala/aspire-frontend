/**
 * This is a development server to proxy requests to the backend url to
 * avoid hitting CORS. It will not be used in production but only in local testing.
 */

const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname)));

app.get("/app/*", async (req, res) => {
  const headers = {
    authorization: req.headers.authorization,
    "content-type": req.headers["content-type"]
      ? req.headers["content-type"]
      : "application/json",
  };
  const params = req.query;
  try {
    const resultFromReq = await httpGet(req.method, req.path, headers, params);
    res.send(resultFromReq);
  } catch (err) {
    console.error(err);
    res.status(err.response.status).send(err.response.data.message);
  }
});

app.post("/app/*", async (req, res) => {
  const headers = {
    authorization: req.headers.authorization,
    "content-type": req.headers["content-type"]
      ? req.headers["content-type"]
      : "application/json",
  };

  try {
    const resultFromReq = await httpPost(req.path, headers, req.body);
    res.send(resultFromReq);
  } catch (err) {
    console.error(err);
    res.status(err.response.status).send(err.response.data.message);
  }
});

app.post("/register/*", async (req, res) => {
  const headers = {
    "content-type": req.headers["content-type"]
      ? req.headers["content-type"]
      : "application/json",
  };

  try {
    const resultFromReq = await httpPost(req.path, headers, req.body);
    res.send(resultFromReq);
  } catch (err) {
    console.error(err);
    res.status(err.response.status).send(err.response.data.message);
  }
});

app.put("/app/*", async (req, res) => {
  const headers = {
    authorization: req.headers.authorization,
    "content-type": req.headers["content-type"]
      ? req.headers["content-type"]
      : "application/json",
  };
  try {
    const resultFromReq = await httpPut(req.path, headers, req.body);
    res.send(resultFromReq);
  } catch (err) {
    console.error(err);
    res.status(err.response.status).send(err.response.data.message);
  }
});

app.put("/register/*", async (req, res) => {
  const headers = {
    authorization: req.headers.authorization,
    "content-type": req.headers["content-type"]
      ? req.headers["content-type"]
      : "application/json",
  };
  try {
    const resultFromReq = await httpPut(req.path, headers, req.body);
    res.send(resultFromReq);
  } catch (err) {
    console.error(err);
    res.status(err.response.status).send(err.response.data.message);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// In dev mode, we don't want to serve static files on requesting *
if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
  });
}

function httpGet(method, path, headers, params) {
  let localDevPath = path.substring(path.indexOf("/api"), path.length);
  let url = "https://services-d.aspire.maxgala.com" + localDevPath;
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](url, {
      headers: headers,
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function httpPost(endPoint, headers, data) {
  let localDevPath = endPoint.substring(
    endPoint.indexOf("/api"),
    endPoint.length
  );
  let url = "https://services-d.aspire.maxgala.com" + localDevPath;
  return new Promise((resolve, reject) => {
    return axios
      .post(url, data, {
        headers: headers,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function httpPut(endPoint, headers, data) {
  let localDevPath = endPoint.substring(
    endPoint.indexOf("/api"),
    endPoint.length
  );
  let url = "https://services-d.aspire.maxgala.com" + localDevPath;
  return new Promise((resolve, reject) => {
    return axios
      .put(url, data, {
        headers: headers,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Choose the port and start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Running proxy server on ${PORT}`);
});
