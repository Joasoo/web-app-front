const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://fakebook.servebeer.com/',
            changeOrigin: true,
        })
    )
}
