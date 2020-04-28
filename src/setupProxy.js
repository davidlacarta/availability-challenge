const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    proxy({
      target: process.env.REACT_APP_BASE_API_URL,
      pathRewrite: {
        '^/api': '/'
      },
      changeOrigin: true
    })
  );
};
