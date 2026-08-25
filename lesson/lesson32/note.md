class 有一生命周期的钩子 捕获error

完整过程：
触发state/props/context变化
react组件：重新执行组件 重新计算UI（JSX）
虚拟DOM对比 （计算新UI，通过react组件）
真实DOM（通过JS，V8对比）（commit阶段）
paint/layout 浏览器渲染

react状态改变 != 页面改变
react组件重执行 != 页面DOM重新修改

render是计算核心 表达是对象的表达

1.initial render 第一次挂载
createRoot 调用APP执行
构造createElement

原型链在new instance中的作用

类组件 ：继承OOP范式，闭包问题，错误边界（子组件无useError()的hooks，页面局部报错，降级处理）

name是关键字 window.name内置属性

hooks本身是语法糖

operator 优先级
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence
