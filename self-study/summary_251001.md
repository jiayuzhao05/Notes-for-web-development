![Untitled diagram | Mermaid Chart-2025-10-05-191349](/Users/jiayuzhao/Downloads/Untitled diagram | Mermaid Chart-2025-10-05-191349.png)

**此周难点:demo渲染出问题 问题写在demo注释里**


省略了 var 可以定义全局变量，但不推荐使用这种做法，因为正在局部作用域中的全局变量很难维护

const vs var?

js不区分浮点和整数？？？

es6不能用8进制（0o），输出10进制

```javascript
console.log(NaN==NaN); false
console.log(isNaN(NaN)); // 不是数字 所以 true;任何不能被转换为数值的值都会导致这个函数返回 TRUE

document.write(src) ?
```

string 类型 一般使用单引号 如 userName=’string’; 空格也是字符串



转义字符 

\t 制表符 

\b 退格 

\r 回车 

\f 进纸 

\\ 斜杠 

\’ 单引号 

\” 双引号 

\nn 以 16 进制代码表示的一个字符 

\unnnn 以 16 进制代码 nnnn 表示的一个 Unicode



避免 document.write(上世纪 90 年代常用的 API，现在已经过时；把字符串拼进 HTML 流里，容易出 bug)，用创建元素或 insertAdjacentText/innerText/textContent 来更新页面。

在页面加载完成后再调用 document.write，会把整个文档内容清空，重新写入。如果你点击按钮后还用 document.write，页面其他内容会消失，页面重置，看到什么都没有。当浏览器解析到 document.write，会停止继续解析 DOM，直到执行完毕，这会影响性能

换成textContent / innerText(不会解析 HTML，只会插入纯文本)更新文本，或innerHTML（解析 HTML 字符串，能渲染标签）插入html结构

```javascript
document.getElementById('output').textContent = "Hello world"
document.getElementById('output').innerHTML = "<br>Hello</br> World";
element.insertAdjacentText('beforeend', '追加内容');
element.insertAdjacentText('afterbegin', '<span>插入HTML</span>');
//dom api create element
const div = document.createElement('div')
div.textContent = "helloDom"
document.body.appendchild(div)
```



object

```javascript
var o = new Object();
var arr = new Array(1,2,3,4)
console.log(o.toString()); // [object Object]
console.log(arr.valueOf()); // (4) [1, 2, 3, 4]
console.log(arr.toString()); // 1,2,3,4
```



Number() 在转换字符串时比较复杂而且不够合理；并且只能基于十进制进行转换，且不能出现非法的尾随字符

“01235” 1235; // (去掉最前面的 0)

“0xff” 255; // （number()能识别出 16 进制）

“” 0

“123abc” //  NaN

```javascript
//处理整数
//parseInt()能识别 16 进制，识别不了8进制,可以指定第二个参数，把前面的0X/0去掉：转换基数
console.log(parseInt(" 8a:")); // 8;
console.log(parseInt(22.5)); // 22;
console.log(parseInt("wang1")); // NaN;
console.log(parseInt("")); //NaN
console.log(parseInt("0xff",16)); // 255 把 16 进制转换为 10 进制
console.log(parseInt("077",8)); // 63 把 8 进制转换为 10 进制
console.log(parseInt("ff",16)); //去掉0X/0
console.log(parseInt("77",8));

//parseFloat()只能识别十进制，16 进制会始终转换成 0
console.log(parseFloat("123abc")); // 123;
console.log(parseFloat("123.56abc")); // 123.56;
console.log(parseFloat("0xaa")); // 0;
console.log(parseFloat("3.125e6")); //3125000;

// 2，一元“！”运算符也将其操作数转换为布尔值并取反，这是在代码中进行这种类型转换的常用办法；
var str = "w";
console.log(!!str); //相当于 boolean(str)

//typeof() instanceof()
// object 比较特殊，把他看成是空对象
var color = new Array();
console.log(typeof color); // object;
console.log(color instanceof Object); //true;
console.log(color instanceof Array); //true;
// 所有引用类型的值都是 object 的实例,在检测一个引用类型值和 Object 构造函数时，instanceof 操作符始终返回 TRUE;使用 instanceof 操作符在检测基本类型的值，会返回 false，因为基本类型不是对象
```

**所有引用类型的值都是 Object 的实例**？？

数组、函数、正则、日期、Map、Set …… 这些虽然有各自的构造函数，但最终原型链都会追溯到 Object.prototype。它们共享一些通用方法，并且都是 **“对象的一种”**

```javascript
// 5，位操作符：~ <<左移位 >>右移位 >>>无符号右移 &按位与 ^按位异或|按位或
// 6，字符元算符： + ;
//^= |= <<= >>= >>>=;
console.log("1"+2); //12 (加法当中字符串中的数字不会自动类型转换)
console.log(1+{}); //1Oobject
console.log(+"2" + 3); // 5
console.log(true + true); // 2 true 会被转成 1，false 转成 0
console.log(1 + true); // 2
console.log(1 + undefined); // NaN  undefined 在数值上下文中会被转为 NaN

console.log("wang" + 2 + 1); //"wang21" (都是从左右的顺序计算)；
console.log(1 + 2 +"wang"); //"3wang"
console.log("wang" + null); //"wangnull" //String(null)
console.log("wang" + undefined); // "wangweiundefined" //String(undefined)

console.log(8 - true); // 7
console.log(8 - "true"); // NaN （注意“TRUE”引号引起来就是字符串）

console.log(8 - null); // 8
console.log(8 - {}); // NaN
console.log(Number("true")); // NaN

console.log(-0 + 0); // 0
console.log(-0 - 0); // -0

console.log(5 / 0); //Infinity
console.log(-5 / 0); // -Infinity
console.log(0 / 0); //Nan

console.log(6.3 % 2.1); //2.09999999999999996  小数取模会出问题

console.log( NaN == NaN); //false  任何操作数与 NaN 进行比较，结果都是 false
// 8，被认定为 false 的值：undefined，null，NaN，” ”,0,false

var num = 25; // 25 = 11001 -25 = 00110 +00001 = 00111
var num1 = ~num; //反码 00110 所以反码是 00110 = 00111 - 00001 = -25 - 1
console.log(num1); // -26 所以反码是 00110 = 00111 - 00001 = -25 - 1 = -26

var sum = 25 & 3; // 11001
console.log(sum); // 00011 00001 = 1  按位与，有两个操作符，相同位数对齐比较 全 1 出 1，有 0 出 0
var sum = 25 | 15; // 11001
console.log(sum); // 01111 11111 = 31  按位或，有两个操作符，相同位数对齐比较 有 1 出 1，全 0 出 0

var sum = 3 << 3; // 11 左移 3 位就是 11000 = 24
console.log(sum); // 24  c = a<<b 左移；c = a 的二进制数左移 b 位后的结果，c = a * 2^b
```



| Method                    | Description                           | Example                                          |
| ------------------------- | ------------------------------------- | ------------------------------------------------ |
| create                    |                                       |                                                  |
| `Array.isArray(arr)`      | Check if value is an array            | `Array.isArray([1,2]) // true`                   |
| `arr.length`              | Array length (can be modified)        | `arr.length = 0 // clear array`                  |
| add&remove                |                                       |                                                  |
| `push()`                  | Add to end                            | `[1,2].push(3) // [1,2,3]`                       |
| `pop()`                   | Remove from end                       | `[1,2,3].pop() // [1,2]`                         |
| `unshift()`               | Add to start                          | `[2,3].unshift(1) // [1,2,3]`                    |
| `shift()`                 | Remove from start                     | `[1,2,3].shift() // [2,3]`                       |
| `splice()`                | Add/Remove/Replace                    | `[1,2,3].splice(1,1,9) // [1,9,3]`               |
| find elements             |                                       |                                                  |
| `indexOf()`               | First index of element                | `[1,2,3,2].indexOf(2) // 1`                      |
| `lastIndexOf()`           | Last index of element                 | `[1,2,3,2].lastIndexOf(2) // 3`                  |
| `includes()`              | Check existence                       | `[1,2,3].includes(2) // true`                    |
| `find(fn)`                | Find first element matching condition | `[1,2,3].find(x=>x>1) // 2`                      |
| `findIndex(fn)`           | Find index of first matching element  | `[1,2,3].findIndex(x=>x>1) // 1`                 |
| iteration&format          |                                       |                                                  |
| `forEach(fn)`             | Iterate (no return)                   | `[1,2,3].forEach(x=>console.log(x))`             |
| `map(fn)`                 | Transform array                       | `[1,2,3].map(x=>x*2) // [2,4,6]`                 |
| `filter(fn)`              | Filter elements                       | `[1,2,3].filter(x=>x>1) // [2,3]`                |
| `reduce(fn, init)`        | Accumulate values                     | `[1,2,3].reduce((a,b)=>a+b,0) // 6`              |
| `some(fn)`                | At least one matches                  | `[1,2,3].some(x=>x>2) // true`                   |
| `every(fn)`               | All must match                        | `[1,2,3].every(x=>x>0) // true`                  |
| sort&reverse              |                                       |                                                  |
| `sort(fn?)`               | Sort (default lexicographic)          | `[3,1,2].sort() // [1,2,3]`                      |
| `reverse()`               | Reverse array                         | `[1,2,3].reverse() // [3,2,1]`                   |
| join&slice                |                                       |                                                  |
| `concat()`                | Merge arrays                          | `[1,2].concat([3,4]) // [1,2,3,4]`               |
| `slice(start,end)`        | Extract subarray                      | `[1,2,3,4].slice(1,3) // [2,3]`                  |
| `join(sep)`               | Join as string                        | `[1,2,3].join('-') // '1-2-3'`                   |
| `toString()`              | Convert to string                     | `[1,2,3].toString() // '1,2,3'`                  |
| es6+ methods              |                                       |                                                  |
| `from(obj, fn?)`          | Convert array-like to array           | `Array.from('abc') // ['a','b','c']`             |
| `of(...items)`            | Create array from arguments           | `Array.of(1,2,3) // [1,2,3]`                     |
| `fill(value, start, end)` | Fill array with value                 | `[1,2,3].fill(0,1,2) // [1,0,3]`                 |
| `copyWithin()`            | Copy part within array                | `[1,2,3,4].copyWithin(1,2) // [1,3,4,4]`         |
| `flat(depth=1)`           | Flatten nested arrays                 | `[1,[2,[3]]].flat(2) // [1,2,3]`                 |
| `flatMap(fn)`             | Map + Flatten                         | `[1,2].flatMap(x=>[x*2]) // [2,4]`               |
| `keys()`                  | Iterator of keys                      | `[...['a','b'].keys()] // [0,1]`                 |
| `values()`                | Iterator of values                    | `[...['a','b'].values()] // ['a','b']`           |
| `entries()`               | Iterator of key-value pairs           | `[...[ 'a','b'].entries()] // [[0,'a'],[1,'b']]` |



```javascript
 // 这是一个死循环
 var count = 10,i=0;
    for(;;)
      console.log(i);

var count = 10,i=0;
    for(;i<count;){
      console.log(i);
      i++;
      }  
      
// 所以可以把初始化和增量放到外部
```



? 初始变量语句只运行一次，增量表达式在statement以后再执行

```javascript
for(var i=0,j=console.log("A");console.log("B"),i<10;console.log("C"), i++){
      console.log("aini");
    }

// 顺序：
i=0,j=console.log("A")        console.log("B"),i<10       console.log("aini")    console.log("C"), i++       console.log("B"),i<10      console.log("aini")     console.log("C"), i++       
```



```javascript
var str ="hello world";
   for(var a in str){  //这里使用了new String(str) 把原始类型转换为基本包装类型；
    console.log(a);
   }
//For- in并不会遍历所有的属性和方法，只会枚举可枚举的属性和方法，由js核心语言内置的属性和方法就是不可枚举的，比如toString(),valueOf();

// 如果没有return语句，则程序返回的结果就是undefined
// Return默认返回值也是undefined

//With（object）{statement}
```



