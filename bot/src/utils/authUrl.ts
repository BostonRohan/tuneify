import querystring from "querystring";
import scope from "../utils/scope";
import state from "../utils/state";
import { code_challenge } from "../utils/pkce";
import dotenv from "dotenv";

dotenv.config();

export default "https://accounts.spotify.com/authorize?" +
  querystring.stringify({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    scope,
    redirect_uri: "http://localhost:8888/",
    state,
    code_challenge_method: "S256",
    code_challenge,
  });
