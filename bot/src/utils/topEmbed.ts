import { EmbedBuilder } from "discord.js";
import toTitleCase from "./toTitleCase";

export default (
  type: "Artists" | "Tracks",
  username: string,
  range: string,
  thumbnail: string,
  name: string,
  url: string,
  iconURL: string,
  avatar: string | null,
  avatarURL: string
) => {
  return new EmbedBuilder()
    .setColor(0xdb954)
    .setTitle(`${username}'s Top Spotify ${type}`)
    .setDescription(`*${toTitleCase(range.replace(/_/g, " "))}*`)
    .setThumbnail(thumbnail)
    .setAuthor({
      name,
      iconURL,
      url,
    })
    .setFooter({
      text: username,
      ...(avatar && { iconURL: avatarURL }),
    })
    .setTimestamp();
};
