import axios from "axios";

export default async (
  discord_id: string,
  time_range: string,
  type: "artists" | "tracks"
) => {
  return await axios.post("http://localhost:8888/top", {
    discord_id,
    time_range,
    type,
  });
};
