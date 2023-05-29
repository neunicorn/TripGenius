FROM node:18.16.0

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 5000

EXPOSE 5000

CMD ["npm", "run", "start"]
