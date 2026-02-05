三种方法：pnpm，npm，yarn

两者属于前后脚关系 有时候node_modules下载后 顺便在package.json记下一笔;或者是package.json记录好，node_modules对照着下载需要下载的包
package.json 类似于list
node_modules 里面的包都是亲戚 相互都有依赖关系

pnpm build 不是最终产物->可以生产的产物

npm link 类似于安装尾巴 和电脑全局搭建

fetch：异步API；本质是promise 面向服务器接口 现代浏览器的web api async+fecth 接口返回值
ajax：xmlHTTPRequest 本身回调函数

<form action="/login.html"> </form>

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

V8引擎底层原理
