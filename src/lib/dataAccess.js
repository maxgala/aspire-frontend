import axios from "axios";

let baseURL = "";
if (
  process.env.REACT_APP_ENV &&
  process.env.REACT_APP_ENV.toLowerCase() === "prod"
) {
  baseURL = process.env.REACT_APP_BACKEND_URL + "/";
}

export const httpGet = (endPoint, accessToken) => {
  let url = baseURL + "api/" + endPoint;

  return axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      throw error;
    });
};

export const httpPost = (endPoint, accessToken, body) => {
  let url = baseURL + "api/" + endPoint;

  return new Promise(async (resolve, reject) => {
    axios
      .post(url, body, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const httpPut = (endPoint, accessToken, body) => {
  let url = baseURL + "api/" + endPoint;

  return new Promise(async (resolve, reject) => {
    axios
      .put(url, body, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
