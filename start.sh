#!/bin/sh

echo "⏳ Aguardando banco de dados..."

# espera Postgres responder TCP
until nc -z $DB_HOST $DB_PORT; do
  echo "Banco ainda não está pronto..."
  sleep 2
done

echo "✅ Banco disponível!"

echo "🧱 Rodando migrations..."
npm run migrate

echo "🌱 Rodando seeds (opcional)..."
npm run seed

echo "🚀 Iniciando aplicação..."
npm run start