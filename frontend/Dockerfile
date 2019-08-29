FROM gcr.io/google-appengine/nodejs

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

COPY ./.babelrc .
COPY ./next.config.js .
COPY ./nodemon.json .
COPY ./postcss.config.js .
COPY ./tsconfig.json .
COPY ./server.js .

RUN /usr/local/bin/install_node '=10'

RUN npm i -g nodemon

# Install dependencies.
RUN yarn