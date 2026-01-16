const http = require('http')

// GET 
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/data',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

const req = http.request(options, (res) => {
  console.log(`status code: ${res.statusCode}`)
  console.log(`headers:`, res.headers)
  
  let data = ''
  res.on('data', (chunk) => {
    data += chunk
  })
  
  res.on('end', () => {
    console.log('data:', JSON.parse(data))
  })
})

req.on('error', (error) => {
  console.error('request error:', error)
})

req.end()