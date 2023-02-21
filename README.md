# Spotibot

Spotify stats in a discord bot!

## Setup

```
$ cd server
$ npm install
$ cd ..
$ cd bot
$ npm install
```

### Now add your envs

`server/ .env`

```
DATABASE_URL= DATABASE_URL
JWT_SECRET= RANDOM_JWT_SECRET
SPOTIFY_CLIENT_ID= SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET= SPOTIFY_CLIENT_SECRET
DISCORD_CLIENT_ID= DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET= DISCORD_CLIENT_SECRET
DISCORD_REDIRECT_URI= DISCORD_REDIREECT_URI
SPOTIFY_REDIRECT_URI= SPOTIFY_REDIRECT_URI
SPREADSHEET_ID= SPREADSHEET_ID
GOOGLE_SERVICE_EMAIL= GOOGLE_SERVICE_EMAIL
GOOGLE_PRIVATE_KEY= GOOGLE_SHEETS_API_KEY
```

`bot/ .env`

```
SPOTIFY_CLIENT_ID= SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET= SPOTIFY_CLIENT_SECRET
DISCORD_AUTH_URL= DISCORD_AUTH_URL
DISCORD_BOT_TOKEN= DISCORD_BOT_TOKEN
TOP_ARTISTS_IMAGE="https://raw.githubusercontent.com/BostonRohan/spotibot/main/bot/public/top_artists.png"
TOP_TRACKS_IMAGE="https://raw.githubusercontent.com/BostonRohan/spotibot/main/bot/public/top_tracks.png"
TOP_GG_URL=""
API_URL= API_URL || YOUR LOCAL HOST PORT ex:"http://localhost:3000"
```

```
$ cd server
$ npm run dev
$ cd ..
$ cd bot
$ npm run dev
```
