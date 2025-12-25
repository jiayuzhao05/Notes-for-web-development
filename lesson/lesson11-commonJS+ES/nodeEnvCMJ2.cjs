// const {add} = require('/nodeEnvCMJ1.cjs')

//配置 let config; 动态导入 可以条件判断
// const result = require(path);
// const path = './path' + name;
// production
// import CMJ1 和 CMJ3 中的 config 变量
const {config:configfromnodeEnvEMJ1} = require('/nodeEnvCMJ1.cjs')
const {config:configfromnodeEnvEMJ3} = require('/nodeEnvCMJ3.cjs')

let config; //变量声明 未初始化 值为undefined 作用:先声明变量，再根据环境条件赋值
//生产环境使用 nodeEnvCMJ1.cjs，开发环境使用 config-dev.cjs
//let 允许重新赋值，适合条件赋值;const 必须初始化且不能重新赋值
if (process.env.NODE_ENV === 'production') {
    config = require('./nodeEnvCMJ1.cjs');
} else {
    config = require('./config-dev.cjs');
}

//2. 三元运算符
// const config = process.env.NODE_ENV === 'production'
//     ? require('./nodeEnvCMJ1.cjs')
//     : require('./config-dev.cjs');

//3.逻辑或运算符
// const config = require(
//     process.env.NODE_ENV === 'production'
//         ? './nodeEnvCMJ1.cjs'
//         : './config-dev.cjs'
// );