FROM docker.io/debian:12-slim

RUN apt-get update && apt-get install -y curl

# Install NodeJS
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - &&\
    apt-get install -y nodejs

# Install yarn
RUN npm install --global yarn

WORKDIR /application

COPY package.json yarn.lock ./

EXPOSE 3000

RUN yarn install && yarn cache clean --force

COPY . .
