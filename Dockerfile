FROM nginx:1.27-alpine

COPY front-end/index.html /usr/share/nginx/html/index.html
COPY css/ /usr/share/nginx/html/css/
COPY script/ /usr/share/nginx/html/script/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
