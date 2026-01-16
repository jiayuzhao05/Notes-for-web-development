//使用 node 完成 http1 写法 http2 写法
const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Connection':'keep-alive' //HTTP1.1支持长连接
    })

    if(req.url === '/'){
        res.end(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>HTTP/1.1 Server</title>
            </head>
            <body>
            <h1>HTTP/1.1 Server</h1>
            <p>HTTP/1.1 server using nodejs http module</p>
            <p>request method: ${req.method}</p>
            <p>request url: ${req.url}</p>
        </body>
    </html>
    `)
} else if(req.url === '/api/data'){
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify({
        message:'HELLO from HTTP/1.1 Server',
        version:'HTTP/1.1',
        protocol:'TCP'
    }))
} else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
}
})

// 监听端口
server.listen(3000, '0.0.0.0', () => {
    console.log('HTTP/1.1 Server is running on http://localhost:3000')
    console.log('agreement: HTTP/1.1')
    console.log('protocol: TCP')
})

//method2：express