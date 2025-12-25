// 运行时动态加载
// function add(){}
// module.exports = {add}

// import:config = 1
// const config = 1
// module.exports = {config} //exports 只是对 module.exports 的一个引用

let count = 0
function addFun() {
    return count++
}
//const addFun = () => count++;
module.exports = { //object //快照:导出值本身
    count,
    addFun
}

// {
//     key:key,
//     count:count
// }