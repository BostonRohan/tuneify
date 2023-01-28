import { EmbedBuilder } from "discord.js";

export default (
  thumbnail: string,
  name: string | null,
  iconURL: string | null,
  url: string | null,
  username: string,
  avatar: string | null,
  avatarURL: string
) => {
  const embed = new EmbedBuilder();
  if(name && iconURL && url){
    embed.setAuthor({
      name,
      iconURL,
      url,
    })
  }
  return embed
    .setColor(0xdb954)
    .setThumbnail(thumbnail)
    .setFooter({
      text: username,
      ...(avatar && { iconURL: avatarURL }),
    })
    .setTimestamp();
};
