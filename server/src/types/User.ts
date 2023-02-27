export type User = {
  spotify_id: string;
  discord_id: string;
  name: string | null;
  access_token: string | null;
  refresh_token: string | null;
  expires_in: Date | null;
  url: string | null;
  image: string | null;
  requests: number | null;
  email: string | null;
  full_name: string | null;
};
