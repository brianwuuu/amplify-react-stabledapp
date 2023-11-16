//https://mko6b9drb2.execute-api.us-east-1.amazonaws.com/test/stabled

const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
  target: 'https://qm2x97ii2c.execute-api.us-east-2.amazonaws.com/',
  changeOrigin: true,
};
module.exports = function (app) {
  app.use('/test', createProxyMiddleware(proxy));
};
