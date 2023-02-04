import { Request, Response } from "express";
import handleSpreadSheet from "../utils/handleSpreadSheet";

const top25SignUp = async (req: Request, res: Response) => {
  const {
    body: { full_name, email },
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

    res.sendStatus(200);
  } catch (error) {
    res.send({ error });
  }
};

export default top25SignUp;
