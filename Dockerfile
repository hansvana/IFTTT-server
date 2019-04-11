FROM keymetrics/pm2:latest-alpine

WORKDIR /var/www
COPY package.json /var/www/package.json
COPY pm2.json /var/www/pm2.json

RUN npm install

EXPOSE 12345

CMD ["pm2-runtime", "start", "pm2.json"]
