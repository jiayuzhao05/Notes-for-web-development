// 静态资源中的 js 是在客户端（浏览器）运行的
// 因此这些函数需要使用 fetch API 向服务器发送请求

/**
 * 获取新闻列表（分页）
 * @param {Object} params - 分页参数
 * @param {number} params.page - 页码（可选，默认为1）
 * @param {number} params.limit - 每页数量（可选，默认为10）
 * @returns {Promise<Object>} 返回新闻列表数据
 */
async function getNews(params = {}) {
  // 构建查询参数
  const { page = 1, limit = 10 } = params
  const queryString = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  }).toString()

  try {
    // 发送 GET 请求到 /api/news
    const response = await fetch(`/api/news?${queryString}`)
    const result = await response.json()
    return result
  } catch (error) {
    console.error('获取新闻失败:', error)
    return {
      code: 1,
      msg: '获取新闻失败',
      data: null
    }
  }
}

/**
 * 用户注册
 * @param {Object} userInfo - 用户注册信息
 * @param {string} userInfo.loginId - 账号
 * @param {string} userInfo.nickname - 昵称
 * @param {string} userInfo.loginPwd - 密码
 * @param {string} userInfo.loginPwdConfirm - 确认密码
 * @returns {Promise<Object>} 返回注册结果
 */
async function reg(userInfo) {
  try {
    // 发送 POST 请求到 /api/user/reg
    // 消息体中传递注册信息
    const response = await fetch('/api/user/reg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error('注册失败:', error)
    return {
      code: 1,
      msg: '注册失败',
      data: null
    }
  }
}

/**
 * 用户登录
 * @param {Object} loginInfo - 登录信息
 * @param {string} loginInfo.loginId - 账号
 * @param {string} loginInfo.loginPwd - 密码
 * @returns {Promise<Object>} 返回登录结果
 */
async function login(loginInfo) {
  try {
    // 发送 POST 请求到 /api/user/login
    // 消息体中传递账号和密码
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error('登录失败:', error)
    return {
      code: 1,
      msg: '登录失败',
      data: null
    }
  }
}

