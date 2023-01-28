import { Request } from "express";

export default (req: Request, name: string | null, url: string | null, iconURL: string | null) => {
  name ? req.name = name : req.name = undefined;
  url ? req.url = url : req.url = '';
  iconURL ? req.iconURL = iconURL : req.iconURL = undefined;
};
