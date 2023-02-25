import { Request, Response } from "express";
import { prisma } from "../index";
import { User } from "../../dist/node_modules/.prisma/client/index";

const top25 = async (req: Request, res: Response) => {
  const {
    body: { discord_id },
  } = req;
  try {
    const users = await prisma.user.findMany({
      select: { discord_id: true },
      orderBy: { requests: "desc" },
    });

    const top25 = users.find((user: User) => user.discord_id === discord_id);

    res.send({ data: top25 ? true : false });
  } catch (error) {
    res.send({ error });
  }
};

export default top25;
