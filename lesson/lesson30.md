csr c 端 浏览器建立在 os 上软件 消耗本地资源 串行速度慢

ssr 服务器运行 react 声称 html 使用服务器资源 不使用本地资源 浏览器直接显示 html 第一次请求已经带回所有内容 完整的 html
搜索引擎和爬虫生效了（有利于 SEO 搜索的原因） 看得见但不能交互 适合有钱的

水合：对比 将看得见的 html 和 react js 叠加 变成交互 react 应用

先有 html 后有 js

fetch.then()
useState()
setData()

react 不是 csr，nextjs 也不是 ssr
react 本身支持 ssr api
nextjs有ssr,但是fetch API有区别, getServerSideProps相当于请求内部API 有路由层写nodejs代码 框架搭好不需要再写java python等代码 需要填写的部分不多 适合小型项目;
"use client";

npm 包提供 SSR：react-dom/server

onClick={() => setCount(count + 1)}

apple 有屏幕矢量化 Retina技术 比其他显示屏清晰 感受不到颗粒感 维持像素密度
css 设备像素比 Window.devicePixelRatio
height:100px; 可以对应200个物理像素点
