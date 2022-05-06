FROM node:16-alpine

WORKDIR /app

RUN npm i -g pm2

COPY package.json .
RUN npm i

COPY . .
RUN npm run build

RUN chmod +x entrypoint.sh

CMD ["/app/entrypoint.sh"]