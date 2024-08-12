FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm cache clean -f

RUN npm install --legacy-peer-deps --force

# Install PM2
RUN npm install -g pm2

COPY ./dist ./src

#CMD
CMD ["pm2-runtime", "src/main.js"]