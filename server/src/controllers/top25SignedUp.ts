import { Request, Response } from "express";
import handleSpreadSheet from "../utils/handleSpreadSheet";

const top25SignedUp = async (req: Request, res: Response) => {
  const {
    body: { email },
  } = req;
  try {
    const rows = await (await handleSpreadSheet()).getRows();

    for (let i = 0; i < rows.length; i++) {
      if (rows[i]._rawData.includes(email)) {
        res.send({ data: true });
        return;
      }
    }
    res.send({ data: false });
  } catch (error) {
    res.send({ error });
  }
};

export default top25SignedUp;
