FROM node:12.18.1

WORKDIR /deploy

ENV PORT 80

COPY . /deploy

RUN cd /deploy/BookingIasi && npm install

RUN cd /deploy/BookingIasi && npm run dev