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





**是不是e.target还能替换成srcElement(非标准)?**

e.srcElement 是IE 浏览器里面使用的  而 e.target 是 W3C 的标准，适用于大部分的浏览器。



**加网站图标favicon的时候是不是尽量用ico(兼容性强),png尽量少用(老旧浏览器不支持)?**
单个PNG favicon-32x32.png ≈1-3 KB
ICO 包含多尺寸: (包含16,32,48,64尺寸)~5-15KB

ICO+SVG 最佳视觉效果



**哈希表特性和原理**

算法题中把他和dictionary同样处理,是否可以? 动态扩容,无序,需要预留额外空间处理冲突;负载因子<0.7,性能好,冲突少;理想负载因子0.75(JAVA hashmap默认值)

时间:平均O(1)查找、插入、删除;最坏O(n) 查找、插入、删除

空间O(n)



**不要把DOM节点属性值放在一个循环当作循环里的变量**

性能优化原则

```js
//在循环里重复获取DOM属性 操作昂贵;DOM操作比JS变量操作满,频繁修改央视触发重排和重绘
for (let i=0;i<1000;i++) {
  const element = document.getElementById('myElement')
  element.style.left = i+'px'
  element.style.top = i + 'px'
  elenent.className = 'moving'
  element.innerHTML = 'Position:'+i
  // or use CSS class ????
  //element.className = `position-${i}`
  //element.innerHTML = 'Position:'+i
}

//better version
//批量更新样式
const element = document.getElementById('myElement')
//收集样式变更
const updates = []
for (let i=0;i<1000;i++) {
  updates.push({ ???push()用法
    left:i+'px'
    top:i+'px'
    className:'moving'
    innerHTML:'Position:'+i
  })
}

//一次性应用
//Object.assign()将1/n个源对象中所有可枚举自有属性复制到目标对象，返回修改后的目标对象
updates.forEach(update => {
  Object.assign(element.style, {
    left:update.left,
    top:update.top
  })
  element.className = update.className
  element.innerHTML = update.innerHTML
})
```





**documentFragment不是真实DOM的⼀部分，它的变化不会触发DOM树的重新渲染，不会导致性能问题；效果不甚明显，因为现代浏览器会使⽤队列存储储存多次修改优化**

```js
//DocumentFragment
const fragment = document.createDocumentFragment()
for (let i=0;i<1000;i++){
  const div = document.createElement('div')
  div.textContent = 'Item'+i
  fragment.appendChild(div) // 不会触发重排重绘
}

//DOM
for (let i=0;i<1000;i++) {
  const div = document.createElement('div')
  div.textContent = 'Item' + i
  container.appendChild(div) // 理论上会触发1000次重排重绘
}

//现代浏览器批量更新队列，延迟执行DOM？？？
function browserOptimization() {
	for（let i=0;i<1000;i++) {
    const div = document.createElement('div')
    div.textContent = 'Item' + i
    container.appendChild(div)
    div.style.color = 'red'
    div.style.fontsize = '14px'
  }
  //将操作加入队列 > 在合适的时机批量执行 > 只触发一次重排重绘
  }

//性能比较：innerHTML>DOM,DocumentFragment
//避免强制同步布局(性能瓶颈)
//简单操作：DOM短平快；复杂结构：DocumentFragment 仍有价值；大量数据：虚拟滚动等高级优化
```



**权值计算要基于选择器的形式。特别是，“[id=p33]”形式的选择器被视为属性选择器(权值为10)，即使id属性在源⽂档的⽂档类型中被定义为“id选择器”**

```js
//权重计算
div  1
#id   100（1个id）
.class  10(1个class)
[type="text"] 10(1个属性选择器)
:first-child   10(1个伪类)
::before  1(1个伪元素)
```



```js
<!DOCTYPE html>
<html>
<head>
<style>

#p33 {  //id selector
  color:red
}
[id=p33]{ //Attribute Selector - Weight 10
  color:blue 
}
.class-test {
  color:green //class selector - Weight 10
}
</style>
</head>
<body>
    <p id="p33" class="class-test">这个文本会是什么颜色？</p>
</body>
</html>
```

权值计算式决定样式冲突时那个规则被应用，可以确定最后应用样式；多个规则匹配同一元素，按照**来源重要性-> 特异性（权值）-> 声明顺序** 顺序决定



**通配符 * 和关系选择符(+ > ~ '' ||)和否定伪类(:not()) 对优先级没有影响，但是:not内部声明的选择器会影响优先级？？？**

不影响特异性的选择器

