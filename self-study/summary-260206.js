//Catch-all [...slug] 必须有子路径 
// app/products/[...categories]/page.tsx

// ✅ /products/electronics/laptop
// ✅ /products/clothing/shirts
// ❌ /products (404，没有分类就不显示)
/*URL: /docs/guide/getting-started/installation

segments 捕获:
└─ guide             → slug[0]
└─ getting-started   → slug[1]  
└─ installation      → slug[2]

params = { slug: ['guide', 'getting-started', 'installation'] }
*/

//Optional Catch-all [[...slug]] 根路径也需要显示内容
// app/shop/[[...slug]]/page.tsx

// ✅ /shop (显示所有商品)
// ✅ /shop/electronics (显示电子产品)
// ✅ /shop/electronics/laptop (显示笔记本)

//动态segments 作为params属性 传递给layout,page,route,generateMetadata函数
// children：React 中，组件标签之间的内容

//平行路由
//拦截路由 
/* (.)匹配同一级别区段 路由地址！！！
(..)匹配上一级区段
(..)(..)匹配上两级区段
(...)匹配根app目录区段 */

//middleware
/*
path rewriting:根据属性动态重写路径到API路由或者页面，支持ABtest，功能推出/旧路径
bot detection 爬虫检测：检测和阻止爬虫程序流量 保护资源
logging&analytics:页面/API处理前捕获和分析请求数据
Feature flagging: 动态启用/禁用功能 无缝功能推出/测试

由root目录中middleware.js/.ts定义middleware，一般位于和pages/app同一级别，或在src/
一个项目仅支持一个middleware file 但是可以将中间件功能拆分为.ts,.js，导入到主middleware file
*/

//matcher 允许过滤middlware以在特定路径允许 支持正则表达式
export const config = {
    matcher:'/about/:path*',
}

/*token：钥匙/认证机制 用用户名和pass 登录 后台生成token 包含信息 角色权限等都可以放进去放在前端 调接口时 
调接口 除了登录接口其他带token 后台校验 如果没带token 不会让我访问 带了他会解析；
token携带过期时间 一串代码 生产机主流模式JWT 提示失效则无法通过
*/

/*
react hooks：函数组件超能力 组件使用状态和生命周期等功能 比如useState, useEffect, useContext
*/

import { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)  // 状态 Hook
  
  useEffect(() => {  // 生命周期 Hook
    console.log('mounted')
  }, [])
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}

//react router: 路由库 创建单页应用SPA页面导航 比如Route, Link, useNavigate, useParams

/*什么时候用use client？类似于mark它是客户端组件 区分服务器和客户端
用react hooks：useState, useEffect, useContext,useContext
添加时间处理器：onClick, onChange, onSubmit
用浏览器API: window,document,localStorage,sessionStorage,fetch(客户端调用)
使用状态管理库：Redux, MobX, Zustand
使用context provider
第三方UI库组件：Ant Design, Material UI, Bootstrap,Chakra UI

不需要use client场景：
纯展示组件，数据获取，静态内容

用react/vue开发时候 只有一个客户端 没有服务器端 最终成品是HTML 所以最后是浏览器帮我们解析 但是开发nextjs组件框架 有两个端口 客户端是浏览器
浏览器有API 比如windows 如果我们部署linux服务器上没有浏览器属性 则是服务器端 如果去服务器端找浏览器端 找不到 会报错
use clien：在客户端刷新 不再服务器端刷新
*/

//react props 
//JSX中展开操作不是ES6展开预算符

//JSX作为插槽传递
//内部props传递？？都是单向 对于接收方是readonly

//HTML中各类标签