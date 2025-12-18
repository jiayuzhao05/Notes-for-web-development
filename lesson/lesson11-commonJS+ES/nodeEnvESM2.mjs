// import {b} from './nodeEnvESM1.mjs' //import写在顶部 上面只有其他 import 静态import
// import Obj from "./nodeEnvESM1.mjs"
// import * as module from './nodeEnvESM1.mjs'
// // import { fn } from './nodeEnvESM1.mjs'
// const {a,fn} = Obj //解构
// fn()
// console.log(Obj.a)
// console.log(b)

// addFun()
let config;
if (true) {
    const module = await import('./nodeEnvESM1.mjs') //动态 import 返回 promise
    config=module.default
    console.log(config)
} else {
    config = await import('./nodeEnvESM3.mjs');
}

//活绑定 live bindings 如何实现动态 静态 import？
//export如何导出多个值？有什么不能导出的？

