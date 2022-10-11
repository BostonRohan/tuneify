import axios from "axios";
import { Request, Response } from "express";

const queue = async (_req: Request, res: Response) => {
  try {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/player/queue`
    );
    res.send(data);
  } catch (error) {
    res.send({ error });
  }
};

export default queue;