- 通配符 *

- 关系选择符 +, >, ~, (空格), ||

- 否定伪类 :not() 本身

影响特异性的    :not() 内部的选择器会正常计算特异性



**写scss嵌套、定义变量、混合、继承demo**

```

```



**CSS性能优化：css雪碧图？**

雪碧图：多个小图标、图片合并成一张大图，通过css的background-position属性显示需要的部分

可以减少HTTP请求，降低网络延迟，提高加载速度

```js
.sprite{ //雪碧图
  background-image: url('sprite.png')
  background-repeat: no-repeat
}

// 雪碧图生成器
class SpriteGenerator {
    constructor() {
        this.icons = [];
    }
    
    addIcon(name, width, height) {
        this.icons.push({ name, width, height });
        return this;
    }
    
    generateSprite() {
        // 计算雪碧图尺寸
        const totalWidth = this.icons.reduce((sum, icon) => sum + icon.width, 0);
        const maxHeight = Math.max(...this.icons.map(icon => icon.height));
        
        // 生成CSS
        let css = '.sprite-icon {\n    background-image: url("sprite.png");\n    background-repeat: no-repeat;\n}\n\n';
        
        let currentX = 0;
        this.icons.forEach(icon => {
            css += `.${icon.name} {\n`;
            css += `    width: ${icon.width}px;\n`;
            css += `    height: ${icon.height}px;\n`;
            css += `    background-position: -${currentX}px 0;\n`;
            css += `}\n\n`;
            currentX += icon.width;
        });
        
        return {
            css,
            dimensions: { width: totalWidth, height: maxHeight }
        };
    }
}

// 使用示例
const generator = new SpriteGenerator();
generator
    .addIcon('home', 32, 32)
    .addIcon('user', 32, 32)
    .addIcon('settings', 32, 32);

const result = generator.generateSprite();
console.log(result.css);
```

什么时候用雪碧图？

```js
// 决策矩阵
const spriteDecisionMatrix = {
    useSprite: [
        '小图标数量多（>10个）',
        '图标尺寸固定',
        '需要支持老旧浏览器',
        '图标不经常变化'
    ],
    
    useSVG: [
        '需要高DPI支持',
        '图标需要CSS样式控制',
        '现代浏览器环境',
        '图标需要动画效果'
    ],
    
    useIndividual: [
        '图标数量少（<5个）',
        '图标经常变化',
        '需要懒加载',
        '图标尺寸差异很大'
    ]
};
```





**在 js 中不是⼀个保留字，不要用来作为变量名，危险！影响对undefined值的判断，可以通过void0获得安全undefined值？？

```js
// undefined可以被重新赋值，不是保留字
// non-district模式可以重新赋值（危险！）
undefined="hacked"
console.log(undefined) //"hacked!"
//影响对undefined值判断
let x
if(x===undefined){
  console.log("x is undefined") //可能不会执行！
}

//获取undefined方法
console.log(void 0) //undefined
console.log(void 0 === undefined) //可能为false（如果undefined被污染）
let x
if (x === void 0) {
  console.log("x is truly undefined")
} 
// void 0 无法被重写
void = "hacked!" // SyntaxError: Unexpected token '='

//method2: typeof
const isUndefined2 = (value) => typeof value == "undefined"

//method3 use strict
(function(){
  "use strict"
  const safeUndefined = undefined
  const isUndefined3 = (value) => valu === safeUndefined
})()

//method4: arguments
function getUndefined(){
  return arguments[0] // 当不传参数时返回undefined
}
const safeUndefined = getUndefined()
```



```js
//函数参数检查
// 不安全的写法
function processData(data) {
    if (data === undefined) {
        console.log("No data provided");
    }
    // 如果undefined被污染，这里可能出错
}

// 安全的写法
function processDataSafe(data) {
    if (data === void 0) {
        console.log("No data provided");
    }
    // 使用void 0确保安全
}

// 或者使用typeof
function processDataTypeof(data) {
    if (typeof data === 'undefined') {
        console.log("No data provided");
    }
}
```

**null的存储单元最后三位(即 标志位)和object⼀样，所以被误判为Object？一直的问题？**

JS的bug，由于V8引擎内部实现细节

