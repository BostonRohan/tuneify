import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default async (
  discord_id: string,
  time_range: string,
  type: "artists" | "tracks"
) => {
  return await axios.post(`${process.env.API_URL}/top`, {
    discord_id,
    time_range,
    type,
  });
};
