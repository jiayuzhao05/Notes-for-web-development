const http2 = require('http2')

const client = http2.connect('https://localhost:3001', {
  // 允许自签名证书（仅用于开发）
  rejectUnauthorized: false
})

client.on('error', (err) => {
  console.error('connection error:', err)
})

// 发送请求
const req = client.request({
  ':path': '/api/data',
  ':method': 'GET'
})

req.on('response', (headers) => {
  console.log('headers:', headers)
  console.log('HTTP version:', headers[':status'])
})

let data = ''
req.on('data', (chunk) => {
  data += chunk
})

req.on('end', () => {
  console.log('data:', JSON.parse(data))
  client.close()
})

req.end()