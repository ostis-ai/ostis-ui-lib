const apiTarget = process.env.API_URL ?? 'https://dev.financial-dk.semantic.is';

const proxy = {
  '/api': {
    cookieDomainRewrite: 'localhost',
    target: apiTarget,
    // target: 'http://localhost:8000', // устанавливаем вместо target когда хотим работать через localhost, а не dev
    logLevel: 'debug',
    changeOrigin: true,
    secure: false,
  },
  '/login': {
    cookieDomainRewrite: 'localhost',
    target: apiTarget,
    // target: 'http://localhost:8000',
    logLevel: 'debug',
    changeOrigin: true,
    secure: false,
  },
  '/iframe': {
    target: apiTarget,
    // target: 'http://localhost:8000',
    pathRewrite: {
      '^/iframe': '',
    },
    logLevel: 'debug',
    changeOrigin: true,
    secure: false,
  },
  '/static': {
    target: apiTarget,
    // target: 'http://localhost:8000',
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
