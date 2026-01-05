# 静态资源服务器（Express 实现）

基于 Express 框架实现的静态资源服务器，包含用户和新闻相关的 API 接口。

## 功能

### 1. 静态资源服务器

使用 Express 的 `express.static` 中间件搭建静态资源服务器，将 `静态页面` 目录作为静态资源目录。

### 2. API 接口

#### 2.1 用户操作

- **POST /api/user/login** - 用户登录
  - 请求体：`{ loginId: string, loginPwd: string }`
  - 响应：`{ code: number, msg: string, data: object }`

- **POST /api/user/reg** - 用户注册
  - 请求体：`{ loginId: string, nickname: string, loginPwd: string, loginPwdConfirm: string }`
  - 响应：`{ code: number, msg: string, data: object }`
  - 新注册的用户必定为普通用户（role: 'common'）

#### 2.2 新闻操作

- **GET /api/news** - 分页获取新闻
  - 查询参数：`?page=1&limit=10`（可选）
  - 响应：`{ code: number, msg: string, data: { list: Array, page: number, limit: number, total: number, totalPages: number } }`

### 3. 客户端函数

在 `/js/practice.js` 文件中实现了以下函数（在客户端运行）：

- `getNews(params)` - 获取新闻列表（分页）
- `reg(userInfo)` - 用户注册
- `login(loginInfo)` - 用户登录

## 项目结构

```
静态资源服务管理器/
├── 1.js                    # Express 服务器主文件
├── package.json            # 项目配置文件
├── 静态页面/               # 静态资源目录
│   ├── index.html          # 示例页面（包含 API 测试界面）
│   └── js/
│       └── practice.js     # 客户端 JavaScript 函数
└── README.md               # 说明文档
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
npm start
# 或
node 1.js
```

服务器将在 `http://localhost:3000` 启动。

### 3. 访问示例页面

打开浏览器访问：`http://localhost:3000/`

页面中提供了测试界面，可以测试所有 API 接口。

## API 使用示例

### 登录

```javascript
const result = await login({
  loginId: 'test',
  loginPwd: '123456'
})
console.log(result)
```

### 注册

```javascript
const result = await reg({
  loginId: 'test',
  nickname: '测试用户',
  loginPwd: '123456',
  loginPwdConfirm: '123456'
})
console.log(result)
```

### 获取新闻（分页）

```javascript
const result = await getNews({
  page: 1,
  limit: 10
})
console.log(result)
```

## 注意事项

1. 静态资源中的 JavaScript 是在**客户端（浏览器）**运行的
2. 所有 API 接口返回的数据格式统一为：`{ code: number, msg: string, data: any }`
   - `code: 0` 表示成功
   - `code: 1` 表示失败
3. 当前实现为示例代码，实际项目中需要连接数据库进行数据存储和验证

