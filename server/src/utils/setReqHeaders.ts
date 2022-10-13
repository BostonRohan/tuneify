import { Request } from "express";

export default (req: Request, name: string, url: string, iconURL: string) => {
  req.name = name;
  req.url = url;
  req.iconURL = iconURL;
};