```js
// 本地对象：独立于宿主环境的由ECMAscript实现提供的对象；如object，Function，Array等；
// 内置对象：由ECMAscript实现提供的，独立于宿主环境的所有对象，如Global和Math（本质上是静态的，就不需要创建对象）；
// 宿主对象：所有非本地对象都是宿主对象，既由scmascript实现的宿主提供的对象，如多有BOM和DOM对象丢失宿主对象；

//真则表达式 var pattern = new RegExp(“w” , “i”)

Number类或对象方法：
tolocaleString() :// 把一个Number对象转换为本地格式的字符串
toFixed() 方法：// 把 Number 四舍五入为指定小数位数的数字，类型是字符串；参数规定了小数的位数，是 0 ~ 20 之间的值；有些实现可以支持更大的数值范围。如果省略了该参数，将用 0 代替
toExponential()方法 // 可把对象的值转换成指数计数法。如:NumberObject.toExponential(num) ，num规定指数计数法中的小数位数，是 0 ~ 20 之间的值；
toPrecision() // 可在对象的值超出指定位数时将其转换为指数计数法；其可能会返回固定大小格式，也可能返回指数格式，具体规则是看哪种格式最合适；如:NumberObject.toPrecision(num) ，num规定必须被转换为指数计数法的最小位数，该参数是 1 ~ 21；

//charAt()  charCodeAt() 都接受一个参数，是基于0的字符位置；其中charAt() 方法以单字符串的形式返回给定位置的那个字符
//concat() 将一或多个字符串拼接起来，返回拼接得到的新字符串
//slice() x位置开始截取，到y结束（不包含y位置）
//substr(x,y) x是截取开始的位置，y是截取长度
//substring(x,y) x位置开始截取，到y结束（不包含y位置） 如果只设置一个参数，则从开始位置截取到末尾 把所有负值参数都转换为0
// indexOf() 和 lastIndexOf()(从后面往前找，两个方法只返回第一个出现的位置)从一个字符串中搜索给定的子字符串，然后返回子字符串的位置，如果没有找到子字符串，则返回-1

trim() // 删除前置及后缀的所有空格，返回结果
trimLeft(),trimRight() // 分别用于删除字符串开头和末尾的空格
match() //与RegExp的exec()方法相同；其只接受一个参数，要么是一个正则表达式，要么是一个RegExp对象;match()返回了一个数组，其第一项是与整个模式匹配的字符串，之后的每一项（如果有）保存着与正则表达式中的捕获组匹配的字符串
replace()// 替换字符串，接受两个参数，第一个参数是一个查找的字符串或者是正则，第二个参数是要替换的字符串或者函数；
// 如果第一个参数是字符串，则只会替换第一个找到的字符串，想替换所有的话第一个参数可以写个正则；想要替换全部就加上g(全局标志)，不然只会替换第一个如果没匹配上替换不了，就会输出原有的值
split() // 基于指定的分隔符将一个字符串分割成多个字符串，并把结果放在一个数组中；分隔符可以是字符串，也可以是正则；其可以接受可选的第二个参数，用于指定数组的大小;第二个参数可以指定长度，也可以是正则表达式
localeCompare()// 用本地特定的顺序来比较两个字符串，默认返回下列值中的一个：-1、0、1
fromcharCode() //接受一或多个字符编码，然后将它们转换成一个字符串；这个方法与实例方法charCodeAt()执行的是相反的操作

//把asccII码转换成对应的字母或数字
anchor(name) // 创建 HTML 锚，输出如：<a name=”name”>string</a>
big() // 用大号字体显示字符串，如：<big>string</big>
small() // 使用小字号来显示字符串，如：<small>string</small>
blink() // 显示闪动字符串；
bold() // 使用粗体显示字符串，如：<b>string></b>
fontcolor(color) // 使用指定的颜色来显示字符串，如：<font color=”color>string</font>
fontsize(size) // 使用指定的尺寸来显示字符串，如：<font size=”size”>string</font>
italics() // 使用斜体显示字符串，如：<i>string</i>
link(url) // 将字符串显示为链接，如：<a href=”url”>string</a>
fixed() // 以打字机文本显示字符串，如：<tt>string></tt>
sup() // 把字符串显示为上标，如：<sup>string</sup>
sub() // 把字符串显示为下标，如：<sub>string</sub>
strike() // 使用删除线来显示字符串，如：<strike>string</strike>


// isNaN(),  isFinite(),  parseInt(),  parseFloat()
// isNaN()用来确定一个值是否为NaN，而Number.isNaN()确定传递的值是否为NaN和其类型是Number；它是原始的全局isNaN的强大的版本

// 根据JavaScript的运行环境，在JS中存在两种全局对象：JS全局对象和window全局对象。当Javascript放在特定宿主环境时，全局对象通常具有与该特定环境相关的额外属性；这些额外属性并不是ES标准规定的，而是由宿主环境实现的；如在客户端Javascript中，全局对象是Window对象，表示运行JS的Web浏览器窗口；或在nodejs中，Global指的就是global对象；

//全局变量声明的4种方法:
// 1.直接在全局作用域中用var声明的变量就是全局变量，此种方式声明的变量具有不可配置的属性，不能使用delete操作符把变量删除。

// 2.window.变量,这种声明的变量也是全局变量，但这种变量跟上面用var声明的变量有点不一样，这种方式声明的全局变量是可配置的，因此能用delete操作符把变量删除。

// 3.隐式声明全局变量，就是不使用var声明，直接进行赋值的变量，在不严格模式中，相当于window.变量这种方式，但在严格模式下，会报错。

// 4.在html中给标签指定一个id属性，也相当于给Window对象添加了一个id的属性，在javascript中可直接通过标签的id访问该标签（或者window['id']）
```



encodeURI() 和 encodeURIComponent() （编码范围广一点）

```js
var str="zero!ne work零-_!~'(*&#?";
console.log(encodeURI(str));
console.log(encodeURIComponent(str));
```

decodeURI() 和 decodeURIComponent()

```js
//decodeURI() 只能对 encodeURI() 编码过的 URI 进行解码
// 注:URI方法代替了已经被ECMA-262第3版废弃的escape和unescape()方法，因为URI方法能对所有Unicode编码,而原来的方法只能对ASCII符号正确编码
```



Window.eval()在函数内优先访问全局变量

```js
"use strict"
var x = 18;
eval("var y=20;console.log(y)");
console.log(y);   // 外部不能访问 非严格外部能访问
```



math

```js
var num=Math.random();
E：// 自然对数的底数，即常数e.约等于2.718；
LN10：// 代表10的自然对数,约等于2.302；
LOG2E：// 代表以2为底E的对数；
PI：// π  3.1415926；
SQRT1_2：// 2的平方根分之一，0.707；

var min =Math.min(87,45,12,59,87);
var arr=[1,25,84,75,95,42,35,68];//数组中不能用 换成apply()
var max=Math.max.apply(Math,arr);

console.log(Math.ceil(-1.5)); // -1 向上取整
console.log(Math.floor(1.1));  // 1  向下取整
console.log(Math.round(-1.5));   //注意中间的
console.log(Math.round(-1.6)); //四舍五入

Math.floor(Math.random()*(max-min+1)+min)


function decodeUnicode(str) {  // 解码
   str = "\\u"+str; //Unicode显示方式是\u4e00
   str = str.replace(/\\/g, "%");
   str = unescape(str);     //转换中文
   str = str.replace(/%/g, "\\");   //将其他受影响的转换回原来
   return str;
}

function getRandomChinese(len){
    var str = "";
    for(var i = 0;i<len;i++){
        str += decodeUnicode(getRandom(0x4e00,0x9fa5).toString(16));
    }
    return str;
}
console.log(getRandomChinese(2));  ？？？

asin(x)：// 反正弦值
exp(num)：// Math.E的num次幂
atan(x)：// 反正切值
acos(x)：// 反余弦值
atan2(y,x)：// y/x的反正切值
pow(num,power)：// num的power次幂
```



 形参 parameter   实参 argument 



回调



数组sort

```js
function sortArr(arr,fun){
    if(!Array.isArray(arr) || !(fun instanceof Function)){
      throw new Error("参数类型不准确");
    }else{
      for(n in arr){
        for(m in arr){
          if(fun(arr[n],arr[m])){
            var tmp=arr[n];
            arr[n]=arr[m];
            arr[m]=tmp;
          }
        }
      }
    }
  }
  function compare(num1,num2){
    return num1>num2;   
    }
  try{
    var arr=[45,12,68,95,115,65,32,25,12,78,35];
    sortArr(arr,compare);
    console.log(arr)
  }catch(e){
    console.log(e);
  }
```



lambda 

```js
var o = {}
o.say=function(x){return x*x;}
console.log(o.say(5));
```



JavaScript数组是无类型的，数组元素可以是任意类型；即使同一个数组内，不同的元素也可以有不同的类型
JS数组的索引是基于零的32位整数，第一个元素的索引为0；

```js
var arr = new Array(18.5);   //抛出异常.如果需要创建只有一个值的数组，并且这个值是数字，只能把该数字使用字符串的形式；当这一个值如果是非整数时，会抛出异常

var arr = Array()  //空数组  省略new操作符
var colors = Array(3)   // 指定长度
var names = Array("wangwei","wujing","jingguo")  //显示指定元素

var count = [1,,3];
console.log(count[1]);  // undefined;

count = [1,2,];  // 2
console.log(count);
count = [,,,];   // 3
console.log(count);?????
  
// 在ES6中引入了类型化数组，JavaScript 引擎已经在为同种数据类型的数组分配连续的存储空间了，如ArrayBuffer，其使用的就是一块连续的内存空间
  
  
var colors=["red","blue"];
colors[3] = "purple";
console.log(colors);
console.log(colors.length);  // 4 跳过某个索引添加值时，跳过的自动变成empty

var arr = [1,2];
arr["2"] = "333";    //把二当做数组的索引，因为字符串2能转换成数字

//Sparse arrays 稀疏数组：ES中的数组是稀疏的，即数组的元素的索引不一定要连续，它们之间可以有空缺,遍历时会跳过这些空隙,空数组就打印undefined；在实现上比稠密的数组更慢、内存利用率更高,在这样的数组中查找元素的时间与常规元素属性的查找时间一样长
var spare =  new Array(3);
var dense= Array.apply(null,spare);//可以产生值为undefined的密集数组，跟稀疏数组有区别

var a1 = [1,,,4];
var a2 = a1.filter(function(x){return true;});//filter()压缩其中的空隙，因为filter会跳过空隙，返回密集的数组**
for(i in a2)
console.log(i);

//unshift()方法将引发所有下标的改动。如果不计较元素插入的位置，则推荐使用push方法，因为，unshift()方法可能会影响依靠下标才能准确进行的计算
// shift()移除数组的第一个元素并将其返回；该方法执行后数组剩下的元素向前移动，下标索引号重新调整从0开始按顺序赋予所有元素；会修改原数据；其与pop方法类似；
```



排序算法：选择排序和冒泡排序

```js
sort() // 升序 如果数组元素中undefined或null，它们会被排列在数组的尾部
//对象排序
var arr = [o,
    {valueOf:function(){return 15}},
    {valueOf:function(){return 18}},
    {valueOf:function(){return 4}}
];
arr.sort(function(o1,o2){return o1 - o2});
console.log(arr);
for(var i in arr)
    console.log(arr[i].valueOf());

slice() //如果两个参数，该方法返回起始和结束位置之间的项，但不包括结束位置的项;不会影响原有数组；只能从左往右截，像colors.slice(3,1)  就会返回空数组

splice()（改变原数组）//从一个数组中移除一个或多个元素；剩下的元素组成一个数组，移除的元素组成另一个新数组并返回.splice会改变源数组，但是splice本身只返回删除的项
start：// 必选项，表示从数组中剪切的起始位置下标索引号。
deleteCount：// 必选项，表示将从数组中切取的元素的个数。
item：可选项，// 表示切取时插入原数组切入点开始处的一个或多个元素

//判定数组元素是否满足某个条件
// every()，传入的函数必须对每一项都返回true，这个方法才返回true；some()是只要传入的函数对数组中的某一项返回true，就会返回true，否则返回false
var numbers = [1,2,3,4,5,4,3,2,1];
const everyresult = numbers.every(function(item, index, array){return (item>2)})
var someResult = numbers.some(function(item,index,array){return (item > 2)})
```



九九乘法表

```js
var table = new Array(9);
for(var i=0;i<table.length;i++) table[i]=new Array(9);
for(var row=0;row<table.length;row++){
  for(var col=0;col<table[row].length;col++){
    table[row][col]=row*col;
  }
}
console.log(table[5][9]);

function getTable(arr){
  var table = document.createElement("table");
  for(var i=1; i<arr.length;i++){
    var tr = document.createElement("tr");
    for(var j=1;j<arr[i].length;j++){
      var td = document.createElement("td");
      td.innerText=i+"*"+j+"="+arr[i][j];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);
}
getTable(table);
```



```js
d = new Data()  // 以当前日期和时间创建date对象；
d = new Date(0) // 以1970-1-1 00:00:00 的毫秒数创建date对象；
d = new Date(2020,7,18) // 创建了一个2020年8月18号的日期对象；
var time = Date.parse('2019-04-03'); // +8区时间
var time1 = Date.parse('2019-4-03'); // 标准UTC时间 月份前面有0和没有0是不一样的（中间连接符是‘-’的时候才会有区别）其他都是GTM时间
date.UTC(year,month,[date,hrs,min,sec,ms])  //（参数不用引号，而且需要逗号隔开）月份是基于0的
```



两个日期相差的天数

```js
function daysDiff(dateOne,dateTwo){
    var oneMonth = dateOne.substring(5, dateOne.lastIndexOf('-'));
    var oneDay = dateOne.substring(dateOne.length,dateOne.lastIndexOf('-') + 1);
    var oneYear = dateOne.substring(0, dateOne.indexOf('-'));
    var twoMonth = dateTwo.substring(5, dateTwo.lastIndexOf('-'));
    var twoDay = dateTwo.substring(dateTwo.length, dateTwo.lastIndexOf('-') + 1);
    var twoYear = dateTwo.substring(0, dateTwo.indexOf('-'));
    var diff = ((Date.parse(oneMonth+'/'+oneDay+'/'+oneYear) - Date.parse(twoMonth+'/'+twoDay+'/'+twoYear)) / 86400000);
    return diff;
}
console.log(daysDiff('2020-6-6','2020-5-30'));
```

