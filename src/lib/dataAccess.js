import axios from "axios";
import { config } from "../config";

export const httpGet = (endPoint, accessToken) => {
  let url = "api/" + endPoint;

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
  let url = "api/" + endPoint;

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
