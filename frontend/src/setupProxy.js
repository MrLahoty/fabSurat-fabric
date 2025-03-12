const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://46.202.162.95:4000",
      changeOrigin: true,
    })
  );
};
