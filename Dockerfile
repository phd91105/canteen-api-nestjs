FROM node:14-alpine
WORKDIR /usr/src/app

COPY . .
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
