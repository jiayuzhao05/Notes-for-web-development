import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径（ES Module 方式）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

// 解析 JSON 请求体
app.use(express.json())

// 1. 用 express 搭建静态资源服务器
// 将"静态页面"目录作为静态资源目录
const staticPageDir = path.resolve(__dirname, '静态页面')
app.use(express.static(staticPageDir))

// 2. 用 express 路由开发 API 接口

// 2.1 针对用户的操作

// 2.1.1 登录
// POST /api/user/login
// 消息体中传递账号和密码
app.post('/api/user/login', (req, res) => {
  const { loginId, loginPwd } = req.body

  // 简单示例：实际项目中应该查询数据库
  // 这里做简单验证，实际应该连接数据库
  if (!loginId || !loginPwd) {
    return res.json({
      code: 1,
      msg: '账号和密码不能为空'
    })
  }

  // 模拟用户数据（实际应从数据库查询）
  // 这里假设用户存在且密码正确
  const user = {
    id: 1,
    loginId: loginId,
    nickname: '测试用户',
    role: 'common' // 普通用户
  }

  // 登录成功，返回用户信息
  res.json({
    code: 0,
    msg: '登录成功',
    data: user
  })
})

// 2.1.2 注册
// POST /api/user/reg
// 消息体中传递注册信息
// 新注册的用户必定为普通用户
app.post('/api/user/reg', (req, res) => {
  const { loginId, nickname, loginPwd, loginPwdConfirm } = req.body

  // 验证必填字段
  if (!loginId || !nickname || !loginPwd) {
    return res.json({
      code: 1,
      msg: '注册信息不完整'
    })
  }

  // 验证两次密码是否一致
  if (loginPwd !== loginPwdConfirm) {
    return res.json({
      code: 1,
      msg: '两次输入的密码不一致'
    })
  }

  // 模拟注册（实际应保存到数据库）
  // 新注册用户必定为普通用户
  const newUser = {
    id: Date.now(),
    loginId: loginId,
    nickname: nickname,
    role: 'common' // 普通用户
  }

  // 注册成功
  res.json({
    code: 0,
    msg: '注册成功',
    data: newUser
  })
})

// 2.2 针对新闻的操作

// 2.2.1 分页获取新闻
// GET /api/news
// query 中可能传递 page 和 limit
app.get('/api/news', (req, res) => {
  // 获取查询参数
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  // 模拟新闻数据（实际应从数据库查询）
  const allNews = [
    { id: 1, title: '新闻标题1', content: '新闻内容1', createTime: '2024-01-01' },
    { id: 2, title: '新闻标题2', content: '新闻内容2', createTime: '2024-01-02' },
    { id: 3, title: '新闻标题3', content: '新闻内容3', createTime: '2024-01-03' },
    { id: 4, title: '新闻标题4', content: '新闻内容4', createTime: '2024-01-04' },
    { id: 5, title: '新闻标题5', content: '新闻内容5', createTime: '2024-01-05' },
    { id: 6, title: '新闻标题6', content: '新闻内容6', createTime: '2024-01-06' },
    { id: 7, title: '新闻标题7', content: '新闻内容7', createTime: '2024-01-07' },
    { id: 8, title: '新闻标题8', content: '新闻内容8', createTime: '2024-01-08' },
    { id: 9, title: '新闻标题9', content: '新闻内容9', createTime: '2024-01-09' },
    { id: 10, title: '新闻标题10', content: '新闻内容10', createTime: '2024-01-10' },
    { id: 11, title: '新闻标题11', content: '新闻内容11', createTime: '2024-01-11' },
    { id: 12, title: '新闻标题12', content: '新闻内容12', createTime: '2024-01-12' }
  ]

  // 计算分页
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const news = allNews.slice(startIndex, endIndex)
  const total = allNews.length
  const totalPages = Math.ceil(total / limit)

  // 返回分页数据
  res.json({
    code: 0,
    msg: '获取成功',
    data: {
      list: news,
      page: page,
      limit: limit,
      total: total,
      totalPages: totalPages
    }
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器已启动`)
  console.log(`访问地址: http://localhost:${PORT}`)
  console.log(`静态资源目录: ${staticPageDir}`)
})

