import { Request, Response, NextFunction } from "express";
import { prisma } from "../index";
import getToken from "../utils/getToken";
import setAxiosHeaders from "../utils/setAxiosHeaders";
import isUser from "../utils/isUser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import setReqHeaders from "../utils/setReqHeaders";

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
  const {path} = req;

  if (discord_id) {
    const user = await prisma.user.findUnique({
      where: {
        discord_id,
      },
    });

    const isUserRes = isUser(user);
  
    if ("data" in isUserRes) {
      const { data } = isUserRes;
      //loggedin gets requested on every bot command which was doubling the requests count
      if(path !== '/loggedin'){
      try{
        let currentRequests = data.requests;

        await prisma.user.update({
          where: {
            discord_id
          },
          data: {
            requests: currentRequests +=1
          }
        })
      }catch{
        res.send({error: 'there was an error updating the user requests'});
      }
    }

      const { refresh_token } = jwt.verify(
        data.refresh_token,
        process.env.JWT_SECRET as string
      ) as DecodedRefresh;

      const {expires_in, name, url, image} = data;

      if ( expires_in.getTime() < Math.round(Date.now())) {
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

          setReqHeaders(req, name, url, image);

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

        setReqHeaders(req, name, url, image);

        next();
      }
    } else {
      const {error} = isUserRes;

      res.send({ error });
    }
  } else {
    res.send({ unauthorized: "discord" });
  }
};
export default auth;
