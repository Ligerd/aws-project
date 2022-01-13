FROM nginx
RUN mkdir -p /usr/share/nginx/html
COPY /dist /usr/share/nginx/html

WORKDIR /etc/nginx


EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
