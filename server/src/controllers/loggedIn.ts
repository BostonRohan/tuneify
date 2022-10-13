import { Request, Response } from "express";

const loggedIn = async (req: Request, res: Response) => {
  try {
    const { user, userUrl, image } = req;

    res.send({ user, userUrl, image });
  } catch (error) {
    res.send({ error });
  }
};

export default loggedIn;