日历

```js
function getDays(y,m){
    var d = new Date(y,m);
    d.setMonth(m+1);
    d.setDate(0);
    return d.getDate();
}
function changeDay(target,d){
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    var week = d.getDay();
    var days = getDays(year,month); //一个月内有多少天

    
    var current = new Date();
    currentyear = current.getFullYear();
    currentmonth = current.getMonth();
    currentday = current.getDate();
    currentweek = current.getDay();
    var daylist = document.getElementById('daylist');
    for(var i=daylist.children.length-1;i>=0;i--){
        daylist.removeChild(daylist.childNodes[0]);
    }
    var d1 = d
    d1.setDate(1);
    var firstweek = d1.getDay(); //获取当月1号对应星期几
    for(var i=0;i<firstweek%7;i++){
        var li = document.createElement('li');
        daylist.appendChild(li)
    }
    
    for(var i=1;i<=days;i++){
        var li = document.createElement('li');
        li.innerHTML = i;
        if((i<currentday && month == currentmonth && year == currentyear) || (month<currentmonth && year==currentyear) || (year < currentyear)){
            li.className = "lightgray";
        }else if(i== currentday && month == currentmonth && year == currentyear){
            li.className = 'currentbox'
        }else{
            li.className = 'darkgray'
        }
                daylist.appendChild(li)
    }
    document.getElementById(target+'-month').innerHTML = month + 1 + '月';
    document.getElementById(target+'-year').innerHTML = year;
}
var d = new Date();
changeDay('calender',d)
var prev = document.getElementById('prev');
var next = document.getElementById('next');
prev.addEventListener('click',function(){
    d.setMonth(d.getMonth()-1);
    changeDay('calender',d)
},false);
next.addEventListener('click',function(){
    d.setMonth(d.getMonth()+1);
    changeDay('calender',d)
},false);
```



```js
//返回特定的日期
console.log(Date.today());
console.log(Date.today().toString('yyyy-MM-d HH:m:s'))
console.log(Date.today().next().friday().toString('yyyy-MM-d HH:m:s'))
console.log(Date.today().last().friday().toString('yyyy-MM-d HH:m:s'))
console.log(Date.last().week().toString('yyyy-MM-d HH:m:s'))

//判断
console.log(Date.today().is().saturday());
// 返回加一天或减一天后的日期 可以是负数
console.log(Date.today().add(1).day());
```



日期比较

```js
Date.today().equals( Date.parse("today"));  // true
Date.parse("last Tues").equals(Date.today());   // true|false
 
Date.equals(Date.today(), Date.parse("today")); // true|false
Date.compare(Date.today(), Date.parse("today"));    // 1 = greater, -1 = less than, 
 
Date.today().compareTo(Date.parse("yesterday"));    // 1 = greater, -1 = less than, 0 = equal
Date.today().between(startDate, endDate);   // true|false
```



```js
/将日期设置为当前月份和年份的15号；
//其他对象值包括year|month|day|hour|minute|second
Date.today().set({ day: 15 });
Date.today().set({ year: 2007, month: 1, day: 20 })

//regexp(要匹配的字符串模式，可选的修饰符字符串)
var pattern1 = new RegExp("[bc]at","i")
var re = new RegExp(".at","g");
newre = RegExp(re); // true
newre = RegExp(re,"i"); // false （模式改变了就不是同一个正则了）
console.log(re === newre);
```



预定义字符

```js
. // 等同于[^\n\r]， 除了换行符和回车之外的任意字符
\d // 等同于[0-9]， 数字（ASCII 数字）
\D // 等同于[^0-9]， 非数字字符（除了 ASCII 数字之外的任何字符）
\s // 等同于[ \t\n\0B\f\r]， 空白字符（任何 Unicode 空白符）
\S // 等同于[^ \t\n\0B\f\r]， 非空白字符（任何非 Unicode 空白符的字符），注：和\w 不同
\w // 等同于[a-zA-Z0-9_]， 单词字符(即 ASCII 字符，包括所有字母，所有数字和下划线)  \W 等同于[^a-zA-Z0-9_]，非单词字符（任何不是 ASCII 字符）
[\b] ，// 退格直接量（特例）

简单范围：// 形如：/[acf]at/g
排除范围：// 使用^(脱字符号)，用来定义否定字符类，必须出现在[ 之后，匹配所有不包含在方括号内的字符，形如：/[^acf]at/ 
连续范围：// 使用 – 连字符表示一个连续范围，如：[a-z], [0-9] ,[^1-4] 
组合范围：// 形如：[a-m1-4\n]
 
var str = "a bat, a Cat, a fAt baT, a faT, a faT cat";
var re = /[bcf]at/gi; //["bat", "Cat", "fAt", "baT", "faT", "faT", "cat"]
var re = /[\u0062cf]at/gi; //["bat", "Cat", "fAt", "baT", "faT", "faT", "cat"]
var re = /[^bc]at/gi; //["fAt", "faT", "faT"]
console.log(str.match(re));
var str = "num1, num2, num3, num4, num5, num6, num7, num8, num9";
var re = /num[1-4]/gi;
console.log(str.match(re)); // ["num1", "num2", "num3", "num4"]
var str = "567 9838 abc";
var re = /[0-9][0-9][0-9]/gi; // ["567", "983"]
var re = /[0-9]{3}/gi; // ["567", "983"]
console.log(str.match(re));

// 匹配连续相同的三个数字
console.log("111a222b333c123d".match(/(\d)\1\1/ig));// ["111", "222", "333"]
console.log("111a222b333c123d".match(/(\d)\1{2}/ig));//["111", "222", "333"]

// 非捕获性分组：在左括号的后面加一个问号和一个紧跟的冒号，如：(?: )；此时，使用\n 就访问不了捕获组
var str = "zeronetwork";
var re = /(?:net)/;

var str1 = "bedroom Bedding";
var re = /([bB]ed(?=room))/; // bed
var re = /([bB]ed(?!room))/; // Bed

var str = "Javascript: function is simple javascript.";
var re = /[jJ]avascript(?=:)/g; // Javascript 后面有冒号才匹配
var re = /[jJ]avascript(?!:)/g; // javascript 后面没有冒号才匹配

var str = "JavaScript Javascript JavaBeans javascripter";
var re = /[jJ]ava(?=[sS]cript)/g; // ["Java", "Java", "java"]
var re = /[jJ]ava(?![sS]cript)/g; // Java
var re = /[jJ]ava(?![sS]cript)\w+/g; // JavaBeans

var pattern = new RegExp("\\[bc\\]]at","gi");
alert(pattern.valueOf()); // /\[bc\]]at/gi  instanceof return RegExp**

var str = "aabb";
var reg = /(\w)\1(\w)\2/g;
console.log(str.replace(reg,function($,$1,$2){
//return $ + "," + $1 + "," + $2; aabb a b
return "提取了两个字母："+$1+"和"+$2;
}));

//预编译：JS会先扫描一下整体语法语句，如果存在逻辑错误或者语法错误，直接报错，程序停止执行，没有错误，从上到下解释一行执行一行
执行器上下文，// Activation Object,AO,活动对象；
全局对象，// Global Object,GO;
// 函数执行前预编译，产生AO;
// 全局变量在执行前也会预编译，产生GO;

// 局部预编译的步骤：
    创建AO;
    找形参和变量声明，将变量和形参名作为AO属性名，值为undefined
    实参值和形参统一；
    在函数体里面找函数声明，值赋予函数体；
// 由于全局中没有参数概念，省去了实参形参统一；
// GO对象是全局预编译，优先于AO对象所创建和执行
    
// JS不是全文编译完成再执行，是块编译，一个script块中预编译然后执行，再按顺序预编译下一个script块再执行，但是此时上一个script块中的数据都是可用的了，而下一个块中的函数和变量则是不可用的
    
//执行环境(execution context):执行上下文.全局执行环境是最外围的一个执行环境,window对象.执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁
//scope chain
    
    
(function(){
    console.log("这里是立即执行函数");
})();

+function myFun(){ //立即执行函数不允许使用函数声明方式，但是如果在function前加一个+号即可，同时在控制台中，该函数名也会被忽略;在function前加上+、!、一、～等一元操作符，也是立即执行函数的写法，等同上面的立即执行函数，如果没有这些符号，解析器会把function认为为一个函数声明
    console.log("这里是立即执行函数");
}(); 
//也可以加上其他的表达式语句
true && function myFun(){
    console.log("这里是立即执行函数");
}();
0,function(){
    console.log("ok");
}();

//闭包保存变量i,将setTimeout放入立即执行函数中，将for循环中的循环值i作为参数传递；500毫秒后，打印1-5
for(var i=0;i<5;i++){ 
    setTimeout(function(){
        console.log(i + " ");
    },500);
}  // 5个5

//闭包只能取得包含函数中任何变量的最后一个值，所以多次调用，只能取相同的一个值
function createFun(){
    var result = new Array();
    for(var i = 0; i<10; i++){
        result[i] = function(){
            return i;
        }
    }
    return result;
}
var arr = createFun();
for(var i=0;i<arr.length;i++){
    console.log(arr[i]());
}

//若干个DOM对象绑定事件，输出不同内容
window.onload = function(){
    var ul = document.getElementsByTagName('ul')[0];
    var lis = ul.getElementsByTagName('li');
    for(var i=0; i<lis.length; i++){
        lis[i].addEventListener('click',function(e){
            // console.log(this.innerText);  // 不同
            console.log(i);  // 全是 4
        },false);
    }
}
// 改成：
window.onload = function(){
    var ul = document.getElementsByTagName('ul')[0];
    var lis = ul.getElementsByTagName('li');
    for(var i=0; i<lis.length; i++){
        (function(j){
            lis[j].addEventListener('click',function(e){
                console.log(j);  // 达到预期，值不同
            },false)
        })(i);
    }
}

//arguments存在着同样的问题；如果想访问作用域中的arguments对象，必须将对该对象的引用保存到另一个闭包能够访问的变量中；有几种特殊情况下，this的值可能会意外的改变?
var name = "The Window";
var object = {
    name:"My Object",
    getName:function(){
        return this.name;
    }
};
alert(object.getName());  // My Object
alert((object.getName)());  // My Object
alert((object.getName=object.getName)());  // The Window


//内存泄漏：闭包会携带包含它的函数的作用域，即会使函数内变量被保存在内存中，所以内存消耗很大；因此在退出函数前，将不用的变量删除
//回调: 为响应事件而执行的函数，绝大部分都是闭包
```



函数，作用域，垃圾回收

```js
//Javascript中没有私有成员的概念；所有对象属性都是公有
//privileged method:有权访问私有变量和私有函数的公有方法

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
console.log(person.getAge());

//这个模式与在构造函数中定义特权方法的主要区别，就是在于构造函数中的私有变量和函数是由实例共享的；而特权方法是在原型上定义的，因此所有实例都使用同一个函数；而这个特权方法，作为一个闭包，总是保存着对包含作用域的引用??
(function(){
    var site,domain;
    MyObject = function(s,d){
        site = s;
        domain = d;
    };
    MyObject.prototype.getSite = function(){
        return site;
    };
    MyObject.prototype.setSite = function(value){
        site = value;
    };
    // 再添加getDomain及setDomain方法
})();
var website = new MyObject("零点网络","www.zeronetwork.cn");
console.log(website.getSite());
website.setSite("zeronetwork");
console.log(website.getSite());
var p = new MyObject("王唯个人网站","www.lingdian.com");
console.log(website.getSite());
console.log(p.getSite());
```



```js
var show = new Function();
console.log(show.name);  // anonymous
var show = function(){console.log("func")};
console.log(show.name);  // show

//caller:该属性保存着调用当前函数的函数的引用；如果是在全局作用域中调用当前函数，它的值为null
function outer(){inner()}
function inner(){console.log(inner.caller)}
outer()

// 当在严格模式下运行时，arguments.callee会导致错误
// 严格模式下限制：不能为函数的caller属性赋值，导致错误
function inner(){console.log(arguments.callee.caller)}

//prototype属性是不可枚举的，因此使用for-in无法发现
// 严格模式下，未指定环境对象而调用函数，this不会指向window??
//call()或apply()来扩充作用域的最大好处，对象不需要与方法有任何耦合关系
//fun.bind(this,arg1,arg2,...)  函数绑定至某个对象

//柯里化（currying）为bind()方法传入参数，该参数也会绑定至this
var o = {a:1}
var fun = sum.bind(o,1)
var myFun = new fun(8,9,10); 
console.log(myFun)
console.log(myFun.getNum())  // NAN???

//higher-order function fx操作fx
var powFun = function(x){return math.pow(x,2)}
function add(f,x,y){return f(x)+f(y)}
console.log(add(powFun,3,4)) //9+16

//recursion效率低,不如iteration 或可以保留记录住的结果
//垃圾回收：内存生命周期几乎一样：分配内存空间-使用内存空间-释放空间
//method1:标记清除（mark-and-sweep）；当变量进入环境时，就将这个变量标记为“进入环境”
//method2:引用计数（reference counting）:跟踪记录每个值被用的次数；当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1，如果同一个值又被赋给另一个变量，则该值的引用次数加1;如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减1；当这个值的引用次数变成0时，则说明没有办法再访问这个值了；因而就可以将其占用的内存空间回收回来.当垃圾收集器下次再运行时，它就会释放那些引用次数为零的值所占用的空间了

//IE中某些对象还在采用引用计数方式，这些对象不是原生的Javascript对象，如BOM和DOM中的对象就是使用C++以COM对象的形式实现的，而COM对象的垃圾收集机制采用的就是计数策略.即使IE的JavaScript引擎是使用标记清除策略来实现的，但Javascript访问的COM对象依然是基于引用计数策略的；只要在IE中涉及COM对象，就会存在循环引用的问题
var element = document.getElementById("some_element")
var myObject = new Object()
myObject.element = element
element.someObject = myObject

//优化内存占用的最佳方式，为执行中的代码只保存必要的数据；数据不再有用，将其值设置为null来释放其引用，解除引用（dereferencing）
function createPerson(name){
        var localPerson = new Object()
        localPerson.name = name
        return localPerson
    }
    var globalPerson = createPerson("wangwei")
    globalPerson = null  // 手工解除globalPerson的引用
// 解除一个值的引用并不意味着自动回收该值所占用的内存；解除引用的值作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收
```



