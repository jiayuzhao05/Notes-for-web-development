/** @type {import('next').NextConfig} */ //JSDoc注释 告诉TS是nextconfig类型
const nextConfig = {  //配置对象
  reactStrictMode: true, //react严格模式
}

module.exports = nextConfig //cmj导出 nextjs读取并配置
// nextjs 配置文件 自定义构建 路由 环境变量