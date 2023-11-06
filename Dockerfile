FROM ubuntu:22.04
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8081
CMD ["http-server", "dist"]
