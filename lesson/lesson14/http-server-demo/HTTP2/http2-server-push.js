const http2 = require('http2')
const fs = require('fs')
const path = require('path')

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
}

const server = http2.createSecureServer(options, (req, res) => {
  if (req.url === '/') {
    // 服务器推送：主动推送 CSS 文件
    res.pushStream({ ':path': '/style.css' }, (err, pushStream) => {
      if (err) {
        console.error('推送失败:', err)
        return
      }
      pushStream.respond({
        'content-type': 'text/css',
        ':status': 200
      })
      pushStream.end('body { background-color: #f0f0f0; }')
    })
    
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/style.css">
          <title>HTTP/2 Server Push</title>
        </head>
        <body>
          <h1>HTTP/2 server push example</h1>
          <p>CSS files are sent proactively via server push without a browser request</p>
        </body>
      </html>
    `)
  }
})

server.listen(3001, () => {
  console.log('HTTP/2 server with push is running on https://localhost:3001')
})