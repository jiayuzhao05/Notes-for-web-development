const dgram = require('dgram')

// UDP 服务器（传输层）
const server = dgram.createSocket('udp4')

server.on('message', (msg, rinfo) => {
  // msg 是 UDP 数据报（不需要连接）
  console.log('收到 UDP 数据报:', msg.toString())
  console.log('来自:', rinfo.address, rinfo.port)
})

server.bind(8080, '0.0.0.0')