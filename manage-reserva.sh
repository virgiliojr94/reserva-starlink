#!/bin/bash

# Script de gerenciamento do Sistema de Reservas Starlink
# Versão 2.0 - Com planos de preços

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_NAME="starlink-reserva"
CONTAINER_NAME="starlink-reserva"
IMAGE_NAME="starlink-reserva"
PORT="8080"

# Função para mostrar ajuda
show_help() {
    echo -e "${BLUE}Sistema de Reservas Starlink - Gerenciador Docker${NC}"
    echo -e "${BLUE}=================================================${NC}"
    echo ""
    echo "Uso: $0 [COMANDO]"
    echo ""
    echo "COMANDOS DISPONÍVEIS:"
    echo -e "  ${GREEN}start${NC}     - Inicia o container (build se necessário)"
    echo -e "  ${GREEN}stop${NC}      - Para o container"
    echo -e "  ${GREEN}restart${NC}   - Reinicia o container"
    echo -e "  ${GREEN}build${NC}     - Faz build da imagem Docker"
    echo -e "  ${GREEN}rebuild${NC}   - Rebuild completo (remove cache)"
    echo -e "  ${GREEN}logs${NC}      - Mostra logs do container"
    echo -e "  ${GREEN}status${NC}    - Mostra status do container"
    echo -e "  ${GREEN}clean${NC}     - Remove container e imagem"
    echo -e "  ${GREEN}setup${NC}     - Configuração inicial"
    echo -e "  ${GREEN}dev${NC}       - Modo desenvolvimento (com volumes)"
    echo -e "  ${GREEN}help${NC}      - Mostra esta ajuda"
    echo ""
    echo "EXEMPLOS:"
    echo "  $0 start     # Inicia o sistema"
    echo "  $0 logs      # Vê os logs"
    echo "  $0 clean     # Limpa tudo"
    echo ""
    echo -e "${YELLOW}Acesso: http://localhost:${PORT}${NC}"
}

# Função para verificar se Docker está rodando
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo -e "${RED}❌ Docker não está rodando!${NC}"
        exit 1
    fi
}

# Função para verificar se o arquivo de configuração existe
check_config() {
    if [ ! -f "config-reserva.js" ]; then
        echo -e "${YELLOW}⚠️  Arquivo config-reserva.js não encontrado!${NC}"
        echo "Criando arquivo de configuração padrão..."
        create_default_config
    fi
}

# Criar configuração padrão
create_default_config() {
    cat > config-reserva.js << 'EOF'
// Configuração da Página de Reservas Starlink
const CONFIG = {
    whatsappNumber: '5511999999999', // ALTERE AQUI
    businessName: 'Starlink Services',
    messageHeader: '🛰️ *Nova Solicitação de Reserva Starlink*',
    plans: {
        residencial: {
            name: 'Fixo Residencial',
            icon: '🏠',
            description: 'Ideal para residências e uso fixo',
            pricing: { daily: 60.00, weekly: 300.00, monthly: 1110.00 }
        },
        movel: {
            name: 'Móvel/Viagem',
            icon: '🚗',
            description: 'Perfeito para viagens e mobilidade',
            pricing: { daily: 80.00, weekly: 400.00, monthly: 1480.00 }
        }
    },
    reservedDates: ['2025-11-09', '2025-11-10', '2025-11-11', '2025-11-12']
};
window.RESERVA_CONFIG = CONFIG;
EOF
    echo -e "${GREEN}✅ Arquivo de configuração criado!${NC}"
    echo -e "${YELLOW}⚠️  LEMBRE-SE: Edite o número do WhatsApp em config-reserva.js${NC}"
}

# Função para iniciar
start() {
    echo -e "${BLUE}🚀 Iniciando Sistema de Reservas Starlink...${NC}"
    check_docker
    check_config
    
    if ! docker ps -a --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${YELLOW}📦 Container não existe. Fazendo build...${NC}"
        build
    fi
    
    if docker ps --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${GREEN}✅ Container já está rodando!${NC}"
    else
        echo -e "${BLUE}▶️  Iniciando container...${NC}"
        docker-compose up -d
        
        # Aguarda o container ficar pronto
        echo -e "${YELLOW}⏳ Aguardando container ficar pronto...${NC}"
        sleep 3
        
        if docker ps --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
            echo -e "${GREEN}✅ Sistema iniciado com sucesso!${NC}"
            echo -e "${GREEN}🌐 Acesse: http://localhost:${PORT}${NC}"
        else
            echo -e "${RED}❌ Erro ao iniciar container!${NC}"
            exit 1
        fi
    fi
}

