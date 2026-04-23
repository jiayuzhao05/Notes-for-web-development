react生成虚拟dom树 只有react.createElement(type,props,content)
但原生DOM树有很多数量 包括f alert() f atob() 浏览器兼容属性
用diff算法更新更新内容变化

微前端:aliyun 子模块
微服务:单体应用 小服务;数据库->解耦 原生dom-〉react 集成cluster 负载均衡
如果不同组用vue和react 技术栈不同 每个分成子应用 用底座承接 国内用qiankun https://qiankun.umijs.org/zh/guide

打包工具 webpack 5

react和传统dom都有生命周期
window.onload()
window.beforeunload()
window.unload()
window.pageshow/pagehide()
window.visibilitychange()

mutation Observer() 有回调函数

作业:
Web Components= Custom Elements(定义标签) + Shadow DOM(隔离封装) + HTML Templates(模板复用)
浏览器给你的"原生版 Vue/React 组件"能力
框架组件 ≠ 浏览器原生组件

yield用于状态机 => 生成器
