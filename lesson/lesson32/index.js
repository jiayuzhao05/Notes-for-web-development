function User(firstname) {
  this.firstname = firstname;
}
console.log(User.name);
const u1 = new User("xiaoyao"); //u1- o
//let temp = {} 原型链指向 this指向
User.call(u1, "xiaoyao");
//new生成过程  new构造函数

//箭头函数没有this 构造函数不能写成箭头
let obj = {
  name: "zhangsan",
  sayHi() {
    //es6语法糖 对象 方法简写 函数才能这么写 减少冗余代码 否则需要写成sayHi:function(){}
    console.log(this.name);
  },
};

obj.sayHi();
