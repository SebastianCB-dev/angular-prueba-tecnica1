FROM node:16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm i

COPY . /app

RUN npm run build

# segunda etapa
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/angular-prueba-tecnica1 /usr/share/nginx/html