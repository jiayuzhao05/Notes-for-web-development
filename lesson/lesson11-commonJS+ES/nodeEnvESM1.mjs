export const b = "hello"

let a = 10
function fn() {
  console.log("world")
}
//1.export
export default {a,fn} //标识符 （const a = 1中的 a） 标识符本地绑定暴露给外部 外部文件使用到 fn 来引用 导出对象
//export 是key word，不是对象; commonjs 中module是属性 用 require 使用

// export.name = "john" ❌
// export.method = fn()

//export default 导出后，export default  => obj 不能加{}