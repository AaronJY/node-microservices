FROM node:14

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn global add typescript
RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 80

ENV API_HTTP_PORT=80
ENV IMAGE_DB_CONNECTION_STRING=mongodb://mongo:27017/image

CMD ["npm", "start"]