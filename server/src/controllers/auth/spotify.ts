import { Request, Response } from "express";
import getToken from "../../utils/getToken";
import axios from "axios";
import { prisma } from "../../index";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface Query {
  code: string | undefined;
}

const spotifyAuth = async (req: Request, res: Response) => {
  const { code } = req.query as unknown as Query;

  try {
    const { access_token, refresh_token, expires_in } = await getToken({
      code,
      api: "spotify",
    });

    const {
      data: {
        id,
        display_name,
        images,
        external_urls: { spotify },
      },
    } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const spotify_id = id;

    await prisma.user.update({
      where: {
        spotify_id,
      },
      data: {
        access_token: jwt.sign(
          { access_token },
          process.env.JWT_SECRET as string,
          { expiresIn: Math.round(Date.now() / 1000) + expires_in }
        ),
        refresh_token: jwt.sign(
          { refresh_token },
          process.env.JWT_SECRET as string
        ),
        name: display_name,
        image: images[0].url,
        url: spotify,
        expires_in: new Date(Math.round(Date.now()) + expires_in * 1000),
      },
    });

    res.redirect("https://discord.com/channels/@me");
  } catch {
    res.redirect("https://discord.com/channels/@me");
  }
};

export default spotifyAuth;
