# 🚀 Controle de Reservas Starlink

Sistema web para controle de reservas de serviços Starlink com calendário interativo.

## ✨ Status do Projeto
- ✅ **Funcionando corretamente**
- ✅ **Modo local ativo**
- ✅ **Interface responsiva**
- ✅ **Armazenamento automático**

## 🚀 Funcionalidades

- **Calendário interativo**: Visualização mensal com navegação
- **Controle de reservas**: Clique nos dias para alternar entre disponível/reservado
- **Destaque do dia atual**: O dia de hoje é destacado com borda azul
- **Persistência de dados**: Armazenamento local ou na nuvem (Firebase)
- **Interface responsiva**: Funciona em desktop e dispositivos móveis
- **Dados de exemplo**: Pré-configurado com algumas reservas de demonstração

O script `starlink-docker.sh` facilita todas as operações:

```bash
# Dar permissão de execução (primeira vez)
chmod +x starlink-docker.sh

# Construir a imagem
./starlink-docker.sh build

# Iniciar o container
./starlink-docker.sh start

# Ver logs em tempo real
./starlink-docker.sh logs

# Verificar status
./starlink-docker.sh status

# Reiniciar o container
./starlink-docker.sh restart

# Parar o container
./starlink-docker.sh stop

# Modo desenvolvimento (com volumes)
./starlink-docker.sh dev

# Limpeza completa
./starlink-docker.sh clean

# Ver ajuda
./starlink-docker.sh help
```

### Método 2: Docker Compose Direto

```bash
# Construir e iniciar
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

### Método 3: Docker Direto

```bash
# Construir imagem
docker build -t starlink-calendar .

# Executar container
docker run -d \
  --name starlink-reservas \
  -p 8080:80 \
  starlink-calendar
```

## 🌐 Acesso à Aplicação

Após iniciar o container, acesse:

- **URL Principal**: http://localhost:8080
- **Aplicação**: http://localhost:8080/starlink/

## 🔧 Configurações Avançadas

### Personalizar Porta

Para usar uma porta diferente, edite o `docker-compose.yml`:

```yaml
ports:
  - "3000:80"  # Muda para porta 3000
```

### Volumes para Desenvolvimento

Para desenvolvimento ativo, descomente as linhas de volume no `docker-compose.yml`:

```yaml
volumes:
  - ./reserva-starlink.html:/usr/share/nginx/html/starlink/index.html:ro
  - ./firebase-config.js:/usr/share/nginx/html/starlink/firebase-config.js:ro
```

### Configurações do Nginx

Edite `nginx.conf` para:
- Alterar configurações de cache
- Adicionar headers de segurança
- Configurar SSL/TLS
- Adicionar redirects

## 📊 Monitoramento

### Health Check

O container inclui um health check automático que verifica se o Nginx está respondendo.

```bash
# Verificar saúde do container
docker inspect starlink-reservas | grep -A 10 "Health"
```

### Logs

```bash
# Logs do Nginx
docker-compose exec starlink-calendar tail -f /var/log/nginx/starlink_access.log

# Logs de erro
docker-compose exec starlink-calendar tail -f /var/log/nginx/starlink_error.log
```

## 🔒 Segurança

### Headers de Segurança

O Nginx está configurado com headers básicos de segurança:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`

### Rede Isolada

O container roda em uma rede Docker isolada (`starlink-network`).

## 🐛 Troubleshooting

### Container não inicia

```bash
# Verificar logs de erro
docker-compose logs starlink-calendar

# Verificar se a porta está ocupada
netstat -tulpn | grep 8080
```

### Firebase não conecta

1. Verifique se `firebase-config.js` está configurado corretamente
2. Confirme se as regras do Firestore permitem acesso
3. Verifique se o domínio está autorizado no Firebase

### Problemas de Cache

```bash
# Forçar rebuild sem cache
docker-compose build --no-cache

# Limpar cache do Docker
docker system prune -a
```

## 📈 Performance

### Otimizações Incluídas

- **Gzip**: Compressão automática de arquivos
- **Cache**: Headers de cache apropriados
- **Imagem Alpine**: Container base menor
- **Multi-stage**: Build otimizado

### Métricas

```bash
# Uso de recursos
docker stats starlink-reservas

# Tamanho da imagem
docker images starlink-calendar
```

## 🔄 Atualizações

Para atualizar a aplicação:

```bash
# Método 1: Script
./starlink-docker.sh stop
./starlink-docker.sh build
./starlink-docker.sh start

# Método 2: Docker Compose
docker-compose down
docker-compose up -d --build
```

## 📝 Desenvolvimento

### Estrutura de Arquivos

- `Dockerfile`: Define a imagem base e configurações do container
- `nginx.conf`: Configuração completa do servidor web
- `docker-compose.yml`: Orquestração e configuração de serviços
- `firebase-config.js`: Configurações externas do Firebase
- `starlink-docker.sh`: Script utilitário para gerenciamento

### Customização

Para adicionar funcionalidades:

1. Modifique `reserva-starlink.html`
2. Atualize `nginx.conf` se necessário
3. Reconstrua a imagem
4. Teste em modo desenvolvimento primeiro

## 📞 Suporte

Para problemas ou dúvidas:

1. Verifique os logs: `./starlink-docker.sh logs`
2. Confirme a configuração do Firebase
3. Teste com `./starlink-docker.sh dev` para debug

## 📄 Licença

Este projeto é para uso interno da SEFAZ.

---

**Autor**: Virgilio Monteiro  
**Data**: 9 de novembro de 2025  
**Versão**: 1.0