内存泄漏

```js
//循环引用：A引用B，B引用A，如此，其引用计数都不为0，所以不会被回收 => 手工将它们设为null
//闭包会造成对象引用的生命周期脱离当前函数的作用域
// setInterval / setTimeout中this指向window对象，所以内部定义变量挂载在全局，if引用了someResource变，如果没有清除setInterval/setTimeout，someResource得不到释放
ar someResource = getData()
    setInterval(function(){
        var node = document.getElementById('node')
        if(node){node.innerHTML = JSON.stringify(someResource)}
    },1000)

//未清除DOM的引用
var refA = document.getElementById('refA')
document.body.removeChild(refA)
// refA不能回收，因此存在变量refA对它的引用，虽然移除了refA节点，但依然无法回收 solution：
refA = null

//DOM对象添加的属性是一个对象的引用
var myObj = {}
document.getElementById('myDiv').mypro = myObj
document.getElementById("mydiv").innerPro = null

//给DOM对象绑定事件
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    // 虽然最后把btn.DOM移除，但是绑定的事件没有被移除，也会引起内存泄露，需要清除事件
    // btn.onclick = null;
    document.getElementById("mydiv").innerHTML = "zeronetwork";
}
// 其他
document.body.removeChild(btn);
btn = null
```



对象和构造函数

```js
早绑定：
// 指在实例化对象之前定义它的属性和方法，这样编译器或解释程序就能够提前转换机器代码。ES不是强类型语言，所以不支持早绑定；

晚绑定：
// 编译器或解释程序在运行前，不知道对象的类型。使用晚绑定，无需检查对象的类型，只需检查对象是否支持属性和方法即可；ES中的所有变量都采用晚绑定方法；这样就允许执行大量的对象操作
```



| **特性**                | var                                                         | const                                                   |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| **变量提升 (Hoisting)** | 会被提升到作用域顶端，初始化为 undefined                    | 也会提升，但进入 **暂时性死区 (TDZ)**，必须先声明再使用 |
| **作用域 (Scope)**      | **函数作用域**（function-scoped），在函数外声明就是全局变量 | **块级作用域**（block-scoped），只在 {} 内有效          |
| **是否可重新赋值**      | 反复赋值                                                    | 不能重新赋值（必须初始化），但对象/数组内部内容可修改   |
| **是否必须初始化**      | 不需要，可以只声明                                          | 必须在声明时赋值                                        |
| **全局对象属性**        | 在全局作用域中声明的 var 会成为 window 的属性（浏览器环境） | 不会挂载到 window 上                                    |



工厂模式

```js
function Person(name,age){}
console.log(Person.prototype)
var p = new Person("wangwei",18)
console.log(p.__proto__)
console.log(Person.prototype === p.__proto__)

// 稳妥对象：没有公共属性，方法也不引用this的对象
function Person(name,age,jog){
    var o = new Object() // 创建要返回的对象
    // 可以在这里定义私有变量和函数
    o.sayName = function(){
        alert(name)
    }
    return o
}
var p = Person("wangwei",18,"Engineer")
p.sayName()
```



in

```js
var o = {x:1}
o.toString != undefined // true,o继承了toString
```

```js
// 把p中的可枚举属性复制到o中，并返回o，如果o和p中含有同名属性，则覆盖
function extend(o,p){
    for(prop in p)
        o[prop] = p[prop]
    return o
}
 
// 如果o和p中有同名属性，则o中的属性不受影响
function merge(o,p){
    for(prop in p){
        if(o.hasOwnProperty[prop]) continue
        o[prop] = p[prop]
    }
    return o
}
 
// 如果o和p中没有同名属性，则从o中删除这个属性
function restrict(o,p){
    for(prop in o){
        if(!(prop in p)) delete o[prop]
    }
    return o
}
// 如果o和p中有同名属性，则从o中删除这个属性
function substract(o,p){
    for(prop in p){
        delete o[prop] // 删除一个不存在的属性也不会报错
    }
    return o
}
// 返回一个新对象，这个对象同时拥有o和p的属性，如果o和p有重名属性，则用p的属性
function union(o,p){
    return extend(extend({},o), p)
}
// 返回一个新对象，这个对象同时拥有o和p的属性，交集，但p中属性的值被忽略
function intersection(o,p){
    return restrict(extend({},o), p)
}
// 返回一个数组，这个数组包含的是o中可枚举的自有属性的名字
function keys(o){
    if(typeof o !== "object") throw TypeError  // o必须为对象
    var result = [];
    for(var prop in o){  // 所有可枚举的属性
        if(o.hasOwnProperty(prop))  // 判断是否是自有属性
            result.push(prop);
    }
    return result;
}
```



封装

```js
function extend(o,p){
    for(prop in p)
        o[prop] = p[prop];
    return o;
}
// 封装一个用以定义简单类的函数
function defineClass(constructor, // 用以设置实例的属性的函数 
                        methods,  // 实例的方法，复制到原型中
                        statics){ // 类属性，复制到构造函数中
    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, statics);
    return constructor;
}
// Range类的一个实现
var SimpleRange = defineClass(function(f,t){ this.f = f; this.t = t;},
                {
                    includes: function(x) {return this.f <= x && x<=this.t;},
                    toString: function(){ return this.f + "..." + this.t;}
                },
                {upto: function(t){ return new SimpleRange(0, t);}})


//封装复数类:ES模拟Java式类成员
// Complex.js:表示复数的类
// 复数是实数和虚数的和，并且虚数i是-1的平方根
// 构造函数内的r和i,分别保存复数的实部和虚部，它们是对象的状态
function Complex(real, imaginary){
    if(isNaN(real) || isNaN(imaginary)) throw new TypeError();
    this.r = real;
    this.i = imaginary;
}
// 当前复数对象加上另外一个复数，并返回一个新的计算和值后的复数对象
Complex.prototype.add = function(that){
    return new Complex(this.r + that.r, this.i + that.i);
};
// 当前复数乘以另外一个复数，并返回一个新的计算乘积之后的复数对象
Complex.prototype.mul = function(that){
    return new Complex(this.r*that.r - this.i*that.i, this.r*that.i + this.i*that.r);
}; 
// 计算复数的模，复数的模定义为原点（0,0）到复平面的距离
Complex.prototype.mag = function(){
    return Math.sqrt(this.r*this.r + this.i * this.i);
}
// 复数的求负运算
Complex.prototype.neg = function(){
    return new Complex(-this.r, -this.i);
};
// 将复数对象转换为一个字符串
Complex.prototype.toString = function(){
    return "{" + this.r + "," + this.i + "}";
};
// 检测当前复数对象是否和另外一个复数值相等
Complex.prototype.equals = function(that){
    return that != null &&
            that.constructor === Complex &&
            this.r === that.r && this.i === that.i;
};
 
// 定义静态类属性和方法，直接定义为构造函数的属性
// 它们只对其参数进行操作
// 先定义一些常量，以用在对复数运算中，当然也可把它们设为只读的
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1,0);
Complex.I = new Complex(0,1);
// 这个类方法将实例对象的toString方法返回的字符串解析为一个Complex对象
Complex.parse = function(s){
    try{
        var m = Complex._format.exec(s);
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    }catch(x){
        throw new TypeError("Can't parse '" + s + "' as a complex number.");
    }
}
// 定义私有属性，下划线表明它是类内部使用的，不属于类的公有API部分
Complex._format = /^\{([^,]+),([^}]+)\}$/;
// 应用
var c = new Complex(2,3);
var d = new Complex(c.i,c.r);
console.log(c.add(d).toString()); // {5,5}
var result = Complex.parse(c.toString()).// 将c转换为字符串，再转换为Complex对象
    add(c.neg()).  // 加上它的负数
    equals(Complex.ZERO);  // 结果应当永远是零
console.log(result); // true
```



lazy loading 先定义 首次调用才创建对象

```js
var singleton = function() {
    var unique;
    return {
        getinstance : function(){
            if(!unique){
                unique = new constructor()
                return unique;
            }
        }
    }
    function constructor(){
        var private_member = 10
        function private_method(){
            console.log(private_member)
        }
        return {    //这里才是真正的单例
            public_member : "",
            public_method : function(){
                private_member++
                private_method()
            }
        }
    }
}()
singleton.getinstance().public_method()
```



```js
// 声明全局变量Set，使用一个函数的返回值给它赋值
// 需要立即执行，它的返回值将赋值给Set；
var Set = (function invocation(){
    function Set(){ // 这个构造函数是局部变量
        this.values = {}; 
        this.n = 0;
        this.add.apply(this, arguments);
    }
    // 给Set.prototype定义实例方法
    Set.prototype.contains = function(value){
        // 调用了v2s()，而不是调用带有前缀的set._v2s()
        return this.values.hasOwnProperty(v2s(value));
    };
    Set.prototype.size = function(){return this.n;};
    Set.prototype.add = function(){/** */ };
    Set.prototype.remove = function(){/** */};
    Set.prototype.foreach = function(f,c){/** */};
    // 以下是上面的方法用到的一些辅助函数和变量
    // 它们不属于模块的共有的API，但它们都隐藏在这个函数作用域内
    // 因此不必将它们定义为Set的属性或使用下划线作为其前缀
    function v2s(val){/** */};
    function objectId(o){/** */};
    var nextId = 1;
    // 这个模块的共有API是Set()构造函数
    // 需要把这个函数从私有空间中导出来，以便在外部使用它
    return Set;
}());
```



寄生组合继承

```js
function inheritPrototype(subType, superType){
    var prototype = Object.create(superType.prototype);  // 创建对象
    prototype.constructor = subType;  // 指定构造函数为subType
    subType.prototype = prototype;  // 指定subType原型为prototype
}
function SubType(name,age){
    SuperType.call(this,name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);  // 替换了原来的两行
SubType.prototype.sayAge = function(){
    console.log(this.age);
}
```



notnullset

```js
// NonNullSet类是Set的子类，它的成员不能是null或undefined
function NonNullSet(){
    // 仅链接到父类
    // 作为普通函数调用父类的构造函数来初始化通过该构造函数调用创建的对象
    Set.apply(this, arguments);
}
// 将NonNullSet设置为Set的子类
NonNullSet.prototype = Object.create(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;
// 为了将null和undefined排除在外，只须重写add()方法
NonNullSet.prototype.add = function(){
    // 检查参数是不是null或undefined
    for(var i=0; i<arguments.length; i++){
        if(arguments[i] == null)
            throw new Error("Can't add null or undefined to a NonNullSet");
    }
    // 调用父类的add()方法以执行实际插入操作
    return Set.prototype.add.apply(this.arguments);
}


// 类工厂和方法链
// 这个函数返回具体Set类的子类
// 关重写该类的add()方法用以对添加的元素做特殊处理
function filterSetSubClass(superclass, filter){
    // 子类构造函数
    var constructor = function(){
        superclass.apply(this, arguments); // 调用父类构造函数
    };
    var proto = constructor.prototype = Object.create(superclass.prototype);
    proto.constructor = constructor;
    proto.add = function(){
        // 在添加任何成员之前首先使用过滤器将所有参数进行过滤
        for(var i=0; i<arguments.length; i++){
            var v = arguments[i];
            if(!filter(v)) throw("value " + v + " rejected by filter");
        }
        // 调用父类的add()方法
        superclass.prototype.add.apply(this, arguments);
    };
    return constructor;
}
// 定义一个只能保存字符串的集合类
var StringSet = filterSetSubClass(Set, function(x){return typeof x === "string";})
// 定义一个成员不能是null或undefined或函数
var MySet = filterSetSubClass(Set, function(x){return typeof x !== "function";})


var NonNullSet = (function(){
    var superclass = Set;  // 指定父类
    return superclass.extends(
        function(){superclass.apply(this, arguments)}, // 构造函数
        {
            add: function(){
                for(var i=0; i<arguments.length; i++){
                    if(arguments[i] == null)
                        throw new Error("Can't add null or undefined");
                }
                // 调用父类的add()方法以执行实际插入操作
                return superclass.prototype.add.apply(this,arguments);
            }
        })
}())


// 实现一个FilterSet，它包装某个指定的“集合”对象
// 并对传入add()方法的值应用了某种指定的过滤器
// "范围"类中其他所有的核心方法延续到包装后的实例中
var FilterSet = Set.extend(
    // 构造函数
    function FilterSet(set, filter){
        this.set = set;
        this.filter = filter;
    },
    {  // 实例方法
        add: function(){
            // 如果已有过滤器，直接使用它
            if(this.filter){
                for(var i=0; i<arguments.length; i++){
                    var v = arguments[i];
                    if(!this.filter(v))
                        throw new Error("FilterSet: value " + v + " rejected by filter");
                }
            }
            // 调用set中的add
            this.set.add.apply(this.set, arguments);
            return this;
        },
        // 剩下的方法保持不变
        remove: function(){
            this.set.remove.apply(this.set, arguments);
        },
        contains: function(v){return this.set.contains(v);},
        size: function(){return this.set.size()},
        foreach: function(f,c){this.set.foreach(f,c);}
    });
```

