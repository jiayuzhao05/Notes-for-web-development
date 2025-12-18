// import {b} from './nodeEnvESM1.mjs' //import写在顶部 上面只有其他 import 静态import
// import Obj from "./nodeEnvESM1.mjs"
// import * as module from './nodeEnvESM1.mjs'
// import { fn } from './nodeEnvESM1.mjs'
// const {a,fn} = Obj //解构
// fn()
// console.log(Obj.a)
// console.log(b)

// addFun()
let config;
if (true) {
    const module = await import('./nodeEnvESM1.mjs') //动态 import 返回 promise
    config=module.default
    console.log(config)
} else {
    config = await import('./nodeEnvESM3.mjs');
}

// 声明:告诉引擎“我要定义一个标识符（变量/函数/类）”，建立名字 → 值的绑定
// fn(),obj.x,{a:1} 都是表达式

// 变量声明
// let a = 1
// const b = 2
// var c = 3

// 函数声明
// function fn() {}

// 类声明
// class Person {}

// 表达式:“算出一个值”的任何代码片段，可以放在需要值的地方
// 1               // 字面量表达式
// a + b           // 运算表达式
// () => {}        // 箭头函数表达式
// function () {}  // 匿名函数表达式
// obj.name        // 成员访问表达式
// new Foo()       // 实例化表达式

//活绑定 live bindings 如何实现动态 静态 import？
// ESModule 导出“引用”，不是一份“值的拷贝”

// static import 编译时分析好依赖关系
// import ... from './module.js'

// dynamic import: 运行时按需加载 返回promise resolve出模块对象
// const mod = await import('x')




//export如何导出多个值？有什么不能导出的？

