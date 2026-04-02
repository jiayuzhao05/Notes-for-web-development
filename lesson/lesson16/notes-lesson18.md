三种方法：pnpm，npm，yarn

两者属于前后脚关系 node_modules下载后 顺便在package.json记下一笔;或者是package.json记录好，node_modules对照着下载需要下载的包
package.json 类似于list
node_modules 里面的包是亲戚 相互都有依赖关系

pnpm build 不是最终产物->可以生产的产物

npm link 类似于安装尾巴 和电脑全局搭建

fetch：异步API；本质是promise 面向服务器接口 现代浏览器的web api async+fecth 接口返回值
ajax：xmlHTTPRequest 本身回调函数

<form action="/login.html"></form>

以前多页面时代 不跳转也能获取数据的能力 原有默认跳转；现在单页面时代

async function {
const res = await fetch()
try{
catch(error) {
//捕获fetch过程的错误
}
}
}

API：url（fetch）+method（get，post）+header（JSON）

dependencies: "express" "^5.2.1" 最多能突破2；“5.2.1”版本号只能是5.2.1;“ 生产环境-> toc 面向客户
devdependencies：”@types/node":父包/子包 tree-shaking 按需引用 tob 面向开发
包冲突：react16->18 更新主版本号 需要连带更新所有依赖的包 但有时候会导致包冲突 报错 所以有时甚至需要自己写包连接这些包
老项目 千万不要更新老版本号

# V8引擎底层原理
chrome和nodejs用的js/webassembly 引擎，把js源码变成可执行的机器码并运行
'''
JS 源码 → 解析(Parser) → AST → 字节码(Ignition) → 执行
↓
热点代码 → TurboFan(JIT) → 优化机器码
'''
对象在堆上分配，Orinoco 定期回收不再使用的对象

parser:token->AST
preparser:区分[立即执行]和[可延迟]代码 减少首屏解析时间

AST：树形结构->程序结构 供后续字节码生成和优化使用 用于eslint babel 压缩等工具

ignition：ast->字节码 字节码解释器执行
字节码比直接解释源码更紧凑 执行更稳定 为JIT提供清晰中间表示

TurboFan（JIT编译器）
对执行次数多的函数（热点）即时编译 生成优化后的机器码
基于类型反馈做激进优化（内联，类型特化）
若类型中类型和假设不符合 deoptimization 退回字节码执行

Orinoco 垃圾回收器
负责堆上对象自动回收
分代GC：新生代（存活时间短）老生代（存活时间长）不同策略（复制，标记-清扫/标记-压缩）
尽量并发/增量执行 减少主线程停顿（STW）

# 优化机制
Hidden Class（隐藏类）
JS 是动态类型，对象可随时增删属性。V8 为「形状」相同的对象维护隐藏类（类似固定布局）。
属性访问时先查隐藏类再按偏移取字段，接近静态语言的结构体访问，利于内联缓存和 JIT 优化。
若运行时改对象形状（如新增/删除属性），会切换隐藏类，可能触发去优化。
Inline Cache（IC）
对同一语句的多次执行记录「上次看到的类型/形状」。
若本次类型与缓存一致，走快速路径（如直接按偏移读）；否则更新缓存或走慢路径。
为 TurboFan 提供类型反馈，是 JIT 优化的基础之一。
类型反馈与推测优化
执行过程中记录「某处是 number / string / 某形状对象」等。
TurboFan 基于这些信息做类型特化（如把加法编译成整数加法），若后续类型变了就去优化。
