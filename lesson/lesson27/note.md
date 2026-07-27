编码语言 (编译型 compiler + 解释型 interpreter) 

解释型语言 执行到哪一步 解释到哪一步

fs.read()
fs.write()

k8s 用 go
V8 引擎解析 JS 代码

浏览器环境提供 cookie，session storage，DOM，BOM

nodejs 浏览器

nodejs和浏览器 eventloop 不同点是？

AFT 抽象语法树(tokenization,parsing)<-字节码（中间状态）——>（ignition） 0/1 机器码

ignition 是 V8 引擎特有 其他语言也有类似机制 只是不是 ignition
C/C++没有字节码 直接转到 0/1

raspberry Pi 树莓派 边缘 AI 智能体 相当于linux 系统低成本微型电脑 算力成本在几时美金
之前用 megamini 批量部署 3000-4000美金

实现环境：
fiber 双缓冲在 react16 后才出现
层级深 主线程会卡死

长任务>500ms 分解成微任务 放到 eventloop 里异步运行 
以上都是在客观环境

 AI infra 相当于 用 Nvidia 卡训练 在 K8s 架构里 分布式训练 上千亿，上万亿次计算 分割到不同板块

 底座基本用 C++（通信，py，go（K8S 远程））

 AI infra 涉及算法调试 类似搞高速和加油站

 JIT V8 引擎高效的原因 即时编译

 Vue 框架 编译器 比语言编译器简单 最终目的是让 CPU 运行