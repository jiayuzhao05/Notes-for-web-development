request 请求
request.body 用户名+pass


post-> body
get -> url 放在明文上

axios 封装 fetch 配置好

设置 express project 时， keywords 是 npm 网上打包出去的 别人能搜索到的tag
npm command： npm dev run （react 开发时遇到）
dependency 生产环境 日常工作 js
devdependency 开发环境 开发部署  webpack 打包，dist file，压缩 js 编译运行阶段 部署

计算机无法准确计时
远程校验 双精度浮点

express 外，还会用koa
koa是nodejs的web服务器框架 由express开发 被称为express下一代框架
洋葱模型(async/await) 异步处理由原生async/await 内置功能是极简内核,功能靠插件 体积轻量
请求像剥洋葱一样，先从外层向内进入，再从内层向外返回，每个中间件都能在请求前后做处理

学会写 nextjs
https://www.road-to-next.com/


获取表单数据
手动获取：document.getElementById('username').value
FormData API:new FormData(form) + formData.get('username')
序列化对象：Object.fromEntries(new FormData(form))
