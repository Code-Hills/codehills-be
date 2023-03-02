FROM node:19-alpine3.15
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 5001
CMD yarn start