抽象类不能实例化对象，所以抽象类必须被继承，才能被使用

```
// 此函数可以做任何抽象方法
function abstractmethod(){throw new Error("abstract method;");}
// 定义了AbstractSet类，并定义抽象方法contains()
function AbstractSet(){throw new Error("Can't instantiate abstract classes");}
AbstractSet.prototype.contains = abstractmethod;
// NotSet是AbstractSet的一个非抽象子类
// 所有不在其他集合中的成员都在这个集合中
// 因为它是在其他集合中是不可写的条件下定义的
// 同时由于它的成员是无限个，因此它是不可枚举的
// 只能用它来检测元素成员的归属情况
// 使用了Function.prototype.extends()方法定义的
var NotSet = AbstractSet.extend(
    function NotSet(set) {this.set = set;},
    {
        contains: function(x) {return !this.set.contains(x);},
        toString: function(x){return "~" + this.set.toString();},
        equals: function(that){return that instanceof NotSet && this.set.equals(that.set);}
    }
);
// AbstractEnumerableSet是AbstractSet的一个抽象子类
// 它定义了抽象方法size()和foreach()
// 然后实现了非抽象方法isEmpty()、toArray()、to[Locale]String()和equals()
// 子类实现了contains()、size()和foreach，这三个方可以很轻易的调用这5个非抽象方法
var AbstractEnumerableSet = AbstractSet.extend(
    function(){throw new Error("Can't instatiate abstract classes");},
    {
        size: abstractmethod,
        foreach: abstractmethod,
        isEmpty: function(){return this.size() == 0;},
        toString: function(){
            var s = "{", i=0;
            this.foreach(function(v){
                if(i++>0) s += ", ";
                s += v;
            });
            return s + "}";
        },
        toLocalString: function(){
            var s = "{", i=0;
            this.foreach(function(v){
                if(i++>0) s += ", ";
                if(v == null) s += v; // null和undefined
                else s += v.toLocalString(); // 其他的情况
            });
            return s + "}";
        },
        toArray: function(){
            var a = [];
            this.foreach(function(v){ a.push(v);});
            return a;
        },
        equals: function(that){
            if(!(that instanceof AbstractEnumerableSet)) return false;
            // 如果它们的大小不同，则它们不相等
            if(this.size() != that.size()) return false;
            // 检查每一个元素是否也在that中
            try{
                this.foreach(function(v){if(!that.contains(v)) throw false;});
                return true; // 所有的元素都匹配：集合相等
            }catch(x){
                if(x === false) return false; // 集合不相等
                throw x; // 发生了其他的异常：重新抛出异常
            }
        }
    });
// SingletonSet是AbstractEnumerableSet的非抽象子类
// SingletonSet集合是只读的，它只包含一个成员
var SingletonSet = AbstractEnumerableSet.extend(
    function SingletonSet(member){this.member = member;},
    {
        contains: function(x){return x === this.member;},
        size: function(){return 1;},
        foreach: function(f,ctx){f.call(ctx, this.member);}
    }
);
// AbstractWritableSet是AbstractEnumerableSet的抽象子类
// 它定义了抽象方法add()和remove()
// 然后实现了非抽象方法union()、intersection()和difference()
var AbstractWritableSet = AbstractEnumerableSet.extend(
    function(){throw new Error("Can't instatiate abstract classes");},
    {
        add: abstractmethod,
        remove: abstractmethod,
        union: function(that){
            var self = this;
            that.foreach(function(v){self.add(v);});
            return this;
        },
        intersection: function(that){
            var self = this;
            this.foreach(function(v){if(!that.contains(v)) self.remove(v);});
            return this;
        },
        difference: function(that){
            var self = this;
            that.foreach(function(v){self.remove(v);});
            return this;
        }
    });
// ArraySet是AbstractWritableSet的非抽象子类
// 它以数组的形式表示集合中的元素
// 对于它的contains()方法使用了数组的线性查找
// 因为contains()方法的算法复杂度是0(n)而不是0(1)
// 它非常适用于相对小型的集合
var ArraySet = AbstractWritableSet.extend(
    function ArraySet(){
        this.values = [];
        this.add.apply(this, arguments);
    },
    {
        contains:function(v){return this.values.indexOf(v) != -1;},
        size: function(){return this.values.length;},
        foreach: function(f,c){this.values.forEach(f,c);},
        add: function(){
            for(var i=0;i<arguments.length; i++){
                var arg = arguments[i];
                if(!this.contains(arg)) this.values.push(arg);
            }
            return this;
        },
        remove: function(){
            for(var i=0;i<arguments.length; i++){
                var p = this.values.indexOf(arguments[i]);
                if(p == -1) continue;
                this.values.splice(p,1);
            }
            return this;
        }
});
 
function StringSet(){
    this.set = Object.create(null); // 创建一个不包含原型的对象
    this.n = 0;
    this.add.apply(this, arguments);
}
// 在此指定了属性的特性
StringSet.prototype = Object.create(AbstractWritableSet.prototype, {
    constructor: {value: StringSet},
    contains: {value: function(x){return x in this.set;}},
    size: {value: function(x){return this.n;}},
    foreach: {value: function(f,c){ Object.keys(this.set).forEach(f,c);}},
    add: {
        value: function(){
            for(var i=0; i<arguments.length; i++){
                if(!(arguments[i] in this.set)){
                    this.set[arguments[i]] = true;
                    this.n++;
                }
            }
            return this;
        }
    },
    remove: {
        value: function(){
            for(var i=0; i<arguments.length; i++){
                if(arguments[i] in this.set){
                    delete this.set[arguments[i]];
                    this.n--;
                }
            }
            return this;
        }
    }
});
```



```
// 定义不可枚举的属性, 封装在一个匿名函数中
(function(){
    // 定义一个不可枚举的属性objectId，它可以被所有对象继承
    // 定义了getter，没定义setter，不可配置的
    Object.defineProperty(Object.prototype, "objectId", {
                            get: idGetter,   // 取值器
                            enumerable: false,
                            configurable: false
    });
    // 当读取objectId时调用这个getter函数
    function idGetter(){
        if(!(idprop in this)){  // 如果对象不存在id
            if(!Object.isExtensible(this))  // 如果不可扩展，即不能添加属性
                throw Error("Can't define id for noextensible objects");
            Object.defineProperty(this, idprop, {
                            value: nextid++,
                            writable: false,
                            enumerable: false,
                            configurable: false
            });
        }
        return this[idprop];
    }
    // idGetter用到这些变量，这些都属于私有变量
    var idprop = "|**objectId**|"; 
    var nextid = 1; // 给它设置初始值
}())
```



```
function Range(from,to){
    if(this.from > to) throw new Error("Range: from must be <= to");
    // 定义存取器方法以维持不变
    function getFrom(){return from;}
    function getTo(){return to;}
    function setFrom(f){  // 设置from的值时，不允许from大于to
        if(f <= to) from = f;
        else throw new Error("Range: from must be <= to");
    }
    function setTo(t){
        if(t >= from) to = t;
        else throw new Error("Range: to must be >= from");
    }
    // 将使用取值器的属性设置为可枚举的，不可配置的
    Object.defineProperties(this, {
        from:{
            get: getFrom,
            set: setFrom,
            enumerable: true, configurable:false
        },
        to:{
            get:getTo,
            set:setTo,
            enumerable: true, configurable: false
        }
    });
 
}
Range.prototype = hideProps({
    constructor: Range,
    includes: function(x){return this.from <=x && x <= this.to;},
    foreach: function(f){for(var x=Math.ceil(this.from); x<=this.to; x++) f(x);},
    toString: function(){return "(" + this.from + "..." + this.to + ")";}
});
```



窗口大小

```js
// 为了兼容老的Firefox
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
console.log("leftPos:",leftPos, ",topPos:",topPos)

//moveBy(dx,dy)：相对移动，dx,dy可以为负
//moveTo(x,y)：移动，x,y可以为负
window.moveTo(50,100)
window.moveBy(100,200)
window.moveBy(-50,0)

window.resizeTo(400,300) // resizeTo(w,h)：缩放到, w,h不能为负
window.resizeBy(200,100)  // resizeBy(dw,dh)：相对缩放，dw,dh可以为负
```



```
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
if(typeof pageWidth != "number"){
    // 判断页面是否处于标准模式
    if(document.compatMode == "CSS1Compat"){
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    }else{
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}
console.log(pageWidth)
console.log(pageHeight)
```



```js
//- scrollBy(x, y)：按照指定的像素值相对来滚动的内容(第一个参数是滚动条向右滚动，第二个参数是滚动条向下滚动，方法执行重复执行，值会累加)；（可直接在控制台上演示）
// scrollTo(x, y)：把内容滚动到指定的坐标；
// scroll(x, y)：把内容滚动到指定的坐标；
// scrollX及scrollY
if(window.confirm("确定删除吗？")){
    alert("已经删除");
}else{
    alert("未删除");
}


//window.prompt(提示信息，默认值) 要显示的文本提示和文本输入域的默认值，该默认值可以是一个空字符串
prompt("请输入你的名字","王唯")


var result = prompt("请输入密码：","")
if(result == "8888"){
    alert("登录成功")
}
 
var result = prompt("请输入你的名字","王唯")
if(result !== null){
    document.write("欢迎你：" + result)
}else{
    alert("你没有输入任何内容")
}

//系统对话框很适合向用户显示消息并由用户作出决定；由于不涉及HTML、CSS或JS，因此它们是增强Web应用程序的一种便捷方式
do{
    var name = prompt("输入你的名字：")
    var correct = confirm("你输入的是：" + name + ".\n" + "你可以单击确定或取消")
}while(!correct)
alert("你好，" + name)
```



```
<style>
    #alert_box{
        position: absolute; display: none; width: 400px; height:300px; border-radius: 3px;
         box-shadow: 0 0 5px rgba(0, 0, 0, .5);
    }
    #alert_box h1{
        margin:0; padding: 0; font-size: 1.5em; line-height: 60px;
        height: 60px;
        text-align: center; background-color: rgba(255,255,255,1);
    }
    #alert_box div{
        height: 240px;
        padding: 1em; line-height: 1.8em; background-color: rgba(255,255,255,.8);
    }
    #alert_box span{
        position: absolute; width: 30px; height: 30px;
        top:-15px; right:-15px; background-color:#000; border-radius: 50%;;
    }
    </style>
<script>
window.alert = function(title,info){
    var box = document.createElement("div");
    box.id = "alert_box";
    box.style.left = ((window.innerWidth - 400) / 2) + "px";
    box.style.top = ((window.innerHeight - 300) / 2) + "px";
 
    var h1 = document.createElement("h1");
    h1.innerText = title;
    box.appendChild(h1);
 
    var innerBox = document.createElement("div");
    innerBox.innerHTML = info;
    box.appendChild(innerBox);
 
    var closeSpan = document.createElement('span');
    box.appendChild(closeSpan);
    closeSpan.addEventListener("click",function(e){
        document.body.removeChild(box);
    },false);
 
    box.style.display = "block";
    document.body.appendChild(box);
};
window.alert("零点网络","哪些是这样的？");
</script>
```



工具对话框 window.find() window.print()异步显示，能够将控制权立即交还给脚本；其与浏览器菜单中的查找和打印命令是相同



```js
//setTimeInterval()
//window.setTimeout(code,delay)
// 不建议传递字符串
setTimeout("alert('zeronetwork')",3000)
// 推荐的使用方式
setTimeout(function(){
    alert('zeronetwork')
},3000);
// 推荐的使用方式
setTimeout(show,3000)
function show(){
    alert('zeronetwork')
}

//setInterval()
// 不建议使用字符串
setInterval("console.log('zero')", 3000);
// 推荐的方式
setInterval(function(){
    console.log('zero');
},3000);
 
function timer(){
    var d = new Date();
    document.getElementById("result").innerText = d.toLocaleTimeString();
}
setInterval(timer,1000);
 
// 输出的时间并不精确，并不是整1000毫秒
var firstTime = new Date().getTime();
setInterval(function(){
    var lastTime = new Date().getTime();
    console.log(lastTime - firstTime);
    // alert("ok");  // 会暂停
    firstTime = lastTime;
},1000);
同setTimeout()一样，setInterval()也支持第三个参数；
```

