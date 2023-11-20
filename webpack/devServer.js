const apiTarget = process.env.API_URL;

const proxy = {
  '/api': {
    cookieDomainRewrite: 'localhost',
    target: apiTarget,
    logLevel: 'debug',
    changeOrigin: true,
    secure: false,
  },
};

module.exports = {
  compress: true,
  hot: true,
  open: true,
  https: false,
  historyApiFallback: true,
  port: 3005,
  client: {
    overlay: false,
  },
  proxy,
};
