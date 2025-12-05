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

//JS 拥有词法作用域 从内到外逐级向上查找变量 block->function->global 还没找到reference error
// node - global
// 浏览器 - window
//JS 引擎 - chrome V8, safari 功能包括解决并运行AST
// 在此基础上 闭包不让JS垃圾回收 不能保存太多 所以使用短暂闭包

// esm - .mjs 
// commonJS - .cjs
// commonJS - .js 默认情况下 除非 package.json = "type": "module"