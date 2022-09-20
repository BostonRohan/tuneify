import { Request, Response, NextFunction } from "express";
import { prisma } from "../index";
import getToken from "../utils/getToken";
import setAxiosHeaders from "../utils/setAxiosHeaders";
import isUser from "../utils/isUser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface DecodedAccess {
  access_token: string;
  iat: number;
  exp: number;
}

interface DecodedRefresh {
  refresh_token: string;
  iat: number;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const {
    body: { discord_id },
  } = req;

  if (discord_id) {
    const user = await prisma.user.findUnique({
      where: {
        discord_id,
      },
    });

    const { error, data } = isUser(user);

    if (data) {
      const { expires_in } = data;

      const { refresh_token } = jwt.verify(
        data.refresh_token,
        process.env.JWT_SECRET as string
      ) as DecodedRefresh;

      if (expires_in.getTime() < Math.round(Date.now())) {
        try {
          const { access_token, expires_in } = await getToken({
            api: "spotify",
            refresh_token,
          });

          await prisma.user.update({
            where: {
              discord_id,
            },
            data: {
              access_token: jwt.sign(
                { access_token },
                process.env.JWT_SECRET as string,
                { expiresIn: expires_in }
              ),
              expires_in: new Date(Math.round(Date.now()) + expires_in * 1000),
            },
          });

          setAxiosHeaders(access_token);

          next();
        } catch (error) {
          res.send({ error });
        }
      } else {
        const { access_token } = jwt.verify(
          data.access_token,
          process.env.JWT_SECRET as string
        ) as DecodedAccess;

        setAxiosHeaders(access_token);
        next();
      }
    } else {
      res.send({ error });
    }
  } else {
    res.send({ unauthorized: "discord" });
  }
};
export default auth;
