const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');

const nextConfig = { distDir: '../build' };

module.exports = withPlugins([withSass], nextConfig);
