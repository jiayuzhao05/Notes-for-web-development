"use strict";

let user = {
  name: "zhangsan",
  sayHi: function () {
    console.log(this.name);
  },
};

user.sayHi(); //有主人user

//默认绑定
function sayHi(a, b) {
  //a, b 形参
  console.log(this); // 浏览器：window；Node strict：undefined
  console.log(a, b);
}
sayHi();
//普通函数 没主人  this指向window/global
//隐式绑定：谁调用，this 指向谁
//全局默认
// this指向函数执行上下文对象  函数是工具

// this指向  cmj：this === module.exports; esm: undefined

//显式绑定
let p1 = {
  name: "lisi",
};

//p1用户 sayHi 工具
//sayHi.call(p1, "dog", "cat"); //参数一个个传 一个个打电话 立即执行
//sayHi.apply(p1, ["dog", "cat"]); //只有两个参数 立即执行  apply(obj, [a, b, c])
let Fn = sayHi.bind(p1); //不立刻执行，bind返回函数  预设部分实参
Fn("dog", "cat"); //"dog" "cat" 实参（再传剩余实参）
//bind优先级最高 bind 一次，this 就锁死；后续call/apply 改不了

//课后
function show() {
  console.log(this.name);
}
const a = { name: "A" };
const b = { name: "B" };
const fn = show.bind(a);
fn.call(b);
// a 不是b
//bind等级比apply、call高，apply和call等级一样 只会按顺序被出现的后者覆盖

//this 箭头函数的this new对象 this指向实例
//this 不是定义时确定，而是调用时确定。 看谁「调用」这个函数，this指向谁（或绑定对象）
//箭头函数没有自己的this，this继承外层词法作用域 不能用call/apply/bind 改变this
const obj = {
  name: "obj",
  fn: () => console.log(this.name), // this 是外层（如 window），不是 obj
};
