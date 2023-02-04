import { EmbedBuilder } from "discord.js";

export default (username: string, avatar: string | null, avatarURL: string) =>
  new EmbedBuilder()
    .setTitle("Would you like to use this feature?")
    .setColor(0xdb954)
    .setDescription(
      "Unfortunately this feature is reserved for the top 25 users of spotibot: \n [Please see here for more information](https://developer.spotify.com/community/news/2021/05/27/improving-the-developer-and-user-experience-for-third-party-apps/) or contact me at `Boss#3167`"
    )
    .setTimestamp()
    .setFooter({
      text: username,
      ...(avatar && { iconURL: avatarURL }),
    });
