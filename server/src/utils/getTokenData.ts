import dotenv from "dotenv";
import { Props } from "../utils/getToken";

dotenv.config();

const getTokenData = ({ api, refresh_token, code }: Props) => {
  if (api === "discord") {
    return {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.DISCORD_REDIRECT_URI,
      scope: "identify connections",
    };
  } else {
    if (refresh_token) {
      return {
        grant_type: "refresh_token",
        refresh_token,
      };
    } else
      return {
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code",
      };
  }
};

export default getTokenData;
