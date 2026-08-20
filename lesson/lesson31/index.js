"use strict";

let user = {
  name: "zhangsan",
  sayHi: function () {
    console.log(this.name);
  },
};

user.sayHi(); //有主人user

function sayHi(a, b) {
  console.log(this);
  console.log(a, b);
}
sayHi();
//普通函数 没主人  this指向window/global
//隐式绑定
//全局默认
// this指向函数执行上下文对象  函数是工具

// this指向  cmj：this === module.exports; esm: undefined

//this可以显式绑定
let p1 = {
  name: "lisi",
};

//p1用户 sayHi 工具
//sayHi.call(p1, "dog", "cat"); //参数一个个传 一个个打电话
//sayHi.apply(p1, ["dog", "cat"]); //只有两个参数
let Fn = sayHi.bind(p1); //bind返回的是函数
Fn("dog", "cat");

//课后
function show() {
  console.log(this.name);
}
const a = { name: "A" };
const b = { name: "B" };
const fn = show.bind(a);
fn.call(b);

//this 箭头函数的this new对象 this指向实例
