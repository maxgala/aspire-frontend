import axios from "axios";
import { config } from "../config";
import * as path from "path";

export const httpGet = (endPoint, accessToken, body) => {
  let url = path.join(config.BACKEND_URL, endPoint);

  // In dev mode, use the local dev server as a proxy
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = path.join(endPoint);
  }
  return axios
    .get(
      url,
      accessToken
        ? {
          data: body,
          headers: {
            Authorization:
              "Basic " + Buffer.from(":" + accessToken).toString("base64")
          }
        }
        : {
          data: body,
          headers: {
            "Content-Type": "application/json"
          }
        }
    )
    .catch(error => {
      throw error;
    });
}