```js
// V8引擎内部使用标记位来区分数据类型
// 对象类型：最后三位是 000
// null：最后三位也是 000
// 这导致 typeof null 返回 "object"
// JavaScript的原始设计（1995年）
// null 被设计为表示"空对象引用"
// 但 typeof 操作符的实现有bug
console.log(typeof null); // "object" - 这是错误的！
console.log(typeof {});   // "object" - 这是正确的
console.log(null === null);           // true
console.log(Object.prototype.toString.call(null)); // "[object Null]"

// 常见的错误类型检查
function checkType(value) {
    if (typeof value === 'object') {
        console.log("这是一个对象");
        // 但null也会进入这里！
    }
}

checkType({});  // "这是一个对象"
checkType(null); // "这是一个对象" - 错误！

// 正确的类型检查
function checkTypeCorrect(value) {
    if (value === null) {
        console.log("这是null");
    } else if (typeof value === 'object') {
        console.log("这是一个对象");
    }
}
```





**对象转换为字符串，数字 demo**



**显式转换/隐式转换（转换成字符串，boolean，number） demo**



**十进制转化成二进制** 



**数组去重demo indexof includes filter**



**数组排平 demo**



**类对象数组 有callee和length属性 如何转换为数组？？？**

```js
// 类数组对象的特征
function example() {
    console.log(arguments);           // Arguments对象
    console.log(arguments.length);    // 有length属性
    console.log(arguments[0]);        // 有数字索引
    console.log(Array.isArray(arguments)); // false - 不是数组
}

example(1, 2, 3)

// 手动创建类数组对象
const arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    callee: function() { return 'test'; }
};

console.log(arrayLike[0]);        // 'a'
console.log(arrayLike.length);    // 3
console.log(arrayLike.callee());  // 'test'
console.log(Array.isArray(arrayLike)); // false

// ES6+ 推荐方法
function convertToArray() {
    // arguments对象
    const argsArray = Array.from(arguments);
    console.log(Array.isArray(argsArray)); // true
    
    // NodeList
    const divs = document.querySelectorAll('div');
    const divArray = Array.from(divs);
    console.log(Array.isArray(divArray)); // true
    
    // 自定义类数组对象
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    const realArray = Array.from(arrayLike);
    console.log(realArray); // ['a', 'b', 'c']
}

// 使用映射函数
const doubled = Array.from(arrayLike, x => x + x);
console.log(doubled); // ['aa', 'bb', 'cc']

//Array.prototype.slice.call()
// 传统方法 - 兼容性好
function convertWithSlice() {
    // arguments对象
    const argsArray = Array.prototype.slice.call(arguments);
    console.log(Array.isArray(argsArray)); // true
    
    // 简写形式
    const argsArray2 = [].slice.call(arguments);
    
    // 自定义类数组对象
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    const realArray = Array.prototype.slice.call(arrayLike);
    console.log(realArray); // ['a', 'b', 'c']
}
```



**arguments为什么不是数组？**

arguments 被设计为函数调用时的参数容器,为了提供对函数参数的访问，支持可变参数函数，保持和函数的绑定关系，所以不是真正数组，是对象，ta引用函数参数，避免额外内存分配；如果arguments是数组，需要额外空间存储副本，当前实现更节省内存；简化原型链，避免继承Array.prototype的复杂性；明确区分参数对象和真正的数组

```js
// arguments 与函数参数的特殊关系
function parameterBinding(x, y) {
    console.log('x:', x, 'y:', y);
    console.log('arguments[0]:', arguments[0], 'arguments[1]:', arguments[1]);
    
    // 修改参数会影响arguments
    x = 100;
    console.log('After x=100:');
    console.log('x:', x, 'arguments[0]:', arguments[0]); // 都会是100
    
    // 修改arguments也会影响参数（非严格模式）
    arguments[1] = 200;
    console.log('After arguments[1]=200:');
    console.log('y:', y, 'arguments[1]:', arguments[1]); // 都会是200
}

parameterBinding(1, 2);
```



**什么数字可以进行几何运算？**

所有都可以.

Number类型：整数、小数、科学记数法、十六进制等

特殊数值：Infinity、-Infinity、NaN（有特殊行为）

BigInt：用于大整数运算，但几何运算有限制

JS数字系统支持几何运算，可以进行数字计算和图形处理（math对象）

