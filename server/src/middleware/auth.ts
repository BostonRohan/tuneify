import { Request, Response, NextFunction } from "express";
import { client } from "../index";
import getToken from "../utils/getToken";
import setAxiosHeaders from "../utils/setAxiosHeaders";

const auth = async (req: Request, _res: Response, next: NextFunction) => {
  const { code } = req.query;

  const access = await client.get("access");
  const tokenExpiresAt = await client.get("tokenExpiresAt");
  const refresh = await client.get("refresh");

  if (!code && !access) next();

  if (access && tokenExpiresAt && Math.round(Date.now()) < +tokenExpiresAt) {
    setAxiosHeaders(access);
  } else {
    const { access_token, refresh_token, expires_in, error } = await getToken(
      code as string | undefined,
      refresh
    );

    client.set("access", access_token);
    client.set("refresh", refresh_token);
    client.set(
      "tokenExpiresAt",
      (Math.round(Date.now()) + expires_in * 1000).toString()
    );
    client.set("error", error);
  }
  next();
};
export default auth;
