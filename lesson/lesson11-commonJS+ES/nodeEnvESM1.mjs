// var a = "hello" //模块作用域 let声明的变量不能作为全局变量 var 声明的模块变量禁止给全局变量声明
// console.log(globalThis.a)
// console.log(global.a)
//每个 js 文件都是独立模块 里面每个变量都只能在文件里用
//ESMAScript
function fn() {
   console.log("hi")
}

export default fn

export let b = "world"

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

// 核心区别
// - module.exports 是真正导出对象，可以直接赋值
// - exports 只是 module.exports 的一个引用
// - require() 导入时，返回 module.exports 指向的对象，不能直接赋值
// - 如果同时使用 module.exports 和 exports，以 module.exports 为准

//JS 拥有词法作用域 从内到外逐级向上查找变量 block->function->global 还没找到reference error
// node - global
// 浏览器 - window
//JS 引擎 - chrome V8, safari 功能包括解决并运行AST
// 此基础上 闭包不让JS垃圾回收 不能保存太多 所以使用短暂闭包

// esm - .mjs 
// commonJS - .cjs
// commonJS - .js 默认情况下 除非 package.json = "type": "module"