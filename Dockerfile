FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --silent
COPY . .
RUN npm run build
# RUN npm run build
# ENV NODE_ENV=production
# EXPOSE 3000
# CMD ["npx", "serve", "build"]
# CMD ["npm", "start"]

FROM nginx:alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html





