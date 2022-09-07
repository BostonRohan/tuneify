import getTokenData from "./getTokenData";
import axios from "axios";
import querystring from "querystring";
import dotenv from "dotenv";

dotenv.config();

export interface Props {
  code: string | undefined;
  refresh_token?: string;
  api: "discord" | "spotify";
}

const getToken = async ({ code, api }: Props) => {
  const tokenData = getTokenData({ code, api });

  const { data } = await axios.post(
    api === "spotify"
      ? "https://accounts.spotify.com/api/token"
      : "https://discord.com/api/oauth2/token",
    querystring.stringify(tokenData),
    {
      headers:
        api === "spotify"
          ? {
              Authorization:
                "Basic " +
                Buffer.from(
                  process.env.SPOTIFY_CLIENT_ID +
                    ":" +
                    process.env.SPOTIFY_CLIENT_SECRET
                ).toString("base64"),
              "Content-Type": "application/x-www-form-urlencoded",
            }
          : {
              "Content-Type": "application/x-www-form-urlencoded",
            },
    }
  );
  return data;
};

export default getToken;
