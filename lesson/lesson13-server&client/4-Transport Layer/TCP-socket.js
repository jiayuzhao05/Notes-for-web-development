const net = require('net')

// TCP 服务器（传输层）
const server = net.createServer((socket) => {
  // socket 代表一个 TCP 连接
  socket.on('data', (data) => {
    // data 是传输层的"段"（Segment）
    console.log('收到数据段:', data)
    socket.write('服务器响应')  // 封装成 TCP 段发送
  })
})

// 绑定端口号（传输层标识）
server.listen(8080, '0.0.0.0', () => {
  console.log('TCP 服务器监听 0.0.0.0:8080')
})