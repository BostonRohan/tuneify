import { User } from "@prisma/client";
import unauthorized from "./unauthorized";

type RequiredNonNullableObject<T extends object> = { [P in keyof Required<T>]: NonNullable<T[P]>; };


interface Error {
  error: {unauthorized: string}
}

interface Data {
  data: Omit<User, 'access_token'|'refresh_token'|'expires_in' | 'discord_id' | 'spotify_id' | 'requests'> & {
    access_token: string;
    refresh_token: string;
    expires_in: Date;
    requests: number;
  }
}

const isUser = (user: User | null): Data | Error => {
  if(user){

    if(!user?.access_token || !user.refresh_token){
      return {
        error: unauthorized("spotify"),
      };
    } else if(!user?.discord_id){
      return {
        error: unauthorized("discord"),
      };
    } 
     else{
      const { access_token, refresh_token, expires_in, name, url, image, requests} = user;
      return {
        data: {
          access_token,
          refresh_token,
          expires_in: expires_in ?? new Date(Math.round(Date.now()) + 300  * 1000), //5 min
          name,
          url,
          image,
          requests: requests ?? 0
        },
      };
  }
} else{
  return {error: {unauthorized: 'unauthorized on both platforms'}}
}

};

export default isUser;
