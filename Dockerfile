#
## Step 1: Build The React App
FROM node:14.15.4 AS builder
WORKDIR /usr/src/app
COPY . .
RUN ls -la

RUN npm install \
    && npm run build \
    && ls -la build/ \
    && rm -rf node_modules \
    && ls -la

# 
## Stage 2:  Production Image
FROM nginx:1.22.0
COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html

# Overide Nginx Config for trying index.html file instead of nginx error
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN ls -la

RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
        
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]