import getTokenData from "./getTokenData";
import axios from "axios";
import querystring from "querystring";
import dotenv from "dotenv";

dotenv.config();

const getToken = async (code: string | undefined, refresh: string | null) => {
  const tokenData = getTokenData(code, refresh);

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
  return data;
};

export default getToken;
