// export const b = "hello"

// let a = 10
// function fn() {
//   console.log("world")
// }
// 1.export导出
// export default {a,fn} //标识符 （const a = 1中的 a） 标识符本地绑定暴露给外部 外部文件使用到 fn 来引用 导出对象
//export 是key word，不是对象; commonjs 中module是属性 用 require 使用

// export.name = "john" ❌
// export.method = fn()

//export default 导出后，export default  => obj 不能加{}

// export default 后面要“单个值” 可以接表达式
// const a = 1
// export default a  //不能接变量声明
// export default function foo() {} //√ 能接函数声明
// export default class Person {} //√ 接类声明

// export default {}

// export function fun(){}

// export 所有变量能接 但不能在块级内部导出（if，for） 不能同名重复导出 export后面是“标识符/声明”，不是“值/表达式”
// export const a = 1 //√
// export  123; // × 不能导出字面量值
// export  () => {}; //× 表达式 expression 不能接
// export a+b // x 不能导出运算表达式

// export function addFun(){}
// function addFun(){console.log("1")} //addFun 引用值
// export {addFun} 

//只能有一个export default 可以有多个export
// export 一般写在一行
const config = 1
export default config // resolve/reject 生成解析值
// 动态导入时，export default 的值会作为 Promise 解析值的一部分（在 module.default 中）提供给导入方
// export const config = 1

// default 是打包整个文件 整个文件导出

// ---------------------------------
// 活绑定(静态导入)
export let count = 0

export function inc() {
  count++
}

// CommonJS: 运行时 同步、对象导出 值拷贝风格 像“函数包一层require / module.exports 的脚本”
// ESModule:编译期 支持异步 基于绑定的模块系统 偏语言级模块（能tree-shaking 等优化）

// 加载时机& 同步异步：
// CommonJS: 运行时+同步加载
// require() 在代码执行到那一行才执行 加载是阻塞的（必须读完文件、执行完模块再往下走） 可以写在if/for/function里 按需加载灵活

// ESModule: 编译期+异步加载
// import 编译期被分析出依赖图；浏览器和node根据import构建模块图 一次性加载执行；import()(动态)异步 返回promise 按需加载、懒加载

// 模块执行模型 & 缓存:
// CommonJS:模块是函数包裹，导出是对象
// ESModule:块是独立作用域，导出是绑定

// 运行时行为：this/顶层/严格模式
// CommonJS:顶层 this === module.exports 顶层不是“自动严格模式”（可以手动 'use strict'）可以访问 __filename、__dirname、arguments 等 CJS 注入的变量
// ESModule:顶层 this === undefined 默认”严格" 没有 __filename、__dirname，需要用 import.meta.url 等方式自己算

// 依赖关系&循环依赖
// CommonJS:值拷贝 + 循环依赖更“危险”
// require 拿到的是当时 module.exports 对象的引用，但导出成员本质是“值写进去”
// 循环依赖时，可能拿到一个未完全初始化的对象，属性是 undefined，非常容易踩坑

// ESModule:基于绑定 + 循环依赖
//导出的是绑定，哪怕一开始是 undefined，之后赋值会“活着”更新
// 引擎在编译阶段就知道循环关系，给出更明确的行为（虽然也要小心，但一般比 CJS 稍安全）

// 代码优化：
// CommonJS: 由于 require 是普通函数调用 + 可以动态拼路径，编译器很难静态分析出到底用到了哪些成员 打包工具很难做真正的 tree-shaking（通常只能靠启发式）
// ESM:import 必须是静态的，路径是常量字符串，导入的标识符也是固定的;打包器能准确知道“用到了哪些导出”，从而做 tree-shaking，丢掉没用的代码;这也是现代前端库都推荐提供 ESM 入口的原因之一

//动态性：
// CommonJS:更动态  require(someVar) 可以用变量决定模块路径
// 可以 if (...) module.exports = fnA; else module.exports = fnB
// 可以在运行时修改 module.exports 对象

// ESM:更限制但更可分析
// 静态 import 路径必须是字面量，不允许拼字符串
// 顶层 import / export 不能出现在 if / for / 函数 里
// 运行时想动态加载模块，需要用 import()（Promise）而不是改静态结构