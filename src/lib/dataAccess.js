import axios from "axios";
import { config } from "../config";
import * as path from "path";

export const httpGet = (endPoint, accessToken) => {
  let url = path.join(config.BACKEND_URL, endPoint);

  // In dev mode, use the local dev server as a proxy
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = path.join(endPoint);
  }
  
  return axios
    .get(
      url,
      {
        headers: {
          Authorization:
            "Bearer " + accessToken,
          "Content-Type": "application/json"
        }
      }
    )
    .catch(error => {
      throw error;
    });
}

export const httpPost = (endPoint, accessToken, body) => {
  let url = path.join(config.BACKEND_URL, endPoint);

  // In dev mode, use the local dev server as a proxy
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = path.join(endPoint);
  }

  return new Promise(async (resolve, reject) => {
    axios
      .post(
        url,
        body,
        {
          headers: {
            Authorization:
              "Bearer " + accessToken,
            "Content-Type": "application/json"
          }
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
