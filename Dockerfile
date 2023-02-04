FROM node:19-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:19-alpine as image

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]
