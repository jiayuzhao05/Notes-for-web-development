// ========== 示例：解释 export { default as main, helper } from './mod.js' ==========

// 假设有一个源模块 mod.js，内容如下：
// mod.js
// export default function mainFunction() {
//   return "这是默认导出"
// }
// export const helper = "这是命名导出"

// ========== 语法解析 ==========
// export { default as main, helper } from './mod.js'
//
// 这个语法做了两件事：
// 1. default as main：将源模块的默认导出重命名为 main 并导出
// 2. helper：将源模块的命名导出 helper 原样导出
//
// 等价于：
// import mainFunction from './mod.js'
// import { helper } from './mod.js'
// export { mainFunction as main, helper }

