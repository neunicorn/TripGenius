FROM node:18.16.0

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "start"]
