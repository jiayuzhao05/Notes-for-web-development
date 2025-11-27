// typeof
typeof {} //"object"
typeof Symbol()  //"symbol"
typeof null //"object"
typeof [] //"object"
typeof Null //"object"   js中对象都是二进制存储，前三位为0，系统判断为object，null二进制全是0，这个bug是出版本js留下的
typeof new RegExp() //"object"
typeof Null //"undefined" 

// 000 object
// 1 integer
// 010 双精度
// 100 string 
// 110 boolean

// instanceof 判断引用数据类型（object，function，array，date，regexp）； 判断基本数据类型无效
// 也可以判断实例是否是父类型或者祖先类型 查找目标类型原型链
[1,2,3]instanceof Array //true
new Date() instanceof Date //true

// 原始类型（primitive）
console.log(typeof 42);                 // "number"
console.log(typeof 'hi');               // "string"

// 包装对象（object wrappers）
console.log(typeof new Number(42));     // "object"
console.log(typeof new String('hi'));   // "object"

// instanceof 只对“对象”有效，primitive 会是 false
console.log((42) instanceof Number);                 // false
console.log((new Number(42)) instanceof Number);     // true

// 常见坑
console.log(typeof null);               // "object"  ← 历史遗留问题
console.log(null instanceof Object);    // false


class Animal {}
class Dog extends Animal {}

const d = new Dog();

// instanceof 走原型链
console.log(d instanceof Dog);          // true
console.log(d instanceof Animal);       // true
console.log(d instanceof Object);       // true

// typeof 对对象细分有限
console.log(typeof d);                   // "object"

//constructor 原型对象属性指向构造函数 检测基本+引用类型
// null，undefined无效对象，没有constructor
// js的constructor不稳定，开发者重写prototype，原有constructor丢失，默认为object；类继承也会出错，因为object被覆盖

//object.prototype.toString.call(判断类型最准）
//tostring是object原型对象方法，return第哦啊用着类型，tostring运行时this指向对象类型，[object,xxx]
// 不能直接new Date().tostring() 大部分对象实现自身tostring，导致object的tostring被终止查找，用call来强制执行object的tostring方法
// 缺点不能再细分

object.prototype.toString.call("a")  //"[object String]"
object.prototype.toString.call(undefined)  //"[object Undefined]"

"0" == false // true
false == [] // true
0 == [] // true

console.log(+"100px");//NaN
console.log(+" ");//0

parseInt("100px");//100
parseInt("11.22px");//11
parseFloat("12.33px");//12.33
parseFloat("12.3.4");//12.3

parseInt("a123");//NaN
parseInt(str,radix)
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255，没有 0x 仍然有效
alert( parseInt('2n9c', 36) ); // 123456

// influence the list
[2,3,4].splice(0,1)
[2,3,4].splice(0,1,5)
arrayObject.splice(index,howmany,item1,...,itemx)
push()
unshift()

//do not influence the list
// concat()  创建⼀个副本，返回新构建的数组
// slice(): 创建⼀个包含原有数组中⼀个或多个元素的新数组
// reduce()
// filter()
// some(): 将所有元素进⾏判断返回⼀个布尔值，如果存在元素都满⾜判断条件，则返回 true，
// every()
// join()
// flat()   将数组扁平化处理，返回⼀个新数组，对原数据没有影响
// flatMap()  对原数组的每个成员执⾏⼀个函数相当于执⾏Array.prototype.map()，然后对返回值组成的数组执
// ⾏flat()⽅法;还可以有第⼆个参数，⽤来绑定遍历函数⾥⾯的this


function a() {
//当前调⽤栈是：a，所以当前调⽤位置是全局
console.log(“a”)
b(); // b 的调⽤位置
}
function b() {
//当前调⽤栈是：a->b，所以当前调⽤位置是a
console.log(“b”)
c(); // c 的调⽤位置
}
function c() {
//当前调⽤栈是：a->b->c，所以当前调⽤位置是b
console.log(“c”)
}
a()


//replace 不会修改原字符
var sStr='讨论⼀下正则表达式中的replace的⽤法';
sStr.replace(/正则表达式/,'《$&》'); //$& 适⽤于没有⼦表达式的情况
// "讨论⼀下《正则表达式》中的replace的⽤法"

sStr.replace(/正则表达式/,'《$`》'); //匹配字符串左边的所有字符
// "讨论⼀下《讨论⼀下》中的replace的⽤法"

sStr.replace(/正则表达式/,"《$'》"); //匹配字符串右边的所有字符
// "讨论⼀下《中的replace的⽤法》中的replace的⽤法"

sStr.replace(/(正则)(.+?)(式)/,"《$1》$2<$3>");
// 得到："讨论⼀下《正则》表达<式>中的replace的⽤法"


sStr.replace(/(正则).+?(式)/,function() {
console.log(arguments);
});
// ["正则表达式", "正则", "式", 4, "讨论⼀下正则表达式中的replace的⽤法"]

var sStr='讨论⼀下正则表达式中的replace的正则表达式⽤法';
sStr.replace(/(正则).+?(式)/g,function($1) {
console.log($1);
return $1 + 'a';
});

str = str.replace(/\s*/g); //去除字符串内所有的空格 \s匹配任何空⽩字符。（空格，制表符，换⾏符）
str = str.replace(/^\s*|\s*$/g, "");//去除字符串内⾸尾空格
str = str.replace(/^\s*/, "");//去除字符串左侧空格
str = str.replace(/\s*&/, "");//去除字符串右侧空格
name = "Doe, John";
let a=name.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1");
console.log(a)
//John Doe
//⾸字⺟⼤写
let name = 'aaa bbb ccc';
let uw=name.replace(/\b\w+\b/g, function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);}
);