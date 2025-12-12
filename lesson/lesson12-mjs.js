//esmodule V8引擎 把 import，export 产生依赖图 编译解析
// V8 产生执行上下文 产生词法作用域 代码写好推动

//代码降级 polyfill

//commonJS 是函数作用域 => 模块作用域  IIFE 社区版 变量隔离
// (function name(exports,require) {
//    })()

// var a = "hello" //模块作用域 let声明的变量不能作为全局变量 var 声明的模块变量禁止给全局变量声明
// console.log(globalThis.a)
// console.log(global.a)
//每个 js 文件都是独立模块 里面每个变量都只能在文件里用
//ESMAScript
// function fn() {
//    console.log("hi")
// }

// export default fn

// export let b = "world"

//课后作业：commonJS 导入导出 两个用法区别
// CommonJS 导出两种用法

// 1. module.exports = xxx（直接赋值）
// 完全覆盖导出对象 导出任何类型：对象、函数、字符串、数字等
//    module.exports = { add, subtract }
//    module.exports = function() {}

function add(a, b) {
    return a + b
  }
  
function subtract(a, b) {
    return a - b
  }
  
  // 方式1：直接赋值一个对象
//   module.exports = {
//     add,
//     subtract
//   }
  
  // 方式2：直接赋值一个函数
  // module.exports = add
  
  // 方式3：赋值其他类型
  // module.exports = "hello"
  // module.exports = 123

// 2. exports.xxx = xxx
//    - 给 exports 对象添加属性
//    - 只能添加属性，不能直接赋值（会断开引用）
//    exports.add = add
//    - exports = {} 不会生效
// exports = { multiply, divide }  // ❌ 不会生效
// 因为 exports 只是 module.exports 的一个引用，直接赋值会断开引用，导出失败

function multiply(a, b) {
    return a * b
  }
  
  function divide(a, b) {
    return a / b
  }
  
  // 方式1：给 exports 添加属性
  exports.multiply = multiply
  exports.divide = divide
  
  // 方式2：添加值
  // exports.PI = 3.14159
  // exports.name = "math"
  // 不能直接给 exports 赋值！
  
  // 如果要导出对象，使用 module.exports
  // module.exports = { multiply, divide } 


// CommonJS 导入
// 1. 整体导入：const module = require('./module')
//    - 导入整个模块对象
//    - 使用：module.add(1, 2)
const math1 = require('./nodeEnvCMJ1.cjs')
console.log('整体导入:', math1)
console.log('使用:', math1.add(5, 3))  // 8
console.log('使用:', math1.subtract(5, 3))  // 2

// 2. 解构导入：const { add, subtract } = require('./module')
//    - 只导入需要的部分
//    - 使用：add(1, 2)

const { multiply, divide } = require('./nodeEnvCMJ2.cjs')
console.log('解构导入 - multiply:', multiply(6, 2))  // 12
console.log('解构导入 - divide:', divide(6, 2))  // 3

// 区别
// 1. 整体导入：导入整个模块对象
//    - 优点：可以访问模块的所有导出内容
//    - 缺点：需要使用点语法访问属性
//    - 适用：需要导入默认导出、整个模块时

// 2. 解构导入：只导入需要的部分
//    - 优点：代码更简洁，直接使用变量名
//    - 缺点：需要知道具体的导出名称
//    - 适用：只需要模块的部分功能时

// 混合使用
const math2 = require('./nodeEnvCMJ2.cjs')
const { multiply: mul } = require('./nodeEnvCMJ2.cjs')  // 可以重命名？？？

console.log('math2.multiply:', math2.multiply(4, 3))  // 12
console.log('重命名后:', mul(4, 3))  // 12

// 区别
// - module.exports 是真正导出对象，可以直接赋值
// - exports 只是 module.exports 的一个引用
// - require() 导入时，返回 module.exports 指向的对象，不能直接赋值
// - 如果同时使用 module.exports 和 exports，以 module.exports 为准


// esmodule 导入导出两种用法
// 命名导出/导入:可导出多个成员，导入时名字要对上（可用 as 重命名），编辑器有静态检查
export const a = 1
export function foo() {}
const x = 1; export { x, foo as bar }

// 默认导出/导入:只能有一个默认导出，导入时名字随意（不用 as），编辑器有静态检查 常用于主入口或单个主要功能
export default function () {}
// or
// const fn = () => {}; export default fn

//混合使用
export default main
export const helper = () => {}
// 导入
import main, { helper } from './module.mjs'

