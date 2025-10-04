return ()=>{
    console.log(123)
}



web api





```js
console.log(number.MIN SAFE INTEGER)console.log(Number.isNaN(NaN))//NaN!==-NaNconst src ="zero\nnetwork"
const pre = document.createElement('pre')pre.textContent=srcdocument.body.appendchild(pre)document.write(src)
```

用isNaN判断会更稳妥？



**为什么js中的稀疏数组内存利用率更高， 不都是只存储有值的元素？**

稠密数组:访问 arr[3]>直接“基地址+偏移量”取值。
稀疏数组:访问 arr[1000]→引擎要像查对象那样查“键=1000”的存储。
本质上退化为对象属性访问，
所以 sparse[i]和{i:value }在实现成本差不多。



**console.log(Date.today().is().saturday()) 为什么后面都是括号?**

函数调用. Date 是一个内置的对象, 而后面都是这个对象的方法。 方法的调用使用 (), 就是告诉JS引擎去进行执行



在闭包中使用this对象也可能会导致一些问题；this对象是在运行时基于函数的执行环境绑定的，即this对象本身就指调用函数的对象；在全局环境中，this对象通常指向window,而当函数被作为某个对象的方法调用时，this就等于那个对象；不过，匿名函数的执行环境具有全局性，因此this对象通常指向window,但有时候，由于编写闭包的方式不同，这一点可能不会那么明显

**上次说this有点复杂 是不是整体用法:this->调用函数对象/对象(函数被对象调用时)/window(lambda)?**

//说来话长 上课讲



```js
//go 对象
global=100;
function test(){
// undefinedconsole.log(global);var global=200;// 200console.log(global);var global=300;
test();
var global

//ao 对象
function fn(a){
// f a(){}
console.log(a);
//变量声明+变量赋值，但只提升变量声明，不提升变量赋值var a=123:
console.log(a);
// 123
// 函数声明
function a(){}
console.log(a);// 函数表达式
// 123
var b= function(){}console.log(b);
// E(){}
// 函数
function c(){}
fn(1);//调用
  
//Go对象和A0对象是链式关系，如果在函数体内部没有定义qloba1变量，这也意味着A0对象中有g1oba1这个属性;如果没有，会去G0对象中寻找，就近原则
// 进行完预编译后，执行函数则会以A0为基础对函数中的变量进行赋值，函数执行完毕，销毁AO对象
```

**一定会有global属性 ao或者go里 这个就近原则是？go里意思是global还有多个 选个近的?**

JS引擎，它遇到一个变量，会有查找的过程，或者把它称之为规则，它会先在当前执行的这个函数里面去查找，如果找不到。他持续往上面去找，直到他找到为止. 一定会有lo属性？不是这样子的。能有就有，没有就算了，取决于定义。