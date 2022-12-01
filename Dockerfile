FROM gitlab-registry.proxym-group.net/docker/nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY dist/bss/ .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 
