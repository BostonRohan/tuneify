import { User } from "@prisma/client";
import unauthorized from "./unauthorized";

interface Error {
  unauthorized: "discord" | "spotify";
}

interface Data {
  access_token: string;
  refresh_token: string;
  expires_in: Date;
  name: string;
  url: string;
  image: string;
}

const isUser = (user: User | null): { data?: Data; error?: Error } => {
  if (user) {
    const { access_token, refresh_token, expires_in, name, url, image } = user;

    if (access_token && refresh_token && expires_in && name && url && image) {
      return {
        data: {
          access_token,
          refresh_token,
          expires_in,
          name,
          url,
          image,
        },
      };
    } else {
      {
        return {
          error: unauthorized("spotify"),
        };
      }
    }
  } else {
    return {
      error: unauthorized("discord"),
    };
  }
};

export default isUser;
