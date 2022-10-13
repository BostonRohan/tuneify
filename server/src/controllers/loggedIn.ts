import { Request, Response } from "express";

const loggedIn = async (req: Request, res: Response) => {
  try {
    const { name, url, iconURL } = req;

    res.send({ name, url, iconURL });
  } catch (error) {
    res.send({ error });
  }
};

export default loggedIn;
