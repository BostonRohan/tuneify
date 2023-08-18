# Tuneify

Spotify stats in a discord bot!

Reach out to have your account added to the authorized users list - currently undergoing compliance with spotify

![Top Artists Command Tuneify](https://raw.githubusercontent.com/BostonRohan/tuneify/main/bot/public/top_artists.png "Top Artists")

![Top Tracks Command Tuneify](https://raw.githubusercontent.com/BostonRohan/tuneify/main/bot/public/top_tracks.png "Top Tracks")

![Now Playing Command Tuneify](https://raw.githubusercontent.com/BostonRohan/tuneify/main/bot/public/now_playing.png "Now Playing")

![Queue Command Tuneify](https://raw.githubusercontent.com/BostonRohan/tuneify/main/bot/public/queue.png "Queue")

![Recently Played Command Tuneify](https://raw.githubusercontent.com/BostonRohan/tuneify/main/bot/public/recently_played.png "Recently Played")

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
DISCORD_REDIRECT_URI= DISCORD_REDIRECT_URI
SPOTIFY_REDIRECT_URI= SPOTIFY_REDIRECT_URI
```

`bot/ .env`

```
SPOTIFY_CLIENT_ID=SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET=SPOTIFY_CLIENT_SECRET
DISCORD_AUTH_URL=DISCORD_AUTH_URL
DISCORD_BOT_TOKEN= DISCORD_BOT_TOKEN
API_URL= API_URL || YOUR LOCAL HOST PORT ex:"http://localhost:3000"
```

```
$ cd server
$ npm run dev
$ cd ..
$ cd bot
$ npm run dev
```
