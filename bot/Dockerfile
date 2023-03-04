    FROM node:alpine
    WORKDIR /usr/spotibot
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npx tsc
    CMD ["node", "./dist/index.js"]