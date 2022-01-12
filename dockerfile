FROM node:16.13.2-alpine

WORKDIR /home/imovel

COPY package.json .

RUN npm install

COPY . .

CMD npm run dev
