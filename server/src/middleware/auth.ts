import { Request, Response, NextFunction } from "express";
import getToken from "../utils/getToken";
import setAxiosHeaders from "../utils/setAxiosHeaders";

const auth = async (req: Request, _res: Response, next: NextFunction) => {};
export default auth;
