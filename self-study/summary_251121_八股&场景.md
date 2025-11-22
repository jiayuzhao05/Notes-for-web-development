内存泄漏:变量被使用后没有进行回收，一直存在于内存中，导致不必要的浪费



垃圾回收机制

引用计数法:内部有一个引用计数器，这个计数器会跟踪一个对象空间的引用次数，当声明一个变量，并将这个对象空间赋值给这个变量的时候，这个对象空间的引用次数就加一，当某个指向它的变量转而指向其他值时，引用次数就减1，当引用次数为0时就回收

缺点:两个对象互相引用的时候，会导致内存泄漏

标记清除法:从根部出发扫描内存中的对象，把能扫描到的对象，打上标记，扫描不到的对象就标记为不再使用，稍后回收



继承

1.原型链继承 父类的实例化对象作为子类的原型

```js
function Parent() {
  this.name = 'Parent';
}

Parent.prototype.sayHello = function() {
  console.log('Hello from Parent');
};

function Child() {
  this.age = 10;
}

// 原型链继承
Child.prototype = new Parent();

const child1 = new Child();
console.log(child1.name);  // 'Parent'
child1.sayHello();        // 'Hello from Parent'

const child2 = new Child();
console.log(child2.name);  // 'Parent'
child2.sayHello();        // 'Hello from Parent'
```

2.构造函数继承 创建子类构造函数时利用call/apply改变子构造函数的this指向,等于复制父类给子

```js
function Parent() {
  this.name = 'Parent';
}

Parent.prototype.sayHello = function() {
  console.log('Hello from Parent');
};

function Child() {
  Parent.call(this);  // 使用 call 改变 this 指向，继承父类构造函数中的属性
  this.age = 10;
}

const child1 = new Child();
console.log(child1.name);  // 'Parent'
console.log(child1.age);   // 10
child1.sayHello();         // 报错，child1 没有继承父类的 sayHello 方法
```

3.组合继承

创建子类构造函数时改变子构造函数的this指向，把父类的实例化对象赋值给子类的原型

既是子类的实例，也是父类的实例

```js
function Parent() {
  this.name = 'Parent';
}

Parent.prototype.sayHello = function() {
  console.log('Hello from Parent');
};

function Child() {
  Parent.call(this);  // 继承父类构造函数的属性
  this.age = 10;
}

// 原型链继承
Child.prototype = new Parent();  // 继承父类的原型方法
Child.prototype.constructor = Child;  // 修复 constructor 指向

const child1 = new Child();
console.log(child1.name);  // 'Parent'
console.log(child1.age);   // 10
child1.sayHello();         // 'Hello from Parent'

const child2 = new Child();
console.log(child2.name);  // 'Parent'
child2.sayHello();        // 'Hello from Parent'
```

4.寄生组合继承

```js
function Parent() {
  this.name = 'Parent';
}

Parent.prototype.sayHello = function() {
  console.log('Hello from Parent');
};

function Child() {
  Parent.call(this);  // 继承父类构造函数的属性
  this.age = 10;
}

// 使用 Object.create() 来创建一个具有父类原型的对象
Child.prototype = Object.create(Parent.prototype);  // 继承父类原型方法
Child.prototype.constructor = Child;  // 修复 constructor 指向

const child1 = new Child();
console.log(child1.name);  // 'Parent'
console.log(child1.age);   // 10
child1.sayHello();         // 'Hello from Parent'

const child2 = new Child();
console.log(child2.name);  // 'Parent'
child2.sayHello();        // 'Hello from Parent'
```

**进程 vs 线程**

进程:操作系统分配资源基本单位 (一个进程包含多个线程)

线程:操作系统运算调度的基本单位

浏览器的二者概念类似于操作系统

浏览器进程是每个独立标签页 每个标签页有一个对应的渲染进程 渲染当前页面

js线程:js代码由主线程(ui线程)执行,线程负责执行脚本,处理时间和用户交互,通常是单线程,为了避免多线程并发执行带来的复杂性

web worker: 独立线程执行耗时任务 避免阻塞主线程 允许后台执行脚本 不和主线程共享内存,二者通过消息传递交互数据 适用不需要和DOM交互长时间运行/资源密集型任务(workers无法访问DOM)

一般计算时长超过50ms,推荐web worker



**异步处理**方法

| callbackFn  | 一直回调                                                     |
| ----------- | ------------------------------------------------------------ |
| promise     | 解决回调地狱,链式调用,获取上一个异步函数返回结果             |
| async/await | async标记函数为异步执行,await解析函数实例,自动调用promise.then(),获取结果 |
| generator   | 暂停和恢复执行,实现复杂异步流程,需要使用特定的语法和工具支持,使用复杂 |



**Promise** 核心:同步异步都能正确处理

.then() 

