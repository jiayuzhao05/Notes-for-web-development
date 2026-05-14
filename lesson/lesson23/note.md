<div className="sidebar">
  < img src="logo.png" />
  <nav>Home</nav>
</div>

写出他的本质和 js 对象

有什么冲突的部分

匹配 + 截断http 本身路由

课后作业 _jsx(runtime)
 JSX两种编译模式
 旧模式classic runtime(react17前):编译成React.createELement()
 每个用 JSX 的文件都必须手动 import React，否则报错

 新模式Automatic Runtime(react 17+)
 编译成 _jsx(...)，并且自动注入 import
 '''
 import { jsx as _jsx } from "react/jsx-runtime";
_jsx("div", { className: "box", children: "Hello" });
 '''

对象 props:children:123
JSX 编译后变成 _jsx(type, { children: 123 }),children也是特殊的props 是JSX标签之间内容自动放进去 比如<Foo>123</Foo> 编译后就是 _jsx(Foo, { children: 123 })

react和 reactdom 如何从网页打开 页面生成链路 如何从虚拟 DOM 到真实 DOM

<BrowserRouter/> 是 router，router 用来匹配，截断 http 路由跳转

生产环境是用户使用
main.jsx 使用了 tree shaking

JSX 语法糖本质是什么？
浏览器不认识,"看起来像 HTML 的写法",函数调用语法糖 本质是函数调用返回js对象

const el = _jsx("div", {
  className: "box",
  id: "a",
  children: "Hello"
});

返回对象(virtual DOM):
{
  type: "div",
  props: {
    className: "box",
    id: "a",
    children: "Hello"
  },
  key: null,
  // ...
}

 vite 是打包工具

为了避免和原生 DOM 冲突，<div> class， react 设计的时候换成 className

Footer() 因为大写 F 是 react 组件 否则是普通函数

reactDOm 作用：把虚拟 DOM 生成真实 DOM

# Babel 作用是什么？
类似vite用的esbuild/SWC，原理一样, JS编译器
JSX->JS
新语法->旧语法:比如把 ES2022 的 ?.、??、class 转成 ES5，让老浏览器也能跑
按需注入polyfill:比如旧浏览器没有 Promise，Babel补

props vs state
props：父组件传给子组件的数据（只读，从外部来）
state:组件自己管理的内部数据（可变，自己维护）