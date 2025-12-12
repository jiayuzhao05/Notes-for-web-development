import {b} from './nodeEnvESM1.mjs' //import写在顶部 上面只有其他 import
import Obj from "./nodeEnvESM1.mjs"
import * as module from './nodeEnvESM1.mjs'
// import { fn } from './nodeEnvESM1.mjs'
const {a,fn} = Obj //解构
fn()
console.log(Obj.a)
console.log(b)

//活绑定 live bindings 如何实现动态 静态 import？
//export如何导出多个值？有什么不能导出的？

