FROM gcr.io/google-appengine/nodejs

COPY ./package.json .
COPY ./yarn.lock .

WORKDIR /app

RUN /usr/local/bin/install_node '=10'

RUN npm i -g nodemon

# Install dependencies.
RUN yarn