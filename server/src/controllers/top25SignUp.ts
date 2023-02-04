import { Request, Response } from "express";
import handleSpreadSheet from "../utils/handleSpreadSheet";
import { prisma } from "../index";

const top25SignUp = async (req: Request, res: Response) => {
  const {
    body: { discord_id, full_name, email },
  } = req;
  try {
    const sheet = await handleSpreadSheet();

    const rows = await sheet.getRows();

    //delete from the bottom up last in, last out
    if (rows.length === 23) {
      rows[0].delete();
    }

    await sheet.addRow({
      name: full_name,
      email,
    });

    await prisma.user.update({
      where: { discord_id },
      data: { email, full_name },
    });

    res.sendStatus(200);
  } catch (error) {
    res.send({ error });
  }
};

export default top25SignUp;
