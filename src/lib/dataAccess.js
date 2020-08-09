import axios from "axios";
import { config } from "../config";
import * as path from "path";

export const httpGet = (endPoint, accessToken, body) => {
  return axios
    .get(
      path.join(config.BACKEND_URL, endPoint),
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
