const net = require('net')

// TCP 客户端（传输层）
const client = new net.Socket()
client.connect(8080, '192.168.0.226', () => {
  // 建立 TCP 连接（三次握手）
  console.log('已连接到服务器')
  client.write('客户端数据')  // 发送 TCP 段
})

client.on('data', (data) => {
  console.log('收到响应段:', data.toString())
  client.destroy()  // 关闭连接（四次挥手）
})