// 重新导出（聚合）
// 透传：相当于做一个转发/聚合，不会执行重命名或修改源内容 常用于“总出口”文件，把多个子模块的导出聚合起来
export * from './mod.js'
// 带 default
// export { default as main, helper } from './mod.js'
// 1. default as main：将源模块的默认导出重命名为 main 并作为命名导出
//    - 源模块：export default function() {}
//    - 重新导出后：import { main } from './index.js'（不再是默认导入了）
// 2. helper：直接透传源模块的命名导出 helper
//    - 源模块：export const helper = xxx
//    - 重新导出后：import { helper } from './index.js'

// 等价于：
// import defaultExport from './mod.js'
// import { helper } from './mod.js'
// export { defaultExport as main, helper }
// 可以同时重命名多个导出
// export { default as main, helper as helperFunc, PI } from './mod.js'

// ========== 实际使用示例 ==========
// 文件：math.mjs
export default function add(a, b) {
    return a + b
  }
  
  export const PI = 3.14159
  export function multiply(a, b) {
    return a * b
  }
  
  // 文件：index.mjs（聚合文件）
  // 方式1：只透传命名导出（不包含 default）
  export * from './math.mjs'
  
  // 方式2：同时导出 default 和命名导出
  export { default as add, PI, multiply } from './math.mjs'
  
  // 方式3：重命名 default，同时导出命名导出
  export { default as addFunction, PI, multiply } from './math.mjs'
  
  // ========== 使用聚合文件 ==========
  // 其他文件可以这样导入：
  // import { addFunction, PI, multiply } from './index.mjs'
  // 或者
  // import { add, PI, multiply } from './index.mjs'
  
  // ========== 关键点 ==========
  // 1. default as xxx：将默认导出重命名为命名导出
  //    - 源模块：export default fn
  //    - 重新导出：export { default as fn } from './mod.js'
  //    - 导入：import { fn } from './index.mjs'（不再是默认导入了）
  //
  // 2. helper：直接透传命名导出
  //    - 源模块：export const helper = xxx
  //    - 重新导出：export { helper } from './mod.js'
  //    - 导入：import { helper } from './index.mjs'
  //
  // 3. 可以同时重命名多个导出
  //    export { default as main, helper as helperFunc, PI } from './mod.js'
  //
  // 4. 与 export * 的区别
  //    - export * from './mod.js'：只透传命名导出，不包含 default
  //    - export { default as xxx } from './mod.js'：可以透传 default（需要重命名）
  
// 动态导入
const mod = await import('./mod.js') //返回 { default, ...named }），可按需加载

// commonJS 可以动态导入 可同步也可异步
//1. commonJS: require() 同步 但可以在条件或函数里做到按需加载（阻塞式）
function load() {
    const mod = require('./foo.cjs')
    return mod
  }

//现代 Node (CJS 文件里) 也支持原生 `import()`，它是异步 Promise 形式  
(async () => {
    const mod = await import('./foo.mjs')   // 或 './foo.cjs'
    // CommonJS 模块的导出会挂到 mod.default 上
    console.log(mod.default)
  })()


//JS 可以“动态”加载，`require` 同步、`import()` 异步。异步 `import()` 在 CJS 下返回的命名空间里，`module.exports` 会变成 `default` 属性。

// ESM 也可以动态导入 但import()只能异步，返回 Promise，需 await 或 then
// ESM 文件
const mod = await import('./foo.js') // 顶层 await
mod.doSomething()

// 或函数内
async function load() {
  const { doSomething } = await import('./foo.js')
  doSomething()
}
//按需/条件/事件触发加载，减少首屏体积
//返回模块命名空间对象，默认导出在 mod.default

//JS 拥有词法作用域 从内到外逐级向上查找变量 block->function->global 还没找到reference error
// node - global
// 浏览器 - window
//JS 引擎 - chrome V8, safari 功能包括解决并运行AST
// 此基础上 闭包不让JS垃圾回收 不能保存太多 所以使用短暂闭包

// esm - .mjs 
// commonJS - .cjs
// commonJS - .js 默认情况下 除非 package.json = "type": "module"

//如果 npm 包是 commonjs，新项目包是 esm，混装冲突如何解决？
// 1.好的 npm 包提供下一代 esmodule 包
//2.配置 vite 打包工具
//3. 代码解决 import  XX as dotenv from "dotenv"
//4. 用下一代打包方式 nodenext

//module: esnext 
// 词法作用域 -> 模块作用域
// commonJS 没有自带严格模式 是社区规范
// nodejs 历史规范 
// V8引擎由大佬写底层 迭代不同浏览器版本（包括功能性，tob/toc 等区分）
// 

// 新时代如何兼容老浏览器
// qualifill -> 打包器