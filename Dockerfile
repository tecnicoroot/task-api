# Etapa 1: build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x start.sh
RUN npm run build

# Etapa 2: runtime
FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/start.sh ./start.sh

RUN chmod +x start.sh

EXPOSE 3000

CMD ["sh", "start.sh"]