import { Request, Response } from "express";
import getToken from "../../utils/getToken";
import axios from "axios";
import { prisma } from "../../index";
import bcrypt from "bcrypt";

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
        access_token: await bcrypt.hash(access_token, 10),
        refresh_token: await bcrypt.hash(refresh_token, 10),
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
