import { Request, Response } from "express";
import getToken from "../../utils/getToken";
import axios from "axios";
import { prisma } from "../../index";
import spotifyUrl from "../../utils/spotifyUrl";

interface Query {
  code: string | undefined;
}

interface Connection {
  type: string;
  id: string;
  name: string;
  visibility: number;
  friend_sync: Boolean;
  show_activity: Boolean;
  verified: Boolean;
  two_way_link: Boolean;
  metadata_visibility: number;
}

const discordAuth = async (req: Request, res: Response) => {
  const { code } = req.query as unknown as Query;

  try {
    const { access_token, token_type } = await getToken({
      code,
      api: "discord",
    });

    const headers = {
      authorization: `${token_type} ${access_token}`,
    };

    const { data } = await axios.get(
      "https://discord.com/api/users/@me/connections",
      {
        headers,
      }
    );

    const {
      data: { id },
    } = await axios.get("https://discord.com/api/users/@me", {
      headers,
    });

    const discord_id = id;
    const spotify_id = data.find(
      (connection: Connection) => connection.type === "spotify"
    )?.id;

    const user = await prisma.user.findUnique({
      where: {
        discord_id,
      },
    });

    if (!user && spotify_id) {
      await prisma.user.create({
        data: {
          spotify_id,
          discord_id,
        },
      });
      res.redirect(spotifyUrl);
    } else if (user && user.spotify_id && !user.name) {
      res.redirect(spotifyUrl);
    } else {
      res.redirect("https://discord.com/channels/@me");
    }
  } catch {
    res.redirect("https://discord.com/channels/@me");
  }
};

export default discordAuth;