```js
// JavaScript只有一种数字类型：Number
// 它基于IEEE 754双精度浮点数标准

const integers = [1, -5, 0, 100];
const decimals = [3.14, -2.5, 0.001];
const scientific = [1e5, 2E-3, 1.23e+4]; // 科学记数法
const hex = [0xFF, 0x1A]; // 十六进制
const octal = [0o777, 0o123]; // 八进制（ES6+）
const binary = [0b1010, 0b1111]; // 二进制（ES6+）

console.log(typeof integers[0]); // "number"
console.log(typeof decimals[0]); // "number"

// JavaScript中的特殊数字值
const specialNumbers = {
    infinity: Infinity,
    negativeInfinity: -Infinity,
    notANumber: NaN,
    maxValue: Number.MAX_VALUE,
    minValue: Number.MIN_VALUE,
    maxSafeInteger: Number.MAX_SAFE_INTEGER,
    minSafeInteger: Number.MIN_SAFE_INTEGER
};

console.log(specialNumbers)

//infinity
function infinityOperations() {
    const inf = Infinity;
    const negInf = -Infinity;
    
    console.log(inf + 1);        // Infinity
    console.log(inf - 1);        // Infinity
    console.log(inf * 2);        // Infinity
    console.log(inf / 2);        // Infinity
    
    console.log(inf + negInf);   // NaN
    console.log(inf - inf);      // NaN
    console.log(inf / inf);      // NaN
    
    console.log(inf * 0);        // NaN
    console.log(inf / 0);        // Infinity
    
    // 比较运算
    console.log(inf > 1000);     // true
    console.log(inf === inf);    // true
}

//NaN
function nanOperations() {
    const nan = NaN;
    
    // NaN与任何数的运算结果都是NaN
    console.log(nan + 1);        // NaN
    console.log(nan - 1);        // NaN
    console.log(nan * 2);        // NaN
    console.log(nan / 2);        // NaN
    
    // NaN与NaN的运算
    console.log(nan + nan);      // NaN
    console.log(nan - nan);      // NaN
    
    // NaN的比较
    console.log(nan === nan);    // false (特殊!)
    console.log(nan == nan);     // false
    console.log(isNaN(nan));     // true (检查NaN的正确方法)
    
    // Number.isNaN vs isNaN
    console.log(isNaN("hello"));      // true (会先转换)
    console.log(Number.isNaN("hello")); // false (不会转换)
}

//0
function zeroOperations() {
    const posZero = 0;
    const negZero = -0;
    
    console.log(posZero);        // 0
    console.log(negZero);        // -0
    
    // 比较
    console.log(posZero === negZero); // true
    console.log(Object.is(posZero, negZero)); // false (严格比较)
    
    // 运算
    console.log(1 / posZero);    // Infinity
    console.log(1 / negZero);    // -Infinity
    
    // 字符串转换
    console.log(negZero.toString()); // "0"
    console.log(negZero.toFixed(1)); // "0.0"
}

//浮点数精度问题(经典)
function precisionIssues() {
    console.log(0.1 + 0.2);      // 0.30000000000000004
    console.log(0.1 + 0.2 === 0.3); // false
    
    const result = (0.1 + 0.2).toFixed(1);
    console.log(result);          // "0.3"
    console.log(parseFloat(result) === 0.3); // true
    
    // 使用Number.EPSILON近似比较
    function isEqual(x, y) {
        return Math.abs(x - y) < Number.EPSILON;
    }
    
    console.log(isEqual(0.1 + 0.2, 0.3)); // true
}

//大数运算
function bigNumberOperations() {
    // JavaScript的数字范围限制
    console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
    console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
    
    // 超出安全范围的大数运算
    const big1 = 9007199254740992;
    const big2 = 1;
    console.log(big1 + big2);     // 9007199254740992 (不准确!)
    
    // 使用BigInt处理大数
    const bigInt1 = 9007199254740992n;
    const bigInt2 = 1n;
    console.log(bigInt1 + bigInt2); // 9007199254740993n (准确)
    
    // BigInt的限制
    console.log(bigInt1 / bigInt2); // 9007199254740992n (整数除法)
    // console.log(Math.sqrt(bigInt1)); // 错误! Math函数不能用于BigInt
}

//animation
class AnimationMath {
    // 线性插值
    static lerp(start, end, t) {
        return start + (end - start) * t;
    }
    
    // 缓动函数
    static easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    
    // 正弦波动画
    static sineWave(time, frequency = 1, amplitude = 1) {
        return Math.sin(time * frequency) * amplitude;
    }
    
    // 旋转矩阵（2D）
    static rotate2D(x, y, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            x: x * cos - y * sin,
            y: x * sin + y * cos
        };
    }
    
    // 缩放变换
    static scale(x, y, scaleX, scaleY) {
        return { x: x * scaleX, y: y * scaleY };
    }
}

// 使用示例
console.log(AnimationMath.lerp(0, 100, 0.5)); // 50
console.log(AnimationMath.rotate2D(1, 0, Math.PI / 2)); // {x: 0, y: 1}

//精度控制
function preciseCalculation(a, b, precision = 10) {
    const factor = 10 ** precision;
    return Math.round((a * factor) * (b * factor)) / (factor * factor);
}

console.log(preciseCalculation(0.1, 0.2)); // 0.02

```


