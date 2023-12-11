FROM node:18
WORKDIR /app
COPY package*.json ./
COPY public ./public
COPY src ./src
COPY tsconfig.json .
RUN npm install
RUN npm run build
CMD ["npx", "http-server-spa", "public", "index.html", "8080"]
