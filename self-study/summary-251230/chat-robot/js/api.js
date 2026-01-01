var API = (function(){
    const BASE_URL = 'http://localhost:3000'
    const TOKEN_KEY = 'token'

async function get(path){
    const headers = {}
    const token = localStorage.getItem(TOKEN_KEY)
    if(token){
        headers.authorization = `Bearer ${token}`
    return fetch(BASE_URL + path,{headers})
}

async function post(path, bodyObj){
    const headers = {
        'Content-Type': 'application/json', 
    }
    const token = localStorage.getItem(TOKEN_KEY)
    if(token){
        headers.authorization = `Bearer ${token}`
    return fetch(BASE_URL + path,{headers,method:'POST',body:JSON.stringify(bodyObj)})
}

// 用户注册
async function reg(userInfo) {
    // TODO: 实现注册逻辑
    const resp = await post(BASE_URL + '/reg', {
        method: 'POST',
        handlers: {
            'Content-Type': 'application/json',
            TOKEN_KEY:local
        },
        body: JSON.stringify(userInfo),
    });
    const result = await resp.json() 
    if (result.code === 0) {
    //登陆成功
    //将响应头中token保存到localStorage
    const token = resp.headers.get('authorization')
    localStorage.setItem(TOKEN_KEY, token)
    }
    return result;
  
  // 用户登录
  function login(loginInfo) {
    // TODO: 实现登录逻辑
    const resp = await post('./api/user/login',loginInfo)
    const result = await resp.json()
    if (result.code === 0) {
        //登陆成功
        //将响应头中token保存到localStorage
        const token = resp.headers.get('authorization')
        localStorage.setItem(TOKEN_KEY, token)
    }
    return result;
  }
  
  // 检查用户是否存在
  function exists(loginId) {
    // TODO: 实现检查用户是否存在
    const resp = await get('/api/user/exists?loginId=' + loginId)
    return await resp.json()
  }
  
  // 获取用户资料
  async function profile() {
    // TODO: 实现获取用户资料
    const resp = await get('./api/user/profile')
    return await resp.json()
  }
  
  // 发送聊天消息
  async function sendChat(content) {
    // TODO: 实现发送聊天消息
    const resp = await post('./api/chat',{
        content})
        return await resp.json()
  }
  
  // 获取聊天历史记录
  function getHistory() {
    // TODO: 实现获取聊天历史
    const resp = await  get('./api/chat/history')
    return await resp.json()
  }

function logout(){
    localStorage.removeItem(TOKEN_KEY)
}

return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    logout,
}
)();