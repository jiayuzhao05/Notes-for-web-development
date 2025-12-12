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
// 可以动态导入
if (condition) {
    const module = require('./module')
  }
  
  // 可以在函数内部导入
  function loadModule() {
    return require('./module')
  }

// 2. esmodule -编译时加载
// 导入必须在顶层
import module from './module' // ✅

// 不能在条件语句中
if (condition) {
  import module from './module' // ❌ 语法错误
}

// 动态导入需要使用 import()
if (condition) {
  const module = await import('./module') // ✅
}

// 导出方式差异
// 1. commonJS
// module.js
let count = 0

// 导出的是值的拷贝
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

// 6. 循环依赖处理
// commonJS
// a.js
exports.done = false
const b = require('./b.js')
console.log('在 a.js 中，b.done = %j', b.done)
exports.done = true

// b.js
exports.done = false
const a = require('./a.js')
console.log('在 b.js 中，a.done = %j', a.done)
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

// 在 CommonJS 中使用 ESM
// CommonJS 文件
// 需要使用动态导入
(async () => {
    const { default: module } = await import('./esm-module.mjs')
  })()

//树摇优化 Tree Shaking 优化JS代码体积 移除未使用的代码 减小最终打包文件的体积
//名字来源于"摇树让枯叶掉落"的比喻——通过静态分析代码依赖关系，识别并移除那些从未被使用的代码（"枯叶"），只保留真正需要的部分