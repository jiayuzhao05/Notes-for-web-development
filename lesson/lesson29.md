单线程 vs 多线程 优缺点

缺点：JS弱语言

html 超文本标记语言  在浏览器环境
xml

V8 引擎 使用 DOM id 进行 DOM 操作

浏览器环境有 DOM API  包括 fetch,localstorage 都是 chrome 提供

polyfill 更新代码版本 比如老版浏览器转换称低版本代码

nodejs 在服务器 os 上运行 偏向底层
chrome 在 os 上运行 相当于在 nodejs 再上一层

nodejs：libUV  子进程 跨步 IO  定时器  fs
nodejs 是离底层更近 是环境  为了开发 network worker 存在 解决高并发

promise.nextTick()比 promise.then()快一点


文件 IO， socket，底层交互

rAF 专属 API 屏幕帧率 60Hz 一秒里闪 60 次 有间隙  是 JS 执行时间

为了解决 CPU 密集任务 引入 web worker（只运行 JS 代码 没有 DOM，BOM）并形成 sandbox 环境

'''
new Worker
onmessage
return webworker file
postMessage
'''

CPU 密集型：线程多 CPU 多 但 CPU 需要切换成本
IO 密集型： nodejs 用 


作业：
写main.js worker.js
