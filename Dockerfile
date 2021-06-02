FROM node:latest
COPY frontend/src src/
COPY frontend/package.json package.json
RUN yarn install
RUN yarn run build
RUN yarn install -g serve
RUN serve -s build