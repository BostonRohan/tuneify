import axios from "axios";

const loggedIn = async (discord_id: string) => {
  return await axios.post("http://localhost:8888/loggedin", {
    discord_id,
  });
};

export default loggedIn;
