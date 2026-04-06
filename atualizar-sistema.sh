#!/bin/bash
# Script para atualizar e reconstruir o sistema de reservas Starlink

echo "🚀 Atualizando Sistema de Reservas Starlink..."

# 1. Para o container atual
echo "⏹️ Parando container atual..."
docker-compose down

# 2. Reconstrói a imagem com as últimas mudanças
echo "🔨 Reconstruindo imagem Docker..."
docker-compose build --no-cache

# 3. Inicia o novo container
echo "▶️ Iniciando container atualizado..."
docker-compose up -d

# 4. Verifica se o container está rodando
echo "✅ Verificando status..."
docker-compose ps

# 5. Mostra informações úteis
echo ""
echo "📋 Sistema atualizado com sucesso!"
echo "🌐 Acesse: http://localhost:8080/reserva"
echo "🔧 Logs: docker-compose logs -f"
echo "⏹️ Para parar: docker-compose down"
echo ""

# 6. Opcional: Mostra as primeiras linhas dos logs
echo "📊 Últimos logs (5 segundos):"
timeout 5s docker-compose logs -f || echo "Logs finalizados."