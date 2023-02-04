import { Request, Response } from "express";
import handleSpreadSheet from "../utils/handleSpreadSheet";
import { prisma } from "../index";

const top25SignedUp = async (req: Request, res: Response) => {
  const {
    body: { discord_id },
  } = req;
  try {
    const userHasEmailAndFullName = await prisma.user.findUnique({
      where: { discord_id },
      select: { email: true, full_name: true },
    });

    if (userHasEmailAndFullName) {
      const sheet = await handleSpreadSheet();
      const rows = await sheet.getRows();
      const { email, full_name } = userHasEmailAndFullName;

      for (let i = 0; i < rows.length; i++) {
        if (rows[i]._rawData.includes(email)) {
          res.send({ data: true });
          return;
        }
      }

      if (email && full_name) {
        if (rows.length === 23) {
          rows[0].delete();
        }

        await sheet.addRow({
          name: full_name,
          email,
        });
        res.send({ data: true });
        return;
      }
    }
    res.sendStatus(500);
  } catch (error) {
    res.send({ error });
  }
};

export default top25SignedUp;
