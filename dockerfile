FROM node:12-alpine

# create destination directory
WORKDIR /usr/src/app

# copy "package.json" and "package-lock.json" before other files
# utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# install dependencies
RUN npm i

# copy the rest of the files
COPY ./ ./

# build is necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 80 on container
EXPOSE 80

# set app port
ENV PORT=80

# start the app
CMD [ "npm", "run", "serve" ]
