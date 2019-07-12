const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');

const nextConfig = {};

module.exports = withPlugins([withSass], nextConfig);
