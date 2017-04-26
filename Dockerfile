FROM node:boron

RUN npm install gulp -g

WORKDIR /app
VOLUME /app

# Disable gulp-notify notifications
ENV DISABLE_NOTIFIER=true

# enable color in terminal
ENV TERM=xterm-256color

EXPOSE 3000