# Função para parar
stop() {
    echo -e "${YELLOW}⏹️  Parando Sistema de Reservas Starlink...${NC}"
    check_docker
    docker-compose down
    echo -e "${GREEN}✅ Sistema parado!${NC}"
}

# Função para restart
restart() {
    echo -e "${BLUE}🔄 Reiniciando Sistema de Reservas Starlink...${NC}"
    stop
    start
}

# Função para build
build() {
    echo -e "${BLUE}🔨 Fazendo build da imagem Docker...${NC}"
    check_docker
    check_config
    docker-compose build
    echo -e "${GREEN}✅ Build concluído!${NC}"
}

# Função para rebuild
rebuild() {
    echo -e "${BLUE}🔨 Rebuild completo (sem cache)...${NC}"
    check_docker
    check_config
    docker-compose build --no-cache
    echo -e "${GREEN}✅ Rebuild concluído!${NC}"
}

# Função para ver logs
logs() {
    echo -e "${BLUE}📋 Logs do Sistema de Reservas Starlink:${NC}"
    check_docker
    docker-compose logs -f
}

# Função para mostrar status
status() {
    echo -e "${BLUE}📊 Status do Sistema:${NC}"
    check_docker
    
    if docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -q "^${CONTAINER_NAME}"; then
        echo -e "${GREEN}✅ Container está RODANDO${NC}"
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep "^${CONTAINER_NAME}"
        echo -e "${GREEN}🌐 Acesso: http://localhost:${PORT}${NC}"
    elif docker ps -a --format "table {{.Names}}\t{{.Status}}" | grep -q "^${CONTAINER_NAME}"; then
        echo -e "${YELLOW}⏸️  Container existe mas está PARADO${NC}"
        docker ps -a --format "table {{.Names}}\t{{.Status}}" | grep "^${CONTAINER_NAME}"
    else
        echo -e "${RED}❌ Container NÃO EXISTE${NC}"
    fi
}

# Função para limpeza
clean() {
    echo -e "${YELLOW}🧹 Limpando Sistema de Reservas Starlink...${NC}"
    check_docker
    
    read -p "Tem certeza que deseja remover container e imagem? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v
        docker rmi ${IMAGE_NAME} 2>/dev/null || true
        echo -e "${GREEN}✅ Limpeza concluída!${NC}"
    else
        echo -e "${BLUE}ℹ️  Operação cancelada.${NC}"
    fi
}

# Função para setup inicial
setup() {
    echo -e "${BLUE}🔧 Configuração Inicial do Sistema de Reservas Starlink${NC}"
    echo -e "${BLUE}====================================================${NC}"
    
    check_docker
    
    # Verifica arquivos necessários
    files=("Dockerfile" "docker-compose.yml" "nginx.conf" "reserva-com-planos.html")
    for file in "${files[@]}"; do
        if [ ! -f "$file" ]; then
            echo -e "${RED}❌ Arquivo $file não encontrado!${NC}"
            exit 1
        fi
    done
    
    check_config
    
    # Cria diretório de logs
    mkdir -p logs
    
    echo -e "${GREEN}✅ Setup concluído!${NC}"
    echo ""
    echo -e "${YELLOW}PRÓXIMOS PASSOS:${NC}"
    echo "1. Edite config-reserva.js com seu número do WhatsApp"
    echo "2. Execute: $0 start"
    echo "3. Acesse: http://localhost:${PORT}"
}

# Função para modo desenvolvimento
dev() {
    echo -e "${BLUE}👨‍💻 Iniciando em modo desenvolvimento...${NC}"
    check_docker
    check_config
    
    # Cria versão de desenvolvimento do docker-compose
    cat > docker-compose.dev.yml << 'EOF'
version: "3.8"
services:
  starlink-reserva:
    build: .
    container_name: starlink-reserva-dev
    ports:
      - "8080:80"
    volumes:
      - ./reserva-com-planos.html:/usr/share/nginx/html/reserva/index.html:ro
      - ./config-reserva.js:/usr/share/nginx/html/reserva/config-reserva.js:ro
      - ./logs:/var/log/nginx
    restart: unless-stopped
EOF
    
    docker-compose -f docker-compose.dev.yml up -d
    echo -e "${GREEN}✅ Modo desenvolvimento ativo!${NC}"
    echo -e "${GREEN}🌐 Acesse: http://localhost:${PORT}${NC}"
    echo -e "${YELLOW}ℹ️  Alterações nos arquivos serão refletidas automaticamente${NC}"
}

# Switch principal
case "${1:-}" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    build)
        build
        ;;
    rebuild)
        rebuild
        ;;
    logs)
        logs
        ;;
    status)
        status
        ;;
    clean)
        clean
        ;;
    setup)
        setup
        ;;
    dev)
        dev
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Comando inválido: ${1:-}${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac