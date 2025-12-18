// const {add} = require('/nodeEnvCMJ1.cjs')

//配置 let config; 动态导入 可以条件判断
// const result = require(path);
// const path = './path' + name;
// production
// import CMJ1 和 CMJ3 中的 config 变量
const {config:configfromnodeEnvEMJ1} = require('/nodeEnvCMJ1.cjs')
const {config:configfromnodeEnvEMJ3} = require('/nodeEnvCMJ3.cjs')

let config;
if (process.env.NODE_ENV === 'production') {
    config = require('./nodeEnvCMJ1.cjs');
} else {
    config = require('./config-dev.cjs');
}

