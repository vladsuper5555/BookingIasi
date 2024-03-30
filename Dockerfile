FROM node:12.16.3

WORKDIR /deploy

ENV PORT 80

COPY . /deploy

RUN cd /deploy/BookingIasi && npm install

RUN npm run devr