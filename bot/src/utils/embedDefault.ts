import { EmbedBuilder } from "discord.js";

export default (
  thumbnail: string,
  name: string,
  iconURL: string,
  url: string,
  username: string,
  avatar: string | null,
  avatarURL: string
) => {
  return new EmbedBuilder()
    .setColor(0xdb954)
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
