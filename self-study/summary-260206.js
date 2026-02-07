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

