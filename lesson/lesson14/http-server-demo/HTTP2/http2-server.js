const http2 = require('http2')
const fs = require('fs')
const path = require('path')

//SSL/TLS certificate and test using self-signed certificate
const options = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert:fs.readFileSync(path.join(__dirname, 'server.crt'))
}

//HTTP/2 server
const server = http2.createServer(options, (req,res)=>{
    console.log(`request: ${req.url}`)
    console.log(`headers:`, req.headers)
    console.log(`HTTP version: ${req.httpVersion}`)

    if(req.url === '/'){
        res.writeHead(200, {
            'Content-Type':'text/html;charset=utf-8',
            'Connection':'keep-alive'
        })
        res.end(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>HTTP/2 Server</title>
            </head>
            <body>
            <h1>HTTP/2 Server</h1>
            <p>HTTP/2 server using nodejs http2 module</p>
            <p>HTTP/2 feature</p>
            <ul>
                <li>Multiplexing</li>
                <li>Server Push</li>
                <li>Header Compression</li>
                <li>Binary Framing</li>
            </ul>
            <p>transfer layer:TCP</p>
        </body>
    </html>
    `)
} else if(req.url === '/api/data'){
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify({
        message:'HELLO from HTTP/2 Server',
        version:'HTTP/2',
        protocol:'TCP'
    }))
} else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
}

//listening port
server.listen(3000, '0.0.0.0', () => {
    console.log('HTTP/2 Server is running on https://localhost:3000')
    console.log('agreement: HTTP/2')
    console.log('protocol: TCP')
    console.log('HTTP/2 requires HTTPS, please use https:// to access')
})