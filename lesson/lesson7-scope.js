// 把每一种作用域作为标题写清楚。

//let a = "global"; //global scope

//const { firstname, lastname } = person;

/*if (true) {
  let b = 10; //块级
  var a = 101;
  console.log(b);
} */

// function sumFunc() {
//   let a = 10;//函数作用域更严格,所有定义方式都封死在里面,不外泄 
//   var b = 11;
// }
// console.log(b)

//1.通过传参

function lexicalFunc1(a) {
  //定义函数
  console.log(a);
}

function lexicalFunc2() {
  let a = 10;
  lexicalFunc1(a); //调用func1
}

lexicalFunc2(); //传入变量需要定义,不能重复定义

//2.词法作用域（套娃 能拿到哪些变量 函数定义位置决定，而不是函数执行位置决定）
// 闭包是机制，因为有了词法作用域，所以存在 能技术拥有并使用变量 “闭包能够被引用并阻止被垃圾回收销毁” 
function outerFunc() { //持久引用闭包
  let b = 11;
  function innerFunc() { //内外函数,内部函数内层引用外部函数的作用域的变量,这种机制/现象是闭包closure;let b = 11在innerfunc调用结束才销毁;js有内存回收机制
    console.log(b);
  }
  return innerFunc;
}

// const result = outerFunc();
// result() // result 再次执行，b被吐出来
//持久引用闭包:内部函数被返回并保存，外部作用域的变量会一直保留在内存中
outerFunc()()//短暂引用不需要result，一次性使用，第一个（）形成 result，第二个使用 innerfunc 内部变量

// 这个例子太复杂
//短暂引用闭包
// function processData(data) {
//     let processedCount = 0  // 外部变量
    
//     function process() {
//       processedCount++
//       console.log(`handle with ${processedCount} data`);
//       return processedCount
//     }
    
//     // 函数在内部被调用，但没有被返回
//     process()  
//     process()  
    
//     // 函数调用完，如果没有其他引用，闭包可能被回收
//     // processedCount 在函数执行完后可能被垃圾回收
//   }
  
//   processData([1, 2, 3])
//   // 调用结束后，processData 作用域结束，闭包可能被回收

function make() {
  let n = 0;
  return () => ++n; 
}
const c1 = make(); //持久性引用
const c2 = make(); //第二个引用，新的独立环境
c1() //1 第一次执行++
c1() //2
c1() //3
c2() //1
c2() //2

//作业：const curryAdd = a => b => c => a + b + c; => 转化为普通函数

// 柯里化
const curryAdd = a => b => c => a + b + c

// 普通函数
function add(a, b, c) {
  return a + b + c
}

// 参数一次性传入的写法
const add2 = (a, b, c) => a + b + c