| 同步 | 执行到.then() (status:fulfilled/rejected),如果全是同步代码理论上可以省略pending处理 |
| ---- | ------------------------------------------------------------ |
| 异步 | status:pending,需要将回调存储起来,等待异步操作完成后执行     |

async/await 实现原理

遇到 await 时，JS 引擎会暂停当前 async 函数的执行->将 await 后面的表达式包装成 Promise->等 Promise 状态变为 resolved 后恢复函数执行->如果是 rejected 状态则抛出异常

底层实现机制：

- 通过 Generator 的 yield 暂停函数执行
- 通过 Promise 的 then 方法实现异步操作的等待
- 通过自动执行器（类似 co 库）来控制 Generator 的流程

await的错误通过try-catch/.catch()捕获



**promise实现原理,使用什么设计模式?**

设计模式:

- 发布-订阅模式：Promise通过then/catch方法注册回调函数（订阅者），当异步操作完成时（发布者状态变更）通知所有订阅者
- 状态机模式：Promise内部维护pending/fulfilled/rejected三种状态，状态变更不可逆

实现机制

初始化时处于pending状态->resolve/reject改变状态，并保存结果值/错误原因->触发对应的回调队列->.then()返回新Promise实现链式调用->微任务队列（MutationObserver/process.nextTick）实现异步调度



#### 有一个async await函数，里面可能有错误，如何在调用的时候，让他既能捕获错误，又能不影响后续代码执行？可以使用try catch吗？如果使用try catch，catch会捕获到await内部的错误吗

1. try catch
2. await后加一个catch
3. Promise.allSettled



**promise缺点**

| 无法取消                   | 创建后一直执行,资源浪费                                      |
| -------------------------- | ------------------------------------------------------------ |
| 错误处理麻烦               | .catch()如果没加，错误不易发现                               |
| 嵌套地狱                   | 处理异步操作，.then()链式调用陷入套娃结构                    |
| 无法知道当前promise status | 只能通过 `.then()` 和 `.catch()` 方法来访问成功或失败的结果  |
| 无法共享结果               | 每个promise实例独立                                          |
| 组合无法满足所有场景下需求 | `Promise.all()` 和 `Promise.race()` 等组合方法               |
| 不适合异步流程控制         | Promise 虽然可以解决简单的异步问题,但对于复杂的异步流程控制,比如条件判断、循环等,它的表现并不出色 |



**Proxy** 

允许通过自定义行为拦截和操作对象（属性访问，赋值，枚举，函数调用）（用于数据验证、日志记录、性能优化）

```js
let proxy = new Proxy(target,handler)
//target：目标对象，`Proxy` 会代理对该对象的所有操作
//handler:obj 定义代理对象的行为，可以是对目标对象操作的捕获器（trap）
```



Object.defineProperty vs Proxy

- **操作范围**：`Object.defineProperty` 用于定义或修改单个属性，而 `Proxy` 可以拦截和修改对象的多个操作。
- **灵活性**：`Proxy` 提供了更多的控制和灵活性，可以拦截和自定义对象的多种行为。
- **兼容性**：`Object.defineProperty` 在旧版浏览器中也有较好的支持，而 `Proxy` 需要 ES6 环境。

需要对对象的单个属性进行精细控制，`Object.defineProperty` 

需要对对象的多个操作进行拦截和自定义，`Proxy` 



Reflect vs Object

- `Reflect` 与 `Proxy` 配合使用，以提供对对象操作的控制。`Object`用于创建、修改、查询对象的属性和行为。
- `Reflect.defineProperty()` 和 `Object.defineProperty()` 都用于定义属性，但 `Reflect.defineProperty()` 返回一个布尔值，而 `Object.defineProperty()` 返回被操作的对象。
- `Object`兼容较好，`Reflect` 是 ES6 引入



**DOM的location 对象**

包含当前url信息对象

属性：

href 设置或返回当前url路径
hash 设置或返回#后的参数，也就是哈希值
search 设置或返回当前地址携带的参数，也就是问号后面的参数
host 设置或返回主机名或者端口号
reload方法，重新加载当前页面



**Object.defineProperty()**

Object.defineProperty(obj,prop,description)

(属性对象，属性名称，属性描述)

description:

| Configuration | 是否能被删除或者修改 默认false                |
| ------------- | --------------------------------------------- |
| ==enumerable  | 是否可以枚举,默认false                        |
| Value         |                                               |
| Get           | 查找元素时使用的getter()                      |
| Set           | 修改元素时使用的setter()                      |
| Writable      | 为true时，value才可以被运算符修改 默认是false |

**BOM属性对象方法(scroll/client/offset)**

location

Navigator 对象（常用user-agent，携带浏览器信息)

offset

Client 元素可视区

scroll



数据类型转换

1. obj\==obj  false
2. obj\==str 对象转换为字符串
3. obj\==boolean 全转换为数字
4. str\==num 全转换为数字
5. str\==boolean 转换数字