取消间隔调用的重要性要远远高于取消超时调用，因为在不取消的情况下，间隔调用将会一直执行到页面卸载

```js
var num = 0, max = 10;
var intervalId = null;
function incNum(){
    num++;
    console.log(num);
    // 如果执行次数达到了max设定的值，则取消后续的调用
    if(num == max){
        clearInterval(intervalId);
        alert("结束");
    }
}
intervalId = setInterval(incNum, 1000);
 
// 另外
var mInput = document.getElementsByTagName('input')[0];
var sInput = document.getElementsByTagName('input')[1];
var m = 4,s = 52;
var timer = setInterval(function(){
    s++;
    if(s == 60){
        s = 0;
        m++;
    }
    sInput.value = s;
    mInput.value = m;
    if(m == 5)
        clearInterval(timer); 
},1000);
```



```js
<div id="loadBar" style="border: red 1px solid;"></div>
<script>
var num = 0;
var colors = ['#494949','#646464','#747474','#888888','#969696','#A8A8A8','#B6B6B6','#C6C6C6','#D7D7D7','#E1E1E1','#F0F0F0','#F9F9F9'];
function loading(){
    num++;
    var loadBar = document.getElementById("loadBar");
    loadBar.style.color = colors[num-1];
    loadBar.innerHTML = loadBar.innerHTML + "■";
    if(num < 12){
        setTimeout(loading, 1000);
    }else{
        loadBar.style.display = "none";
        window.open("https://www.zeronetwork.cn/","new");
    }
}
window.onload = loading;
</script>
 
/*
定时器应用函数 invoke 
如果只传递f,start，则使用setTimeout
如果没有传递end,则永久循环执行f，否则在end后停止
*/
function invoke(f, start, interval, end){
    if(!start) start = 0;  // 默认设置为0毫秒
    if(arguments.length <= 2)  // 单次调用模式
        setTimeout(f, start); 
    else{                   // 多次调用模式
        setTimeout(repeat, start);  // 若干秒后调用repeat()
        function repeat(){
            var h = setInterval(f, interval);  // 循环调用f()
            // 在end毫秒后停止调用，前提是end已经定义了
            if(end){
                setTimeout(function(){
                    clearInterval(h);
                }, end);
            }
        }
    }
}
invoke(function(){
    console.log("wangwei")
},1000,2000,5000)
```





```js
- assign()：// 加载新的文档
- reload()：// 重新加载当前文档
- replace()：// 用新的文档替换当前文档
```



每个插件本身也是一个MimeType对象的数组，这些对象可以通过方括号语法来访问，共有四个属性：MIME类型描述description、回指插件对象enabledPlugin、表示与MIME类型对应的文件扩展名的字符串suffixes、表示完整MIME类型字符串type；

检测IE中的插件比较麻烦，因为IE不支持Netscape式的插件；在IE中检测插件的唯一方式就是使用专有的ActiveXObject类型，并尝试创建一个特定插件的实例；IE是以COM对象的方式实现插件的，而COM对象使用唯一标识符来标识；因此，要想检查特定的插件，就必须知道其COM标识符，如：Flash的标识符是：
ShockwaveFlash.ShockwaveFlash



```js
// 检测所有浏览器中的Flash
function hasFlash(){
    var result = hasPlugin("Flash")
    if(!result)
        result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash")
    return result
}
// 检测所有浏览器中的QuickTime
function hasQuickTime(){
    var result = hasPlugin("QuickTime")
    if(!result)
        result = hasIEPlugin("QuickTime.QuickTime")
    return result
}
alert(hasFlash());  // 检测Flash
alert(hasQuickTime());  // 检测QuickTime;
```



screen对象

- availHeight 和 availWidth：只读，屏幕减去系统部件（比如任务栏）的高度和屏幕减去系统部件的宽度；即实际可用的大小；
- colorDepth：只读，返回颜色位数，如24，多数为32位
- pixelDepth：只读，屏幕的位深(FF)
- width 和 height：屏幕的宽度和屏幕的高度
- left 和 top：当前屏幕距左边的距离和距顶边的距离(FF支持)
- availLeft 和 availTop：只读，未被系统占用的最左侧的和最上方的像素值 (FF)
- bufferDepth：读、写用于呈现屏外位图的位数（IE）
- deviceXDPI与deviceYDPI：只读，实际的水平与垂直DPI(IE)
- logicalXDPI与logicalYDPI：只读，屏幕逻辑的水平与垂直DPI (IE)
- fontSmoothingEnabled：只读，是否启用字体平滑(IE)
- updateInterval：读、写，以毫秒表示的屏幕刷新时间间隔(IE)

```js
// 网页全屏，非IE会禁用调整窗口的能力，因此是无效的
window.moveTo(0,0);
window.resizeTo(screen.availWidth, screen.availHeight);
 
// 弹出窗口居中
function center(url){
    var w = screen.availWidth / 2;
    var h = screen.availHeight / 2;
    // 计算居中显示时左侧坐标
    var l = (screen.availWidth - w) / 2;
    // 计算居中显示时顶部坐标
    var t = (screen.availHeight - h) / 2;
    // 计算坐标参数字符串
    var p = "top=" + t + ",left=" + l + ",width=" + w + ",height=" + h;
    var win = window.open(url, "newin", p);
    win.focus();
}
center("https://www.zeronetwork.cn");
```



错误处理

window对象的onerror属性是一个事件处理程序，当未捕获的异常传递到调用栈上时就会调用它，并把错误的消息输出到浏览器的Javascript控制台上；

window.onerror的第一个参数是描述错误的一条消息，第二个参数是一个字符串，它存放引发错误的Javascript代码所在的文档的URL，第三个参数是文档中发生错误的行数；

onerror处理程序也有一个返回值，如果返回false，它通知浏览器事件处理程序已经处理了错误，不需要其他操作（换句话说，浏览器不应该显示它自己的错误消息；

onerror处理程序是早期的JavaScript的产物，那时语言核心不包括try/catch异常处理语句；现在实际开发中，虽然很少使用它，但有些项目还在使用它

```js
// 在一个对话中弹出错误消息，但不超过三次
window.onerror = function(msg,url,line){
    if(onerror.num++ < onerror.max){
        alert("ERROR: " + msg + "\nurl: " + url + "\nline: " + line)
        return true
    }
}
onerror.max = 3
onerror.num = 0
 
function show(a,b){
    return sum(a,b)
}
console.log(show(3,0))


class Person {
        constructor(name, age)
            this.name=name
            this.age=age
    }
    say(){
        console.log(this.name+'hello')
    }
    var ldh = new Person('dehua', 18)
    ldh.say()



class father {
        constructor(surname){
            this.surname = surname
        }
        say(){
            console.log('your surname is'+this.surname)
        }
    }
    class son extends father{

    }
    var damao = new son('liu')
    damao.say()
```



```js
class Person { // 父类
constructor(surname){
this.surname = surname;
}
}
class Student extends Person { // 子类继承父类
constructor(surname,firstname){
super(surname); // 调用父类的constructor(surname)
this.firstname = firstname; // 定义子类独有的属性
}
}


class Father {
constructor(surname) {
this.surname = surname;
}
saySurname() {
console.log('我的姓是' + this.surname);
}
}
class Son extends Father { // 这样子类就继承了父类的属性和方法
constructor(surname, fristname) {
super(surname); // 调用父类的constructor(surname)
this.fristname = fristname;
}
sayFristname() {
console.log("我的名字是：" + this.fristname);
}
}
var damao = new Son('刘', "德华")
damao.saySurname()
damao.sayFristname()


//class
// 以手机类为例
function Phone(brand,price){
    this.brand = brand
    this.price = price
}
// 静态成员
//相当于 python里的staticmethod
Phone.name = '手机'
Phone.change = function(){
    console.log('我可以改变世界')
}

// 相当于Python里的classmethod
Phone.ptototype.size = "5.5英寸"
Phone.prototy.call = function() {
    console.log('我可以打电话')
}

ler Huawei = new Phone('华为',5999)

// ES6语法
class Phone{
    // 构造函数方法
    constructor(brand,price){
        this.brand = brand
        this.call = call
    }
    
    // 语法必须使用这个方法，不能用ES5老语法
    call() {
        console.log('我可以打电话')
    }
}

ler Huawei = new Phone('华为',5999)
```



```js
class Phone{
    constructor(brand,price){
        this.brand = brand
        this.price = price
    }
    
    call(){
        console.log('我可以打电话')
    }
}

class SmartPhone extends Phone{
    constructor(brand,price,color,size){
        super(brand,price)
        this.color = color
        this.size = size
    }
    photo() {
        console.log('我可以拍照')
    }
    playGame() {
        console.log('我可以打游戏')
    }
}

const xioami = new SmartPhone('xiaomi',2499,'黑色','505')
```



操作DOM

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="time">2019-9-9</div>
    <script>
        // 1. 因为我们文档页面从上往下加载，所以先得有标签 所以我们script写到标签的下面
        // 2. get 获得 element 元素 by 通过 驼峰命名法 
        // 3. 参数 id是大小写敏感的字符串
        // 4. 返回的是一个元素对象
        var timer = document.getElementById('time');
        console.log(timer);
        console.log(typeof timer);
        // 5. console.dir 打印我们返回的元素对象 更好的查看里面的属性和方法
        console.dir(timer) //打印获取的元素对象，查看对象里面的属性和方法
    </script>
</body>

</html>
```





```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <ul>
        <li>知否知否，应是等你好久11</li>
        <li>知否知否，应是等你好久11</li>
        <li>知否知否，应是等你好久11</li>
        <li>知否知否，应是等你好久11</li>

    </ul>
    <ol id="ol">
        <li>生僻字</li>
        <li>生僻字</li>
        <li>生僻字</li>
        <li>生僻字</li>

    </ol>

    <script>
        // 1.返回获取过来元素对象的集合 得到元素对象是动态的 以伪数组存储 想要操作里面的元素就需要遍历
        var lis = document.getElementsByTagName('li')
        console.log(lis);
        console.log(lis[0]);
        // 2. 我们想要依次打印里面的元素对象我们可以采取遍历的方式
        for (var i = 0; i < lis.length; i++) {
            console.log(lis[i]);

        }
        // 3. 如果页面中只有一个li 返回的还是伪数组的形式 
        // 4. 如果页面中没有这个元素 返回的是空的伪数组的形式
        // 5. element.getElementsByTagName('标签名'); 父元素必须是指定的单个元素
        // var ol = document.getElementsByTagName('ol'); // [ol]
        // console.log(ol[0].getElementsByTagName('li'));
        var ol = document.getElementById('ol');
        console.log(ol.getElementsByTagName('li'));
    </script>
</body>

</html>
```





```js
document.getElementsByClassName(‘类名’)；// 根据类名返回元素对象集合
document.querySelector('选择器');        // 根据指定选择器返回第一个元素对象
document.querySelectorAll('选择器');     // 根据指定选择器返回

注意：  // querySelector 和 querySelectorAll里面的选择器需要加符号,比如:document.querySelector('#nav')
```

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div class="box">盒子1</div>
    <div class="box">盒子2</div>
    <div id="nav">
        <ul>
            <li>首页</li>
            <li>产品</li>
        </ul>
    </div>
    <script>
        // 1. getElementsByClassName 根据类名获得某些元素集合
        var boxs = document.getElementsByClassName('box');
        console.log(boxs);
        // 2. querySelector 返回指定选择器的第一个元素对象  切记 里面的选择器需要加符号 .box  #nav
        var firstBox = document.querySelector('.box');
        console.log(firstBox);
        var nav = document.querySelector('#nav');
        console.log(nav);
        var li = document.querySelector('li');
        console.log(li);
        // 3. querySelectorAll()返回指定选择器的所有元素对象集合
        var allBox = document.querySelectorAll('.box');
        console.log(allBox);
        var lis = document.querySelectorAll('li');
        console.log(lis);
    </script>
</body>

</html>
```



获取body,html

```js
doucumnet.body  // body元素对象
document.documentElement  // html元素对象
```



| ***\*鼠标事件\**** | ***\*触发条件\**** |
| ------------------ | ------------------ |
| onclick            | 鼠标点击左键触发   |
| onmouseover        | 鼠标经过触发       |
| onmouseout         | 鼠标离开触发       |
| onfocus            | 获得鼠标焦点触发   |
| onblur             | 失去鼠标焦点触发   |
| onmousemove        | 鼠标移动触发       |
| onmouseup          | 鼠标弹起触发       |
| onmousedown        | 鼠标按下触发       |





