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