mouseenter vs mouseover

mouseenter不支持事件冒泡？？？



伪数据转换为数组

1. array.from
2. 展开运算符
3. ==array.prototype.slice.call==



遍历对象属性

| for in                       |                                                              |
| ---------------------------- | ------------------------------------------------------------ |
| for of                       | 循环一个可迭代对象的属性，对象或者原型上必须有@iterator部署，否则会报错，如果没有可以通过object.keys转换成可迭代对象 |
| Object.keys                  | 返回一个由原对象中可以枚举属性的名称组成的数组               |
| Object.entries               | 一个由原对象中可枚举键值对组成的数组                         |
| Object.getOwnPropertyNames   | 一个指定对象的所有属性的属性名组成的数组。不包含继承属性 Object.keys() |
| Object.getOwnPropertySymbols | 一个给定对象所有symbol值组成的数组                           |
| Reflect.ownKeys              | 由目标对象自身的属性键组成的数组，有点像object.key           |

Object.is vs \==

==没有===严格，如果类型不同转换为相同类型再比较

object.is和\=\==基本一致，但是有两个区别：+0不等于-0，NaN=自身



isNaN vs Number.isNaN()

isNaN:传入一个值，然后isNaN将其类型转换，如果能转换成数字类型返回false,不能返回true

Number.isNaN():不需要转换类型，严格判断传入值是否为数字类型,不是返回false



0.1+0.2!=0.3

js数据存储64位双精度，0.1和0.2转换成二进制加减时52位尾数导致转换成10进制的时候转换出错，出现3.000000004，通过tofixed/*10相加再➗10解决



use strict 

不允许使用8进制数，不允许删除变量和函数，不允许在if中定义函数，this不再指向window而是undefined



event.stopPropagation() vs stopImmediatePropagation()

event阻止事件冒泡到父节点，stop还阻止钙元素上同事件监听器被触发



load发现在浏览器加载什么时机？

在页面和所有资源完全加载后触发，初始化第三方脚本或库，执行依赖于图片尺寸的布局调整，统计页面加载时间，启动视频播放或动画。



function vs object

function可以调用自身，都是obj实例，obj子类型，继承obj所有属性和方法



长列表渲染

无限滚动、虚拟滚动、分页



axios vs fetch vs ajax

| ajax(Asynchronous JavaScript and XML) | 异步技术，匀速网页不重新加载和服务器交换数据                 |
| ------------------------------------- | ------------------------------------------------------------ |
|                                       | 使用 XMLHttpRequest 对象发送和接收 HTTP 请求和响应           |
|                                       | 概念，不是具体技术                                           |
| Fecth API                             | JS内置用来发送HTTP请求和响应处理的API（较新，在旧浏览器需要polyfill) |
|                                       | return Promise, `.then()` 链式调处理响应                     |
| Axios                                 | 基于Promise的HTTP客户端，在浏览器或nodejs运行                |
|                                       | 包含AJAX高级特性，如拦截请求和响应、转换请求、响应数据       |
|                                       | return promise，`.then()` 和 `.catch()` 处理响应             |



**如何判断元素在可视区域？**

**getBoundingClientRect()** 比较视窗位置信息判断元素是否在可视区域

```js
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&  //documentElement根结点
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

**IntersectionObserver API**  观察元素是否进入/退出可视区域，设置threshold判断元素进入/退出程度

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('Element is in the viewport');
      } else {
        console.log('Element is not in the viewport');
      }
    });
  },
  { threshold: 0.5 } // 当元素至少 50% 可见时触发回调
);

observer.observe(document.querySelector('#myElement'));
```

**scrollTop, clientHeight**

```js
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const elementTop = rect.top + scrollTop;
  const elementBottom = elementTop + el.offsetHeight;

  return (
    elementTop >= scrollTop &&
    elementBottom <= scrollTop + viewportHeight
  );
}
```



| e.target  | 事件来源                                                     |
| --------- | ------------------------------------------------------------ |
| e.current | 当前正在处理时间元素                                         |
|           | 事件委托和时间冒泡/捕获，两属性值不同，开发者根据具体需求选择合适属性 |

|          | CommonJS                                                     | ES Module                                                    |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 语法     | 动态加载. require()` 导入模块，运行时才会被执行，可以条件判断导入，`module.exports` 导出模块 支持导出单个值或对象 | 静态分析. 使用 `import`（编译时被处理，写在顶部） 和 `export` 导出 支持命名导出和默认导出 |
| 环境支持 | 设计用于Nodejs，服务端不需要异步                             | 设计用于浏览器环境 支持异步                                  |
| 引用     | require 值拷贝                                               | import 值引用                                                |
| 循环依赖 | 加载时已加载模块，出现循环依赖 返回加载模块exports对象       | 编译时已经确定依赖关系，出现循环依赖先加载没有被引用模块，再加载引用模块 |

