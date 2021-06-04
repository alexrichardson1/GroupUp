FROM node:latest
COPY frontend/ frontend/
RUN cd frontend
RUN yarn install
RUN yarn run build
RUN yarn install -g serve
RUN serve -s build
RUN cd ..
COPY backend/src src/
COPY backend/package.json package.json
RUN yarn install
CMD yarn run start