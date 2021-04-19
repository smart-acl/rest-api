# TODO: Add multistage to dev and prod agent builds
FROM node:14

RUN apt-get update -y && \
    apt-get install -y nginx supervisor && \
    chown -R www-data:www-data /var/lib/nginx && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY . .

COPY ./etc/nginx/stable-locations /etc/nginx/
COPY ./etc/nginx/unstable-locations /etc/nginx/
COPY ./etc/nginx/sites-available/agent.conf /etc/nginx/sites-enabled/
COPY ./etc/nginx/index-location /etc/nginx/

COPY ./etc/supervisord/app.conf /etc/supervisor/conf.d/

RUN npm install && npm run build

CMD npm run start:prod
