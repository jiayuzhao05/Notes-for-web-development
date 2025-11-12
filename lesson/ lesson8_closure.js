//数据私有化 函数一等公民 primitive+reference 访问到外部不能访问的变量
function closureFunc() {
  let count = 0;
  // count ++
  return { 
    name: "fenney", //obj
    get: () => count, //函数变量
    action: () => ++count }; //对象
}

const result = closureFunc()
// result() //对象无法执行{XXXXX}()

console.log(result.get) //[Function get] 函数，但没被执行
console.log(result.get()) //0
console.log(result.action())
console.log(result.action())
console.log(result.get()) //2

//作业 currify
const curryAdd = a => b => c => a + b + c;
//转化为普通函数

//下节课讲 this