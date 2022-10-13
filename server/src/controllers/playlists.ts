import axios from "axios";
import { Request, Response } from "express";

const playlists = async (_req: Request, res: Response) => {
  try {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/playlists?limit=10`
    );
    res.send(data);
  } catch (error) {
    res.send({ error });
  }
};

export default playlists;
