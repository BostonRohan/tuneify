import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      name?: string;
      iconURL?: string;
      url?: string;
    }
  }
}
