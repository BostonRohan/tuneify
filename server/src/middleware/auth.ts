import querystring from "querystring";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { code, state } = req.query;
  if (code && state) {
    //token data type????
    const tokenData: any = {
      code,
      redirect_uri: "http://localhost:8888/",
      grant_type: "authorization_code",
    };
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify(tokenData),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { access_token, error } = data;

    if (error) res.send(error);
    else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
    }
  }
  next();
};
export default auth;
