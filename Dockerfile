FROM node:18
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
COPY public ./public
COPY src ./src
COPY tsconfig.json .
RUN npm install
RUN npm run build
CMD ["http-server", "build"]
