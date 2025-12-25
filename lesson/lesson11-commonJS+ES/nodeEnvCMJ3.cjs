// config = 3
const config = 3
module.exports = {config}

//CJS适合在 服务器端 使用（本地磁盘读写很快）
//CJS：同步、按执行顺序加载
//ESM：静态依赖图 + 可异步加载（尤其在浏览器中）
//console.log(this); // {} （等价于 module.exports）this 指向：cjs 空对象 vs import window