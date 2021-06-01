FROM node:13
EXPOSE 3001
WORKDIR /usr/app
COPY package.json /usr/app/package.json
COPY package-lock.json /usr/app/package-lock.json
RUN npm ci
COPY . /usr/app
CMD npm run start
