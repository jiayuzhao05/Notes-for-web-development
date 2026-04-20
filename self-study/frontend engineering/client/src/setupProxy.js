const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware("/res",{
            target: 'http://localhost:3001',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        }),createProxyMiddleware("/api",{
            target:"http://127.0.0.1:7001",
            changeOrigin:true
        }),createProxyMiddleware("/static",{
            target:"http://127.0.0.1:7001",
            changeOrigin:true
        })
    )
}
