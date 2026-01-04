# 静态资源服务器

基于 Node.js 原生 `http` 模块实现的静态资源服务器。

## 功能

- 根据请求路径响应对应的静态文件
- 支持路径映射（`/` 映射到 `index.html`）
- 自动识别文件类型并设置正确的 MIME 类型
- 错误处理（404、403、500）

## 实现思路

### 1. 路径处理

```javascript
// 根路径映射到 index.html
if (requestPath === '/') {
  requestPath = '/index.html'
}

// 构建完整的文件路径
const filePath = path.join(publicDir, requestPath)
```

### 2. 安全检查

使用 `path.resolve` 和 `path.relative` 确保请求的文件路径在 `public` 目录内，防止路径遍历攻击。

### 3. 文件检查

使用 `fs.promises.stat()` 检查文件：
- 文件是否存在
- 是否是文件（`stats.isFile()`）
- 是否是目录（`stats.isDirectory()`）

### 4. 读取文件

使用 `fs.promises.readFile()` 异步读取文件内容。

### 5. 响应客户端

- 根据文件扩展名设置正确的 MIME 类型
- 设置响应头（Content-Type、Content-Length）
- 发送文件内容

## 核心函数说明

### `path.resolve(...paths)`
将路径或路径片段解析为绝对路径。

### `path.extname(filename)`
获取文件路径的扩展名（包括点号），如 `.js`、`.html`。

### `fs.promises.stat(filename)`
异步获取文件状态信息，返回 Promise。
- 文件不存在时会抛出错误（错误码 `ENOENT`）
- 返回的 `stats` 对象包含：
  - `stats.isFile()` - 判断是否是文件
  - `stats.isDirectory()` - 判断是否是目录

### `fs.promises.readFile(filename)`
异步读取文件内容，返回 Promise，resolve 的结果是文件的 Buffer。

## 路径映射规则

| 请求路径 | 响应文件 |
|---------|---------|
| `/` | `public/index.html` |
| `/index.html` | `public/index.html` |
| `/js/index.js` | `public/js/index.js` |
| `/css/style.css` | `public/css/style.css` |

## 使用

### 安装依赖

无需安装额外依赖，使用 Node.js 内置模块。

### 启动服务器

```bash
node server.js
```

服务器将在 `http://localhost:3000` 启动。

### 访问示例

- 访问 `http://localhost:3000/` 或 `http://localhost:3000/index.html`
- 访问 `http://localhost:3000/js/index.js`
- 访问 `http://localhost:3000/css/style.css`

## 错误处理

- **404** - 文件不存在
- **403** - 禁止访问（路径遍历攻击）
- **500** - 服务器内部错误

## 项目结构

```
static-server/
├── server.js          # 服务器主文件
├── public/            # 静态资源目录
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── index.js
├── package.json
└── README.md
```


开发一个静态资源服务器

具体要求：编写一个请求处理函数，该函数能够根据请求的路径响应某个目录中对应的文件，并把文件内容发送给客户端对应的文件，并把文件内容发送给客户端

```
请求：/
响应文件内容：项目路径/public/index.html

请求：/index.html
响应文件内容：项目路径/public/index.html

请求：/js/index.js
响应文件内容：项目路径/public/js/index.js
```

可能会用到的函数：

- `path.resolve`

- `path.extname(filename)`：获取某个路径的后缀名

- `fs.promises.stat(filename)`：异步函数，需要等待，获取某个文件的状态信息

  - 若文件不存在，报错

  - 返回一个状态信息对象 `stats`

    ```js
    stats.isDirectory(); // 是否是一个目录
    stats.isFile(); // 是否是一个文件
    ```

- `fs.promises.readFile(filename)`：异步函数，需要等待，获取某个文件的内容