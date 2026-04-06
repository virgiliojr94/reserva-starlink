# Use a imagem oficial do Nginx com Alpine Linux para um container menor
FROM nginx:alpine

# Metadados da imagem
LABEL maintainer="virgilio.borges"
LABEL description="Container Docker para o Sistema de Reservas Starlink"
LABEL version="2.0"

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Cria o diretório para os arquivos da aplicação
RUN mkdir -p /usr/share/nginx/html/reserva

# Copia os arquivos da aplicação para o container
COPY reserva-com-planos.html /usr/share/nginx/html/reserva/index.html
COPY config-reserva.js /usr/share/nginx/html/reserva/

# Define permissões adequadas
RUN chown -R nginx:nginx /usr/share/nginx/html/reserva
RUN chmod -R 755 /usr/share/nginx/html/reserva

# Expõe a porta 80
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]