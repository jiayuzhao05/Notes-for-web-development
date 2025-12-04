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