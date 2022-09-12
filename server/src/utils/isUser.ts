import { User } from "@prisma/client";
import unauthorized from "./unauthorized";

interface Error {
  unauthorized: "discord" | "spotify";
}

interface Data {
  access_token: string;
  refresh_token: string;
  expires_in: Date;
}

const isUser = (user: User | null): { data?: Data; error?: Error } => {
  if (user) {
    const { access_token, refresh_token, expires_in } = user;

    if (access_token && refresh_token && expires_in) {
      return {
        data: {
          access_token,
          refresh_token,
          expires_in,
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
