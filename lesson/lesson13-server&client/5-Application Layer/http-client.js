// 应用层：发起 HTTP 请求
fetch('http://192.168.0.226:3000/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // 应用层头部
    },
    body: JSON.stringify({ data: 'test' })  // 应用层数据
  })