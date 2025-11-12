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
result()

console.log(count)