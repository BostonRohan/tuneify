import axios from "axios";
import { Request, Response } from "express";
import { client } from "../index";

const loggedIn = async (_req: Request, res: Response) => {
  const error = await client.get("error");
  if (error) res.send({ error });
  else {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me");
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  }
};

export default loggedIn;
