import querystring from "querystring";
import scope from "../utils/scope";
import state from "../utils/state";
import dotenv from "dotenv";

dotenv.config();

export default "https://accounts.spotify.com/authorize?" +
  querystring.stringify({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state,
  });
