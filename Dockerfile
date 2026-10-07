FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/security-headers.conf
COPY front-end/index.html /usr/share/nginx/html/index.html
COPY robots.txt sitemap.xml /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY script/ /usr/share/nginx/html/script/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
