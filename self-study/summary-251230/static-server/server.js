import http from 'http'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径（ES Module 方式）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 静态资源目录
const publicDir = path.resolve(__dirname, 'public')

// MIME 类型映射
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

/**
 * 获取文件的 MIME 类型
 * @param {string} filePath - 文件路径
 * @returns {string} MIME 类型
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return mimeTypes[ext] || 'application/octet-stream'
}

/**
 * 请求处理函数
 * 根据请求路径响应对应的静态文件
 * @param {http.IncomingMessage} req - 请求对象
 * @param {http.ServerResponse} res - 响应对象
 */
async function handleRequest(req, res) {
  try {
    // 获取请求路径
    let requestPath = req.url
    
    // 处理根路径，映射到 index.html
    if (requestPath === '/') {
      requestPath = '/index.html'
    }
    
    // 构建完整的文件路径
    // path.join 会将路径规范化，防止路径遍历攻击
    const filePath = path.join(publicDir, requestPath)
    
    // 使用 path.resolve 确保路径在 public 目录内（安全检查）
    const resolvedPath = path.resolve(publicDir, path.relative(publicDir, filePath))
    if (!resolvedPath.startsWith(publicDir)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('禁止访问')
      return
    }
    
    // 检查文件是否存在以及是否是文件
    const stats = await fs.stat(resolvedPath)
    
    // 如果是目录，尝试访问 index.html
    if (stats.isDirectory()) {
      const indexPath = path.join(resolvedPath, 'index.html')
      try {
        const indexStats = await fs.stat(indexPath)
        if (indexStats.isFile()) {
          const content = await fs.readFile(indexPath)
          res.writeHead(200, { 
            'Content-Type': getMimeType(indexPath),
            'Content-Length': content.length
          })
          res.end(content)
          return
        }
      } catch (err) {
        // index.html 不存在，继续处理
      }
    }
    
    // 检查是否是文件
    if (!stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('文件未找到')
      return
    }
    
    // 读取文件内容
    const content = await fs.readFile(resolvedPath)
    
    // 设置响应头
    const mimeType = getMimeType(resolvedPath)
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': content.length
    })
    
    // 发送文件内容
    res.end(content)
    
  } catch (error) {
    // 文件不存在或其他错误
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('文件未找到')
    } else {
      console.error('服务器错误:', error)
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('服务器内部错误')
    }
  }
}

// 创建 HTTP 服务器
const server = http.createServer(handleRequest)

// 启动服务器
const PORT = 3000
server.listen(PORT, () => {
  console.log(`静态资源服务器已启动`)
  console.log(`访问地址: http://localhost:${PORT}`)
  console.log(`静态资源目录: ${publicDir}`)
})

