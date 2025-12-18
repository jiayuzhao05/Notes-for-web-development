// export const b = "hello"

// let a = 10
// function fn() {
//   console.log("world")
// }
// //1.export
// export default {a,fn} //标识符 （const a = 1中的 a） 标识符本地绑定暴露给外部 外部文件使用到 fn 来引用 导出对象
//export 是key word，不是对象; commonjs 中module是属性 用 require 使用

// export.name = "john" ❌
// export.method = fn()

//export default 导出后，export default  => obj 不能加{}

// const a = 1
// // export default a  //不能接变量声明
// // export default function foo() {} //能接函数声明
// // export default class Person {} //接类声明

// // export default {}

// // export function fun(){}

// // export所有变量能接
// // export const a = 1 //√
// // export  123; × 值
// // export  () => {}; × 表达式expression 不能接

// //export function addFun(){}
// function addFun(){console.log("1")} //addFun 引用值
// export {addFun} 

//只能有一个export default 可以有多个export
// export 一般写在一行
const config = 1
export default config // resolve/reject 生成解析值
// export const config = 1