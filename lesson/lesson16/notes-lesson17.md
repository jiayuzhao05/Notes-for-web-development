## 1. 前后端通信方式：Fetch vs XHR

### XMLHttpRequest (传统方式)
```javascript
// 旧式的异步请求方式
const xhr = new XMLHttpRequest();  
xhr.open('POST', '/login');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
xhr.send(JSON.stringify({ username: 'admin', password: '123456' }));
```

### Fetch API
```javascript
// 基于 Promise的API
fetch('/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username: 'admin', password: '123456' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 使用 async/await（更优雅）
async function login(username, password) {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

### Axios (第三方库，最流行)
```javascript
// Axios 封装 Fetch，提供 API
import axios from 'axios';

// 自动转换 JSON
axios.post('/login', { username: 'admin', password: '123456' })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// 配置拦截器、默认配置
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 5000;
```

## 2. 性能优化与 SEO

### Lighthouse 评分指标
Google 的自动化工具，评估 Web 应用质量，包括：

1. Performance
   - FCP (First Contentful Paint): 首次内容绘制
   - LCP (Largest Contentful Paint): 最大内容绘制
   - TTI (Time to Interactive): 可交互时间
   - TBT (Total Blocking Time): 总阻塞时间
   - CLS (Cumulative Layout Shift): 累积布局偏移

2. Accessibility
   - 语义化 HTML
   - label 和 input 的正确关联（我们刚修复的）
   - 键盘导航
   - 屏幕阅读器支持

3. Best Practices 
   - HTTPS 使用
   - 控制台无错误
   - 图片比例正确

4. SEO (搜索引擎优化)
   - meta 标签完整
   - 语义化标签使用
   - 移动端友好

### CSS 优化策略

```html
<!-- 1. 关键 CSS 内联（首屏样式） -->
<head>
  <style>
    /* 关键 CSS - 快速渲染首屏 */
    body { margin: 0; font-family: sans-serif; }
    .header { height: 60px; background: #333; }
  </style>
  
  <!-- 2. 非关键 CSS 延迟加载 -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>

<!-- 3. 图片懒加载 -->
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" alt="description">
```

### HTML 渐进式渲染

```html
<!DOCTYPE html>
<html>
<head>
  <title>性能优化</title>
  <!-- 关键 CSS -->
  <style>/* 首屏样式 */</style>
</head>
<body>
  <!-- 1. 先渲染框架（骨架屏） -->
  <div class="skeleton">
    <div class="skeleton-header"></div>
    <div class="skeleton-content"></div>
  </div>
  
  <!-- 2. 异步加载实际内容 -->
  <script>
    // 加载真实内容后替换骨架屏
    fetch('/api/content')
      .then(res => res.json())
      .then(data => renderContent(data));
  </script>
  
  <!-- 3. 图片等资源最后加载 -->
  <img loading="lazy" src="image.png">
  
  <!-- 4. JavaScript 放在底部或使用 defer/async -->
  <script src="app.js" defer></script>
</body>
</html>
```


## 3. 单页面应用 (SPA) vs 多页面应用 (MPA)

### 多页面应用 (MPA) - 传统方式
```
用户操作 → 发送请求 → 服务器渲染完整 HTML → 返回新页面 → 浏览器刷新
```

- ✅ SEO 友好（服务器返回完整 HTML）
- ✅ 首屏加载快
- ✅ 浏览器前进/后退按钮天然支持
- ❌ 页面切换会刷新，体验不连贯
- ❌ 重复加载相同资源（CSS、JS）
- ❌ 服务器压力大

Express MPA
```javascript
const express = require('express');
const app = express();

// 不同路由返回不同 HTML 页面
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});
```

### 单页面应用 (SPA) - 现代方式
```
首次加载完整应用 → 用户操作 → JavaScript 拦截 → 动态更新 DOM → 无刷新切换
```

- 用户体验流畅（无刷新）
- 前后端分离，服务器只提供 API
- 组件化开发，代码复用
- 首次加载慢（加载整个应用）
- SEO 不友好（需要 SSR /预渲染）
- 需要前端路由管理

Express + SPA:
```javascript
const express = require('express');
const app = express();

// 1. 提供静态资源
app.use(express.static('dist'));

// 2. API 接口
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

app.post('/api/login', (req, res) => {
  // 处理登录逻辑
  res.json({ token: 'xxx', user: { name: 'admin' } });
});

// 3. 所有路由都返回同一个 HTML（前端路由处理）
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html'); //__dirname = 当前这个脚本文件所在文件夹的绝对路径;Node 里用来和 path.join()拼路径、读文件
});
```

| 特性 | MPA (多页面) | SPA (单页面) |
|------|-------------|-------------|
| 页面切换 | 完整刷新 | 无刷新 |
| SEO | 友好 | 需要额外处理 |
| 首屏速度 | 快 | 慢 |
| 用户体验 | 有卡顿 | 流畅 |
| 开发复杂度 | 简单 | 复杂 |
| 服务器压力 | 大 | 小 |
| 适用场景 | 内容型网站、博客 | 应用型、后台管理系统 |

## 4. React 生态与全栈框架

### React - UI 层框架
```javascript
// React 只负责视图层，构建 UI 组件
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}
```

### React Router
```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}
```
工作原理：
- 监听 URL 变化（history.pushState）
- 根据路径匹配对应组件
- 无刷新切换视图

### Next.js - React 全栈框架

Next.js = React + 路由 + SSR + API Routes + ...

```javascript
// pages/index.js - 自动路由
export default function Home() {
  return <h1>Home Page</h1>
}

// pages/about.js - 自动生成 /about 路由
export default function About() {
  return <h1>About Page</h1>
}

// pages/api/login.js - API 路由（后端接口）
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  }
}

// 服务器端渲染（SSR）
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } }; // 传递给页面组件
}
```

优势：
- SEO 友好（服务器端渲染）
- 文件系统路由（自动生成路由）
- API Routes（无需单独后端）
- 自动代码分割（按需加载）
- 静态生成 + SSR 混合使用
- 开箱即用的优化（图片、字体等）

## 5. Express 项目架构

```
project/
├── public/              # 静态资源
│   ├── css/
│   ├── js/
│   ├── images/
│   └── login.html
├── routes/              # 路由模块
│   ├── auth.js         # 认证相关路由
│   ├── users.js        # 用户相关路由
│   └── api.js          # API 路由
├── middleware/          # 中间件
│   ├── auth.js         # 认证中间件
│   └── logger.js       # 日志中间件
├── controllers/         # 控制器（业务逻辑）
│   ├── authController.js
│   └── userController.js
├── models/             # 数据模型
│   └── User.js
├── config/             # 配置文件
│   └── database.js
├── .env                # 环境变量
├── .gitignore
├── package.json
└── server.js           # 入口文件
```

### 模块化 Express 
```javascript
// server.js
const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 路由
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(3000);

// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

module.exports = router;

// controllers/authController.js
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === '123456') {
    res.json({ success: true, token: 'xxx' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};
```