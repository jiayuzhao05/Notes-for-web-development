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



**js不区分浮点和整数？**

所有数字都是number 所以受到精度限制?

infinity和NaN类型都是number



```js
console.log(NaN==NaN); false //NaN不等于自己的值
console.log(isNaN(NaN)); // 不是数字 所以 true;任何不能被转换为数值的值都会导致这个函数返回 TRUE
//isNaN() 会先尝试将参数转换为数字，然后判断是否为 NaN
```



**所有引用类型的值都是 Object 的实例**？

```js
const arr = [1,2,3]
console,log(arr instanceof Object) //true

function fn(){}
console.log(fn instanceof Object) //true
```

**初始变量语句只运行一次，增量表达式在statement以后再执行?**



```js
count = [1,2,]  // 2
console.log(count);
count = [,,,]   // 3
console.log(count)?????
```



```js
//method1:在构造函数中定义特权方法？？？？？
function Person(name,age){
    // 此处不使用this的原因，是想隐藏内部数据
    // this.myName = name;  
    // this.myAge = age;
    var myName = name;
    var myAge = age;
    this.getName = function(){
        return myName;
    };
    this.setName = function(value){
        myName = value;
    };
    this.getAge = function(){
        return myAge;
    };
    this.setAge = function(value){
        myAge = value;
    }
}
var person = new Person("wangwei",18);
console.log(person.getName());
person.setName("Wujing");
console.log(person.getName());
person.setAge(person.getAge()+1);
console.log(person.getAge())

//柯里化（currying）为bind()方法传入参数，该参数也会绑定至this
var o = {a:1}
var fun = sum.bind(o,1)
var myFun = new fun(8,9,10); 
console.log(myFun)
console.log(myFun.getNum())  // NAN???


```





**closure 闭包是否等同于recursion?**

```js
//closure
function outerFunc(x) {
	//outer function
  return function innerFunc(y) {
    //innerfunc have access variable x of external function
    return x + y
  }
}

const addFive = outFunc(5)
console.log(addFive(3)) //8

//recursion
function fatorial(n) {
  if (n<=1) {
    return 1
  }
  return n * factorial(n-1)
}
console.log(factorial(5)) //5!

//机制:递归调用自身,闭包访问外部作用域变量
//目的:闭包封装数据,保持状态;递归解决分解为相同子问题的问题
//执行方式:闭包创建后可以多次调用保持状态;递归调用自身来解决问题
```



**泛型**

参数化类型 使用站位符

```js
//before
function getFirstItem(arr: any[]):any {
return arr[0]
}
const numbers = [1,2,3]
const strings = ['a','b','c']

const firstNumber = getFirstItem(numbers) //any
const firstString = getFirstItem(strings) //any

//after
function getFirstItem<T extends {length:number}>(arr: T[]): T {
    return arr[0]
  	return arr.length
} 
//<T, K extends keyof T>(obj: T, key: K): T[K]  和上面区别是啥?

const numbers = [1, 2, 3];
const strings = ['a', 'b', 'c'];

const firstNumber = getFirstItem(numbers); // type(number)
const firstString = getFirstItem(strings); // type(string)
const result = getFirstItem(42) //自动推断
```



**原型链**

继承和属性查找

对象通过__proto__属性(/object.getprototypeOf())连接形成的链条,实现属性和方法的继承和查找

```js
//prototype
function Person(name){
this.name = name
}

Person.prototype.sayHello = function(){
console.log('Hello,I am ${this.name}')
}

const person1 = new Person('Alice')
const person2 = new Person('Bob')

person1.sayHello()
person2.sayHello()

//__proto__
function Animal(type){
  this.type = type
}

const dog = new Animal('dog')
console.log(dog.__proto__ === Animal.prototype) //true //dog.__proto__指向animal.prototype
console.log(dog.__proto__.constructor === Animal) //true
//__proto__访问原型链上数据
```

```js
Dog (实例)
    ↓ __proto__
Dog.prototype
    ↓ __proto__
Animal.prototype
```

