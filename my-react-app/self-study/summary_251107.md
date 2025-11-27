JS数据类型:Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt

*Symbol作为属性名时不会被遍历出来：通过Symbol类型作为对象的属*

*性名， 可以确保这些属性不会被for...in 、Object.keys() 、*

*Object.getOwnPropertyNames()、JSON.stringify()等方法遍历出来，*

*从而保护这些属性的安全*

```js
const color = {
	RED:Symbol('RED')
}

let selectedColor = Color.RED

if (selectedColor === color.RED){
console.log('Selected color is Red')
} else if (selectedColor === Color.GREEN) {
console.log('Selected color is Green');
} else if (selectedColor === Color.BLUE) {
console.log('Selected color is Blue');
}
```

*BigInt*存储任意精度格式的整数,即使超过了*Number 能够表示的安全整数范围*



*原始数据类型（Undefined、Null、Boolean、Number、String）*因为频繁使用,放在stack(*编译器自动分配释放，存放函数的参数值，局部变量的值*)

*引用数据类型（对象）*在heap(*由开发者分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收*),占据空间大,大小不固定,如果放stack,影响程序运行性能;但是在stack存储指针,指针指向heap(优先级排序,按照大小规定)中实体的起始位置.解释器寻找引用值,检索stack地址,取得地址后从heap中获得实体



**数据属性**

typeof:null判断为object,null全为0,000是object

instanceof是基于原型链查询,测试对象在原型链是否存在构造函数的prototype属性

```js
let str = new String('Hello');
console.log(str instanceof String);//true
```

constructor属性:basic+quote

```js
console.log(([]).constructor === Array); // true
console.log(({}).constructor === Object); // true
console.log(([]).constructor === Array); // true
console.log(([]).constructor === Object); // false
```

```js
function myInstanceof(left, right) {
// 获取对象的原型
let proto = Object.getPrototypeOf(left)
// 获取构造函数的 prototype 对象
let prototype = right.prototype;
// 判断构造函数的 prototype 对象是否在对象的原型链上
while (true) {
if (!proto) return false;
if (proto === prototype) return true;
// 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法
用来获取指定对象的原型
proto = Object.getPrototypeOf(proto);
}
}
```

转换成string:

number中极值用指数形式; symbol只允许显示强制类型转换,隐式转换产生错误

```js
// 显式将 Symbol 类型转换为字符串
var symbol = Symbol("example symbol");
var symbolString = String(symbol);
console.log(symbolString); //'Symbol(example symbol)'

// 隐式将 Symbol 类型转换为字符串（产生错误）
var symbol = Symbol("example symbol");
var symbolStringImplicit = symbol + ""; // 会产生错误
```

*对引用 类型来说， 除非 自 行 定义 toString() 方 法， 否则会调用*

*Object.prototype.toString()方法，显示的结果是"[object Object]"。如果对*

*象重写了 toString() 方法，字符串化时就会调用该方法并使用其返回值。*?????



number()*值显式转换为数字*

*对于最普通的对象， 它的valueOf 方 法也就是*

*Object.prototype.valueOf()返回的是对象本身，这也就是为什么我们在*

*Number(obj)时，先调用Object.prototype.valueOf()返回的是**对象本身**，不*

*是基础类型的值， 那么就使用 toString() 方 法， 返回的是*

*“[Objcet,Object]"，是基础类型（String）, 那么按照基本类型强制转化的规*

*则，不是数字，返回的是undefined。*?????

*浏览器的全局对象是window，Node的全局对象是*global*



var,let.const

const声明变量一定要设置初始值

let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量不允许改变指针的指向。

*对于基本数据类型，无法修改使用* *const* 声明的变量，这使其表现为常量。对于引用数据类型，栈中保存的仅是在堆中的地址，实际的属性值存储在堆中。因此，在使用const声明引用数据类型变量时，虽然不可重新赋值一个新的引用类型给该变量（因为这会改变栈中的指针指向），但并不限制修改内部属性值。这意味着可以更改引用数据类型变量指向的对象的属性值，但不能将其指向另一个对象。(引用数据类型，*const* *限制了重新赋值新对象，但允许修改对象的属性值*)



遍历object属性

```
for in //遍历对象所有的可枚举属性（自有的+继承的属性）但不包括Symbol属
性
Object.keys()/for...in + Object.hasOwnPropert
y.call() //遍历对象自有的所有可枚举属性（非继承属性）但是不包括Symbol属
性
Object.getOwnPropertyNames()//遍历对象自有的所有可枚举和不可枚举属性（非继承属性）但是不包括Symbol属性
Object.getOwnPropertySymbols() //获取对象所有的Symbol属性
Reflect.ownKeys() //获取对象所有的属性，无论是否枚举，是否继承，是否为Symbol
```

*myMap.forEach(callbackFn)* 

callbackFn(value,key,map)



localStorage：用于长期存储（用户偏好、设置、购物车等）

sessionStorage：用于临时存储（表单草稿、临时状态等）

两者 API 相同，主要区别是生命周期和作用域

只能存储字符串，对象/数组需要用 JSON 转换



强引用 vs 弱引用对象

weakmap 

weakset*对象中储存的对象值都是被弱引用的，即垃圾回收机制不考*

*虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个*

*对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于*

*WeakSet 中*

Map vs Object

JSON *JavaScript Object Notation* 语法基于js



**原型链** 

Object.getPrototypeOf() 

由于Object是构造函数，原型链终点是**Object.prototype.__proto__* *，而* *Object.prototype.__proto__=== null // true* *，所以，原型链的终点是null*

```
┌─────────────────────────────────────────┐
│  cat (实例对象)                          │
│  { name: "cat" }                        │
└──────────────┬──────────────────────────┘
               │ __proto__
               ↓
┌─────────────────────────────────────────┐
│  Animal.prototype                       │
│    (构造函数的原型)                        │
└──────────────┬──────────────────────────┘
               │ __proto__
               ↓
┌─────────────────────────────────────────┐
│  Object.prototype                       │
│  (所有对象的最终原型)                    │
│  - hasOwnProperty()                     │
│  - toString()                           │
│  - valueOf()                            │
│  ...                                    │
└──────────────┬──────────────────────────┘
               │ __proto__
               ↓
┌─────────────────────────────────────────┐
│  null                                   │
│  (原型链终点！)                          │
└─────────────────────────────────────────┘
```

