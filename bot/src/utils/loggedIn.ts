import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const loggedIn = async (discord_id: string) => {
  return await axios.post(`${process.env.API_URL}/loggedin`, {
    discord_id,
  });
};

export default loggedIn;
