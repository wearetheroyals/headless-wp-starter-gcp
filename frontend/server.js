/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const next = require('next');
const proxyMiddleware = require('http-proxy-middleware');

const proxy = {
  '/graphql': {
    target: process.env.WORDPRESS_PATH || 'http://wordpress-522:8080',
    pathRewrite: { '^/graphql': '/graphql' },
    changeOrigin: true,
  },
};

const env = process.env.NODE_ENV || 'dev';
const dev = env !== 'production';
const app = next({
  dir: './src', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

app.prepare().then(async () => {
  try {
    const server = express();
    server.use(cors());
    server.use(compression());

    // Set up the proxy.
    Object.keys(proxy).map(context => {
      server.use(proxyMiddleware(context, proxy[context]));
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    await server.listen(process.env.PORT);

    console.log(`> Ready on port ${process.env.PORT} [${env}]`);
  } catch (ex) {
    console.error('An error occurred, unable to start the server');
    console.error(ex.stack);
    process.exit(1);
  }
});
