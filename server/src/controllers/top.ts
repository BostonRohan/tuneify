import axios from "axios";
import { Request, Response } from "express";

const top = async (req: Request, res: Response) => {
  const { type, time_range } = req.body;
  try {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=10`
    );
    res.send(data);
  } catch (error) {
    res.send({ error });
  }
};

export default top;