```js
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }
        
        .wrap {
            width: 300px;
            margin: 100px auto 0;
        }
        
        table {
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid #c0c0c0;
            width: 300px;
        }
        
        th,
        td {
            border: 1px solid #d0d0d0;
            color: #404060;
            padding: 10px;
        }
        
        th {
            background-color: #09c;
            font: bold 16px "微软雅黑";
            color: #fff;
        }
        
        td {
            font: 14px "微软雅黑";
        }
        
        tbody tr {
            background-color: #f0f0f0;
        }
        
        tbody tr:hover {
            cursor: pointer;
            background-color: #fafafa;
        }
    </style>

</head>

<body>
    <div class="wrap">
        <table>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" id="j_cbAll" />
                    </th>
                    <th>商品</th>
                    <th>价钱</th>
                </tr>
            </thead>
            <tbody id="j_tb">
                <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>iPhone8</td>
                    <td>8000</td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>iPad Pro</td>
                    <td>5000</td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>iPad Air</td>
                    <td>2000</td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>Apple Watch</td>
                    <td>2000</td>
                </tr>

            </tbody>
        </table>
    </div>
    <script>
        // 1. 全选和取消全选做法：  让下面所有复选框的checked属性（选中状态） 跟随 全选按钮即可
        // 获取元素
        var j_cbAll = document.getElementById('j_cbAll'); // 全选按钮
        var j_tbs = document.getElementById('j_tb').getElementsByTagName('input'); // 下面所有的复选框
        // 注册事件
        j_cbAll.onclick = function() {
                // this.checked 它可以得到当前复选框的选中状态如果是true 就是选中，如果是false 就是未选中
                console.log(this.checked);
                for (var i = 0; i < j_tbs.length; i++) {
                    j_tbs[i].checked = this.checked;
                }
            }
            // 2. 下面复选框需要全部选中， 上面全选才能选中做法： 给下面所有复选框绑定点击事件，每次点击，都要循环查看下面所有的复选框是否有没选中的，如果有一个没选中的， 上面全选就不选中。
        for (var i = 0; i < j_tbs.length; i++) {
            j_tbs[i].onclick = function() {
                // flag 控制全选按钮是否选中
                var flag = true;
                // 每次点击下面的复选框都要循环检查者4个小按钮是否全被选中
                for (var i = 0; i < j_tbs.length; i++) {
                    if (!j_tbs[i].checked) {
                        flag = false;
                        break; // 退出for循环 这样可以提高执行效率 因为只要有一个没有选中，剩下的就无需循环判断了
                    }
                }
                j_cbAll.checked = flag;
            }
        }
    </script>
</body>

</html>
```





```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        li {
            list-style-type: none;
        }
        
        .tab {
            width: 978px;
            margin: 100px auto;
        }
        
        .tab_list {
            height: 39px;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
        }
        
        .tab_list li {
            float: left;
            height: 39px;
            line-height: 39px;
            padding: 0 20px;
            text-align: center;
            cursor: pointer;
        }
        
        .tab_list .current {
            background-color: #c81623;
            color: #fff;
        }
        
        .item_info {
            padding: 20px 0 0 20px;
        }
        
        .item {
            display: none;
        }
    </style>
</head>

<body>
    <div class="tab">
        <div class="tab_list">
            <ul>
                <li class="current">商品介绍</li>
                <li>规格与包装</li>
                <li>售后保障</li>
                <li>商品评价（50000）</li>
                <li>手机社区</li>
            </ul>
        </div>
        <div class="tab_con">
            <div class="item" style="display: block;">
                商品介绍模块内容
            </div>
            <div class="item">
                规格与包装模块内容
            </div>
            <div class="item">
                售后保障模块内容
            </div>
            <div class="item">
                商品评价（50000）模块内容
            </div>
            <div class="item">
                手机社区模块内容
            </div>

        </div>
    </div>
    <script>
        // 获取元素
        var tab_list = document.querySelector('.tab_list');
        var lis = tab_list.querySelectorAll('li');
        var items = document.querySelectorAll('.item');
        // for循环绑定点击事件
        for (var i = 0; i < lis.length; i++) {
            // 开始给5个小li 设置索引号 
            lis[i].setAttribute('index', i);
            lis[i].onclick = function() {
                // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式

                // 干掉所有人 其余的li清除 class 这个类
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = '';
                }
                // 留下我自己 
                this.className = 'current';
                // 2. 下面的显示内容模块
                var index = this.getAttribute('index');
                console.log(index);
                // 干掉所有人 让其余的item 这些div 隐藏
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = 'none';
                }
                // 留下我自己 让对应的item 显示出来
                items[index].style.display = 'block';
            }
        }
    </script>
</body>

</html>
```





```js
node.appendChild() // 方法将一个节点添加到指定父节点的子节点列表末尾。类似于 CSS 里面的 after 伪元素
node.insertBefore() // 方法将一个节点添加到父节点的指定子节点前面。类似于 CSS 里面的 before 伪元素
```



```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <ul>
        <li>123</li>
    </ul>
    <script>
        // 1. 创建节点元素节点
        var li = document.createElement('li');
        // 2. 添加节点 node.appendChild(child)  node 父级  child 是子级 后面追加元素  类似于数组中的push
        var ul = document.querySelector('ul');
        ul.appendChild(li);
        // 3. 添加节点 node.insertBefore(child, 指定元素);
        var lili = document.createElement('li');
        ul.insertBefore(lili, ul.children[0]);
        // 4. 我们想要页面添加一个新的元素 ： 1. 创建元素 2. 添加元素
    </script>
</body>

</html>
```



node.removeChild(child)



删除留言

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        body {
            padding: 100px;
        }
        
        textarea {
            width: 200px;
            height: 100px;
            border: 1px solid pink;
            outline: none;
            resize: none;
        }
        
        ul {
            margin-top: 50px;
        }
        
        li {
            width: 300px;
            padding: 5px;
            background-color: rgb(245, 209, 243);
            color: red;
            font-size: 14px;
            margin: 15px 0;
        }
        
        li a {
            float: right;
        }
    </style>
</head>

<body>
    <textarea name="" id=""></textarea>
    <button>发布</button>
    <ul>

    </ul>
    <script>
        // 1. 获取元素
        var btn = document.querySelector('button');
        var text = document.querySelector('textarea');
        var ul = document.querySelector('ul');
        // 2. 注册事件
        btn.onclick = function() {
            if (text.value == '') {
                alert('您没有输入内容');
                return false;
            } else {
                // console.log(text.value);
                // (1) 创建元素
                var li = document.createElement('li');
                // 先有li 才能赋值
                li.innerHTML = text.value + "<a href='javascript:;'>删除</a>";
                // (2) 添加元素
                // ul.appendChild(li);
                ul.insertBefore(li, ul.children[0]);
                // (3) 删除元素 删除的是当前链接的li  它的父亲
                var as = document.querySelectorAll('a');
                for (var i = 0; i < as.length; i++) {
                    as[i].onclick = function() {
                        // node.removeChild(child); 删除的是 li 当前a所在的li  this.parentNode;
                        ul.removeChild(this.parentNode);
                    }
                }
            }
        }
    </script>
</body>

</html>
```



复制节点

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <ul>
        <li>1111</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <script>
        var ul = document.querySelector('ul');
        // 1. node.cloneNode(); 括号为空或者里面是false 浅拷贝 只复制标签不复制里面的内容
        // 2. node.cloneNode(true); 括号为true 深拷贝 复制标签复制里面的内容
        var lili = ul.children[0].cloneNode(true);
        ul.appendChild(lili);
    </script>
</body>

</html>
```



创建元素

```js
1， document.write // 是直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘
2. innerHTML // 是将内容写入某个 DOM 节点，不会导致页面全部重绘
3. innerHTML // 创建多个元素效率更高（不要拼接字符串，采取数组形式拼接），结构稍微复杂
4. createElement() // 创建多个元素效率稍低一点点，但是结构更清晰

// 总结：不同浏览器下，innerHTML 效率要比 creatElement 高
```





```js
eventTarget.addEventListener(type, listener[, useCapture])
- type：事件类型字符串，比如 click 、mouseover ，注意这里不要带 on
- listener：事件处理函数，事件发生时，会调用该监听函数
- useCapture：可选参数，是一个布尔值，默认是 false。学完 DOM 事件流后，我们再进一步学习

eventTarget.attachEvent(eventNameWithOn, callback) 
```



```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <button>传统注册事件</button>
    <button>方法监听注册事件</button>
    <button>ie9 attachEvent</button>
    <script>
        var btns = document.querySelectorAll('button');
        // 1. 传统方式注册事件
        btns[0].onclick = function() {
            alert('hi');
        }
        btns[0].onclick = function() {
                alert('hao a u');
            }
            // 2. 事件侦听注册事件 addEventListener 
            // (1) 里面的事件类型是字符串 必定加引号 而且不带on
            // (2) 同一个元素 同一个事件可以添加多个侦听器（事件处理程序）
        btns[1].addEventListener('click', function() {
            alert(22);
        })
        btns[1].addEventListener('click', function() {
                alert(33);
            })
            // 3. attachEvent ie9以前的版本支持
        btns[2].attachEvent('onclick', function() {
            alert(11);
        })
    </script>
</body>

</html>
```



注册事件兼容性解决问题

```js
function addEventListener(element, eventName, fn) {
      // 判断当前浏览器是否支持 addEventListener 方法
      if (element.addEventListener) {
        element.addEventListener(eventName, fn);  // 第三个参数 默认是false
      } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, fn);
      } else {
        // 相当于 element.onclick = fn;
        element['on' + eventName] = fn;
 } 
```

删除事件兼容性解决问题

```js
function removeEventListener(element, eventName, fn) {
      // 判断当前浏览器是否支持 removeEventListener 方法
      if (element.removeEventListener) {
        element.removeEventListener(eventName, fn);  // 第三个参数 默认是false
      } else if (element.detachEvent) {
        element.detachEvent('on' + eventName, fn);
      } else {
        element['on' + eventName] = null;
 } 
```



删除事件

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: pink;
        }
    </style>
</head>

<body>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <script>
        var divs = document.querySelectorAll('div');
        divs[0].onclick = function() {
                alert(11);
                // 1. 传统方式删除事件
                divs[0].onclick = null;
            }
            // 2. removeEventListener 删除事件
        divs[1].addEventListener('click', fn) // 里面的fn 不需要调用加小括号

        function fn() {
            alert(22);
            divs[1].removeEventListener('click', fn);
        }
        // 3. detachEvent
        divs[2].attachEvent('onclick', fn1);

        function fn1() {
            alert(33);
            divs[2].detachEvent('onclick', fn1);
        }
    </script>
</body>

</html>
```



DOM事件

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .father {
            overflow: hidden;
            width: 300px;
            height: 300px;
            margin: 100px auto;
            background-color: pink;
            text-align: center;
        }
        
        .son {
            width: 200px;
            height: 200px;
            margin: 50px;
            background-color: purple;
            line-height: 200px;
            color: #fff;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son">son盒子</div>
    </div>
    <script>
        // dom 事件流 三个阶段
        // 1. JS 代码中只能执行捕获或者冒泡其中的一个阶段。
        // 2. onclick 和 attachEvent（ie） 只能得到冒泡阶段。
        // 3. 捕获阶段 如果addEventListener 第三个参数是 true 那么则处于捕获阶段  document -> html -> body -> father -> son
        // var son = document.querySelector('.son');
        // son.addEventListener('click', function() {
        //     alert('son');
        // }, true);
        // var father = document.querySelector('.father');
        // father.addEventListener('click', function() {
        //     alert('father');
        // }, true);
        // 4. 冒泡阶段 如果addEventListener 第三个参数是 false 或者 省略 那么则处于冒泡阶段  son -> father ->body -> html -> document
        var son = document.querySelector('.son');
        son.addEventListener('click', function() {
            alert('son');
        }, false);
        var father = document.querySelector('.father');
        father.addEventListener('click', function() {
            alert('father');
        }, false);
        document.addEventListener('click', function() {
            alert('document');
        })
    </script>
</body>

</html>
```



事件对象

```js
 eventTarget.onclick = function(event) {} 
  eventTarget.addEventListener('click', function(event) {}）
  // 这个 event 就是事件对象，我们还喜欢的写成 e 或者 evt 
                               
 eventTarget.onclick = function(event) {
     // 这个 event 就是事件对象，我们还喜欢的写成 e 或者 evt 
  } 
  eventTarget.addEventListener('click', function(event) {
    // 这个 event 就是事件对象，我们还喜欢的写成 e 或者 evt 
  }）
```





```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: pink;
        }
    </style>
</head>

<body>
    <div>123</div>
    <ul>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
    </ul>
    <script>
        // 常见事件对象的属性和方法
        // 1. e.target 返回的是触发事件的对象（元素）  this 返回的是绑定事件的对象（元素）
        // 区别 ： e.target 点击了那个元素，就返回那个元素 this 那个元素绑定了这个点击事件，那么就返回谁
        var div = document.querySelector('div');
        div.addEventListener('click', function(e) {
            console.log(e.target);
            console.log(this);
        })
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function(e) {
                // 我们给ul 绑定了事件  那么this 就指向ul  
                console.log(this);
                console.log(e.currentTarget);
                // e.target 指向我们点击的那个对象 谁触发了这个事件 我们点击的是li e.target 指向的就是li
                console.log(e.target);

            })
            // 了解兼容性
            // div.onclick = function(e) {
            //     e = e || window.event;
            //     var target = e.target || e.srcElement;
            //     console.log(target);

        // }
        // 2. 了解 跟 this 有个非常相似的属性 currentTarget  ie678不认识
    </script>
</body>

</html>
```



