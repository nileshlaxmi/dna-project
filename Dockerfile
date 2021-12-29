FROM node:12 as builder
WORKDIR /app
COPY ./ .
RUN yarn cache clean
RUN yarn install
RUN yarn run build
FROM nginx:1.18.0
USER root
#RUN apt update -y
#RUN apt upgrade -y
RUN apt-get update && apt-get install curl wget -y
RUN apt-get update && apt-get install unattended-upgrades -y
RUN unattended-upgrade
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
RUN chown -R nginx:nginx /var/log/nginx
RUN chown -R nginx:nginx /var/cache
RUN chown -R nginx:nginx /etc/nginx
RUN touch /run/nginx.pid
RUN chown nginx:nginx /run/nginx.pid
RUN chown -R nginx:nginx /usr/share/nginx/html
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 9000
USER nginx
CMD ["nginx", "-g", "daemon off;"]
