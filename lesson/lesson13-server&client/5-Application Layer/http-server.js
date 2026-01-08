// 应用层：处理 HTTP 请求和响应
const express = require('express')
const app = express()

// HTTP 协议处理
app.get('/', (req, res) => {
  // 应用层数据：HTML、JSON 等
  res.send('<h1>Hello World</h1>')
})

app.post('/api/data', (req, res) => {
  // 应用层数据：JSON 格式
  res.json({ message: 'Hello from API' })
})

app.listen(3000, '0.0.0.0')