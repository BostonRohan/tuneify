
import { Request, Response } from "express";
import { prisma } from "../index";

const top25 = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({select: {discord_id: true}, orderBy: {requests: 'desc'}});
    res.send(users.slice(0, 24));
  } catch (error) {
    res.send({ error });
  }
};

export default top25;
