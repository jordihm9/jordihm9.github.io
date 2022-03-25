FROM node:16.14.0-alpine
WORKDIR /local
COPY package.json yarn.lock .
RUN yarn install
COPY . .
CMD yarn start
EXPOSE 3000