用hooks一部分是因为生命周期用不了异步模式,以及生命周期是按照时间顺序分布，this 在类组件里要绑定，以及不是按照功能jieou。但我感觉 hooks 也就是变成了箭头，也还是要绑定 this 吧?hooks 用不到 this?

为了简洁 以及函数式写法



https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy

同源策略?????浏览器的安全策略



**let和const重新赋值的时候是不是相当于引用的变量占用的内存地址变了因为值变了?**

取决于数据结构  也就是 原始值  比如 number，string 等。 还是 引用类型值 比如 对象



https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce 

globalThis 在浏览器环境中为 window

在node环境中为global



**Anchor**

![03bd8d95f37996b501cc502badb9bb11](/Users/jiayuzhao/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_o7rklxqiags412_cd26/temp/RWTemp/2025-11/452e0ec3d6b8c802dee8c8ce67aa817b/03bd8d95f37996b501cc502badb9bb11.png)

html中<a href="#" class="animal cat">在js中a.href = '#'; 点击不会自动跳转

a.href = '#' 在 JavaScript 中的作用 和 在 HTML 中写 <a href="#"> 的效果是 相似的



**解释器是SpiderMonkey/V8,是不是只有浏览器环境的区别?**

V8不仅在浏览器中 还在node中进行JS的引擎



**对引用类型来说，除非自行定义toString()方法，否则会调用Object.prototype.toString()方法，显示的结果是"[object Object]"。如果对象重写了 toString()方法，字符串化时就会调用该方法并使用其返回值??**

toString()是可以被我们改写的.内置行为是浏览器默认的。 但是我们可以去改这种设置



JQ也是一种框架。 是操作DOM的事件驱动。而不是react的数据驱动。加载的过程永远遵循 单线程 + event loop的原则



$(this).css('color', 'red').sibling().css('color', '') 
.xx().xx().xx()算是链式编程格式?✅



**promise操作完不会有新的状态变化,实例状态变化只可能发生一次,无法逆转.他相当于一次性用品,用完就无了?**

状态是不可逆的 一旦fulfilled 或 rejected 那么就会保存这个结果。 所以你说一次性用品 是这个就可以。但是新的变化在于 .then  就是说 链式后面可能有新的内容



**Git操作的终究结果:工作区文件都处于未修改状态?????**

**比如我在git端push origin后目前所有文件状态是未修改,然后我修改后再push,云端被修改后再次变成默认Unmodified状态???? 这样工作区和git仓库保持一致,表达的是这个意思?**

本地仓 和 远程仓的一致性问题

[Symbol.iterator]算是迭代器本身？“用来告诉 JS 当别人对我用 for...of 要用哪个迭代器？”这句话意思是 下面 for 遍历的时候告诉it 要用[Symbol.iterator]迭代器？
不算迭代器本身， [Symbol.iterator] 是一个函数 或者说 一个方法。要区分开 迭代器 和迭代对象

浅拷贝是不是一种机制 实现浅拷贝有很多种方法 并且在修改第一层不会改变原对象 但如果修改嵌套对象就会影响原对象了？
嗯：对拷贝对象中的嵌套属性进行修改，原对象也会被修改。

const once = fn => { 
            let done = false, val;
            return (...args) => done ? val : (done = true, val = fn(...args))
          } 

三元表达式  done ? val : (done = true, val = fn(...args)) 能不能写成"done ? val : (val = fn(...args),done = true) "?后面括号里参数顺序换个位置？
ok

reflect和window区别 都是全局对象?
完全不同的两个东西。 reflect 是 拦截js操作的方法。 window 是顶层对象。

| 特性       | 静态方法             | 实例方法                | 动态方法                               |
| ---------- | -------------------- | ----------------------- | -------------------------------------- |
| 绑定位置   | 类本身               | `Class.prototype`       | 运行时决定（挂在实例或通过表达式生成） |
| 调用方式   | `Class.method()`     | `instance.method()`     | 依定义方式决定                         |
| `this` 指向| 类（或调用者设置）   | 实例                   | 取决于赋值的上下文                     |
| 场景       | 工具函数、工厂函数   | 行为操作实例数据        | 灵活扩展、按需生成函数                 |



JQuery vs React Query？
