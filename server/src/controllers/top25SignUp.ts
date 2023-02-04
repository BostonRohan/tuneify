import { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";

const top25SignUp = async (req: Request, res: Response) => {
  const {
    body: { full_name, email },
  } = req;
  try {
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_EMAIL ?? "",
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") ?? "",
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();

    //if user is already on the spreadsheet, return their rank
    for (let i = 0; i < rows.length; i++) {
      if (rows[i]._rawData.includes(email)) {
        res.status(200).send({ data: { rank: i + 1 } });
        return;
      }
    }

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