| ***\*事件对象属性方法\**** | ***\*说明\****                                              |
| -------------------------- | ----------------------------------------------------------- |
| e.target                   | 返回触发事件的对象     标准                                 |
| e.srcElement               | 返回触发事件的对象      非标准ie6-8使用                     |
| e.type                     | 返回事件的类型比如click mouseover不带on                     |
| e.cancelBubble             | 该属性阻止冒泡非标准ie6-8使用                               |
| e.returnValue              | 该属性阻止默认事件(默认行为)非标准ie6-8使用比如不让链接跳转 |
| e.preventDefault(          | 该方法阻止默认事件(默认行为)标准比如不让链接跳转            |
| e.stopPropagation(         | 阻止冒泡标准                                                |



事件冒泡：开始时由最具体的元素接收，然后逐级向上传播到到 DOM 最顶层节点

事件冒泡

```js
// 标准写法：利用事件对象里面的 stopPropagation()方法
e.stopPropagation() 
// 非标准写法：IE 6-8  利用事件对象 cancelBubble 属性 
e.cancelBubble = true

//阻止事件冒泡的兼容性解决方案
if(e && e.stopPropagation){
      e.stopPropagation();
  }else{
      window.event.cancelBubble = true;
  }
```



```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .father {
            overflow: hidden;
            width: 300px;
            height: 300px;
            margin: 100px auto;
            background-color: pink;
            text-align: center;
        }
        
        .son {
            width: 200px;
            height: 200px;
            margin: 50px;
            background-color: purple;
            line-height: 200px;
            color: #fff;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son">son儿子</div>
    </div>
    <script>
        // 常见事件对象的属性和方法
        // 阻止冒泡  dom 推荐的标准 stopPropagation() 
        var son = document.querySelector('.son');
        son.addEventListener('click', function(e) {
            alert('son');
            e.stopPropagation(); // stop 停止  Propagation 传播
            e.cancelBubble = true; // 非标准 cancel 取消 bubble 泡泡
        }, false);

        var father = document.querySelector('.father');
        father.addEventListener('click', function() {
            alert('father');
        }, false);
        document.addEventListener('click', function() {
            alert('document');
        })
    </script>
</body>

</html>
```



事件委托

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <ul>
        <li>知否知否，点我应有弹框在手！</li>
        <li>知否知否，点我应有弹框在手！</li>
        <li>知否知否，点我应有弹框在手！</li>
        <li>知否知否，点我应有弹框在手！</li>
        <li>知否知否，点我应有弹框在手！</li>
    </ul>
    <script>
        // 事件委托的核心原理：给父节点添加侦听器， 利用事件冒泡影响每一个子节点
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function(e) {
            // alert('知否知否，点我应有弹框在手！');
            // e.target 这个可以得到我们点击的对象
            e.target.style.backgroundColor = 'pink';
        })
    </script>
</body>

</html>
```



鼠标事件对象

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            height: 3000px;
        }
    </style>
</head>
<body>
<script>
        // 鼠标事件对象 MouseEvent
        document.addEventListener('click', function(e) {
            // 1. client 鼠标在可视区的x和y坐标
            console.log(e.clientX);
            console.log(e.clientY);
            console.log('---------------------')
<script>
        // 鼠标事件对象 MouseEvent
        document.addEventListener('click', function(e) {
            // 1. client 鼠标在可视区的x和y坐标
            console.log(e.clientX);
            console.log(e.clientY);
            console.log('---------------------')
 </script>
</body>
</html>
```



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        img {
            position: absolute;
            top: 2px;
        }
    </style>
</head>

<body>
    <img src="images/angel.gif" alt="">
    <script>
        var pic = document.querySelector('img');
        document.addEventListener('mousemove', function(e) {
            // 1. mousemove只要我们鼠标移动1px 就会触发这个事件
            // console.log(1);
            // 2.核心原理： 每次鼠标移动，我们都会获得最新的鼠标坐标， 把这个x和y坐标做为图片的top和left 值就可以移动图片
            var x = e.pageX;
            var y = e.pageY;
            console.log('x坐标是' + x, 'y坐标是' + y);
            //3 . 千万不要忘记给left 和top 添加px 单位
            pic.style.left = x - 50 + 'px';
            pic.style.top = y - 40 + 'px';
        });
    </script>
</body>
</html>
```



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <script>
        // 常用的键盘事件
        //1. keyup 按键弹起的时候触发 
        // document.onkeyup = function() {
        //         console.log('我弹起了');

        //     }
        document.addEventListener('keyup', function() {
            console.log('我弹起了');
        })

        //3. keypress 按键按下的时候触发  不能识别功能键 比如 ctrl shift 左右箭头啊
        document.addEventListener('keypress', function() {
                console.log('我按下了press');
            })
            //2. keydown 按键按下的时候触发  能识别功能键 比如 ctrl shift 左右箭头啊
        document.addEventListener('keydown', function() {
                console.log('我按下了down');
            })
            // 4. 三个事件的执行顺序  keydown -- keypress -- keyup
    </script>
</body>

</html>
```





```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <input type="text">
    <script>
        // 核心思路： 检测用户是否按下了s键，如果按下s键，就把光标定位到搜索框里面
        // 使用键盘事件对象里面的keyCode 判断用户按下的是否是s键
        // 搜索框获得焦点： 使用 js 里面的 focus() 方法
        var search = document.querySelector('input');
        document.addEventListener('keyup', function(e) {
            // console.log(e.keyCode);
            if (e.keyCode === 83) {
                search.focus();
            }
        })
    </script>
</body>

</html>
```



京东快递单号查询

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        .search {
            position: relative;
            width: 178px;
            margin: 100px;
        }
        
        .con {
            display: none;
            position: absolute;
            top: -40px;
            width: 171px;
            border: 1px solid rgba(0, 0, 0, .2);
            box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
            padding: 5px 0;
            font-size: 18px;
            line-height: 20px;
            color: #333;
        }
        
        .con::before {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            top: 28px;
            left: 18px;
            border: 8px solid #000;
            border-style: solid dashed dashed;
            border-color: #fff transparent transparent;
        }
    </style>
</head>

<body>
    <div class="search">
        <div class="con">123</div>
        <input type="text" placeholder="请输入您的快递单号" class="jd">
    </div>
    <script>
        // 快递单号输入内容时， 上面的大号字体盒子（con）显示(这里面的字号更大）
        // 表单检测用户输入： 给表单添加键盘事件
        // 同时把快递单号里面的值（value）获取过来赋值给 con盒子（innerText）做为内容
        // 如果快递单号里面内容为空，则隐藏大号字体盒子(con)盒子
        var con = document.querySelector('.con');
        var jd_input = document.querySelector('.jd');
        jd_input.addEventListener('keyup', function() {
                // console.log('输入内容啦');
                if (this.value == '') {
                    con.style.display = 'none';
                } else {
                    con.style.display = 'block';
                    con.innerText = this.value;
                }
            })
            // 当我们失去焦点，就隐藏这个con盒子
        jd_input.addEventListener('blur', function() {
                con.style.display = 'none';
            })
            // 当我们获得焦点，就显示这个con盒子
        jd_input.addEventListener('focus', function() {
            if (this.value !== '') {
                con.style.display = 'block';
            }
        })
    </script>
</body>
```



调整窗口大小

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
        }
    </style>
</head>

<body>
    <script>
        window.addEventListener('load', function() {
            var div = document.querySelector('div');
            window.addEventListener('resize', function() {
                console.log(window.innerWidth);

                console.log('变化了');
                if (window.innerWidth <= 800) {
                    div.style.display = 'none';
                } else {
                    div.style.display = 'block';
                }

            })
        })
    </script>
    <div></div>
</body>

</html>
```



setTimeout()定时器

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <script>
        // 1. setTimeout 
        // 语法规范：  window.setTimeout(调用函数, 延时时间);
        // 1. 这个window在调用的时候可以省略
        // 2. 这个延时时间单位是毫秒 但是可以省略，如果省略默认的是0
        // 3. 这个调用函数可以直接写函数 还可以写 函数名 还有一个写法 '函数名()'
        // 4. 页面中可能有很多的定时器，我们经常给定时器加标识符 （名字)
        // setTimeout(function() { //window.setTimeout(调用函数, [延迟的毫秒数])
        //     console.log('时间到了');

        // }, 2000);
        function callback() {
            console.log('爆炸了');

        }
        var timer1 = setTimeout(callback, 3000);
        var timer2 = setTimeout(callback, 5000);
        // setTimeout('callback()', 3000); // 我们不提倡这个写法
    </script>
</body>

</html>
```



5s后关闭的广告

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <img src="images/ad.jpg" alt="" class="ad">
    <script>
        var ad = document.querySelector('.ad');
        setTimeout(function() {
            ad.style.display = 'none';
        }, 5000);
    </script>
</body>

</html>
```



倒计时

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            margin: 200px;
        }
        
        span {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-color: #333;
            font-size: 20px;
            color: #fff;
            text-align: center;
            line-height: 40px;
        }
    </style>
</head>

<body>
    <div>
        <span class="hour">1</span>
        <span class="minute">2</span>
        <span class="second">3</span>
    </div>
    <script>
        // 1. 获取元素 
        var hour = document.querySelector('.hour'); // 小时的黑色盒子
        var minute = document.querySelector('.minute'); // 分钟的黑色盒子
        var second = document.querySelector('.second'); // 秒数的黑色盒子
        var inputTime = +new Date('2019-5-1 18:00:00'); // 返回的是用户输入时间总的毫秒数
        countDown(); // 我们先调用一次这个函数，防止第一次刷新页面有空白 
        // 2. 开启定时器
        setInterval(countDown, 1000);

        function countDown() {
            var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
            var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数 
            var h = parseInt(times / 60 / 60 % 24); //时
            h = h < 10 ? '0' + h : h;
            hour.innerHTML = h; // 把剩余的小时给 小时黑色盒子
            var m = parseInt(times / 60 % 60); // 分
            m = m < 10 ? '0' + m : m;
            minute.innerHTML = m;
            var s = parseInt(times % 60); // 当前的秒
            s = s < 10 ? '0' + s : s;
            second.innerHTML = s;
        }
    </script>
</body>

</html>
```



发送短信

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    手机号码： <input type="number"> <button>发送</button>
    <script>
        // 按钮点击之后，会禁用 disabled 为true 
        // 同时按钮里面的内容会变化， 注意 button 里面的内容通过 innerHTML修改
        // 里面秒数是有变化的，因此需要用到定时器
        // 定义一个变量，在定时器里面，不断递减
        // 如果变量为0 说明到了时间，我们需要停止定时器，并且复原按钮初始状态
        var btn = document.querySelector('button');
        var time = 3; // 定义剩下的秒数
        btn.addEventListener('click', function() {
            btn.disabled = true;
            var timer = setInterval(function() {
                if (time == 0) {
                    // 清除定时器和复原按钮
                    clearInterval(timer);
                    btn.disabled = false;
                    btn.innerHTML = '发送';
                } else {
                    btn.innerHTML = '还剩下' + time + '秒';
                    time--;
                }
            }, 1000);

        })
    </script>
</body>

</html>
```



this指向

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <button>点击</button>
    <script>
        // this 指向问题 一般情况下this的最终指向的是那个调用它的对象

        // 1. 全局作用域或者普通函数中this指向全局对象window（ 注意定时器里面的this指向window）
        console.log(this);

        function fn() {
            console.log(this);

        }
        window.fn();
        window.setTimeout(function() {
            console.log(this);

        }, 1000);
        // 2. 方法调用中谁调用this指向谁
        var o = {
            sayHi: function() {
                console.log(this); // this指向的是 o 这个对象

            }
        }
        o.sayHi();
        var btn = document.querySelector('button');
        // btn.onclick = function() {
        //     console.log(this); // this指向的是btn这个按钮对象

        // }
        btn.addEventListener('click', function() {
                console.log(this); // this指向的是btn这个按钮对象

            })
            // 3. 构造函数中this指向构造函数的实例
        function Fun() {
            console.log(this) // this 指向的是fun 实例对象

        }
        var fun = new Fun()
    </script>
</body>
</html>
```



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <button>点击</button>
    <div></div>
    <script>
        var btn = document.querySelector('button');
        var div = document.querySelector('div');
        btn.addEventListener('click', function() {
            // console.log(location.href);
            location.href = 'http://www.itcast.cn';
        })
        var timer = 5;
        setInterval(function() {
            if (timer == 0) {
                location.href = 'http://www.itcast.cn';
            } else {
                div.innerHTML = '您将在' + timer + '秒钟之后跳转到首页';
                timer--;
            }

        }, 1000);
    </script>
</body>
</html>
```



location对象

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <button>点击</button>
    <script>
        var btn = document.querySelector('button');
        btn.addEventListener('click', function() {
            // 记录浏览历史，所以可以实现后退功能
            // location.assign('http://www.itcast.cn');
            // 不记录浏览历史，所以不可以实现后退功能
            // location.replace('http://www.itcast.cn');
            location.reload(true);
        })
    </script>
</body>

</html>
```



navigator包含有关浏览器的信息，它有很多属性，我们最常用的是 userAgent，该属性可以返回由客户机发送服务器的 user-agent 头部的值

```html
//判断用户那个终端打开页面，实现跳转
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.location.href = "";     //手机
 } else {
    window.location.href = "";     //电脑
 }
```



history对象: 与浏览器历史记录进行交互。该对象包含用户（在浏览器窗口中）访问过的 URL