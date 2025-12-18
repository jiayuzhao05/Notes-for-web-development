// commonJS vs esmodule
// 导入导出
// 导出
// commonJS
module.exports = {
    name: 'example',
    method: function() {}
  }
  
  // method2
  exports.name = 'example'
  exports.method = function() {}
  
  // 导入
  const module = require('./module')
  const { name, method } = require('./module')

// esmodule
// 导出
export const name = 'example'
export function method() {}

// method2 如果用{} 需要后期解构
export default {
  name: 'example',
  method: function() {}
}

// 导入
import module from './module'
import { name, method } from './module'
import * as module from './module'

// 加载时机
// 1. commonJS -运行时加载
// 动态导入
if (condition) {
    const module = require('./module') // ✅
  }
  
  // 函数内部导入
  function loadModule() {
    return require('./module') // ✅
  }

// 2. esmodule -编译时加载
// 导入必须在顶层
import module from './module' 

// 不能在条件语句中
if (condition) {
  import module from './module' // ❌ 
}

// 动态导入需要使用 import()
if (condition) {
  const module = await import('./module') // ✅
}

// 导出方式差异
// 1. commonJS
// module.js
let count = 0

// 导出值的拷贝
module.exports = {
  count,
  increment() {
    count++
    console.log('内部count:', count)
  }
}

// main.js
const module = require('./module')
console.log(module.count) // 0
module.increment() // 内部count: 1
console.log(module.count) // 仍然是 0（值的拷贝）

// 2. esmodule
// module.js
export let count = 0

export function increment() {
  count++
  console.log('内部count:', count)
}

// main.js
import { count, increment } from './module.js'
console.log(count) // 0
increment() // 内部count: 1
console.log(count) // 1（实时绑定）

//4. 文件扩展名类型
// commonJS
// package.json
{
    "type": "commonjs" // 默认值，可省略
  }

// esmodule
// package.json
{
    "type": "module"
  }

// 5. this 指向
// commonJS
// this 指向 module.exports
console.log(this === module.exports) // true

// esmodule
// this 是 undefined
console.log(this) // undefined

// 6. 循环依赖
// commonJS
// a.js
exports.done = false
const b = require('./b.js')
console.log('在 a.js 中,b.done = %j', b.done)
exports.done = true

// b.js
exports.done = false
const a = require('./a.js')
console.log('在 b.js 中,a.done = %j', a.done)
exports.done = true

// main.js
const a = require('./a.js')
const b = require('./b.js')
// 在 b.js 中，a.done = false
// 在 a.js 中，b.done = true

// 兼容性处理
// ESM 文件
import module from './commonjs-module.cjs'
// 或
const module = await import('./commonjs-module.cjs')

// CommonJS 中使用 ESM
// CommonJS 文件
// 需要动态导入
(async () => {
    const { default: module } = await import('./esm-module.mjs')
  })()

//树摇优化 Tree Shaking 优化JS代码体积 移除未使用的代码 减小最终打包文件的体积 树摇依赖于 ES6 模块的静态结构特性
//名字来源于"摇树让枯叶掉落"的比喻——通过静态分析代码依赖关系，识别并移除那些从未被使用的代码（"枯叶"），只保留需要的部分
// utils.js - 导出多个函数
export function add(a, b) {
    return a + b;
  }
  
  export function multiply(a, b) {
    return a * b;
  }
  
  export function divide(a, b) {
    return a / b;
  }
  
  // main.js - 只使用其中一个
  import { add } from './utils.js';
  
  console.log(add(2, 3));

// 树摇使用 ES6 的 import/export 语法，而不是 CommonJS 的 require/module.exports

// es6 是静态:导入导出在编译时就确定，可以进行静态分析
// commonJS 是动态：require() 在运行时动态执行，无法在编译时确定依赖关系

// commonJS vs esmodule
// 标准来源：CMJ 社区标准 新增API；ESM 官方标准 新增语法
// 时态： CMJ 运行态 模块放置到函数 exports module；ESM 运行时（import())+编译时（静态） tree shaking

// 语法： require module.exports vs import export
// 模块加载机制： 同步 vs 异步
// this指向： CommonJS 空对象 vs import window
// 循环依赖