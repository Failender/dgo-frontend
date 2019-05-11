

RUN mkdir -p /usr/src/app/app/
WORKDIR /usr/src/app/app
COPY app/package.json /usr/src/app/app
RUN npm set loglevel warn --global
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build

FROM nginx:1.13-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/app/dist/* /usr/share/nginx/html/
