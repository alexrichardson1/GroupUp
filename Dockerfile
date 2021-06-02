FROM node:latest
COPY frontend/src src/
COPY frontend/package.json package.json
RUN npm install
RUN npm run build
RUN npm install -g serve
RUN serve -s build