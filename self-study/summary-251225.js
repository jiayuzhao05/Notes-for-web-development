// bundler:多个源文件和资源合并、转换并输出为浏览器可运行的文件工具
//源代码（多个文件）
//↓
//[打包器处理]
//    ↓
//输出文件（1个或多个 bundle）

//能解决的问题:模块依赖管理,资源处理,代码转换,代码优化：压缩、Tree Shaking、代码分割,浏览器兼容
//为什么需要打包器? 不支持ES Module(老浏览器) 不支持TS,JSX等;多个小文件请求性能差;不支持CSS预处理器(Sass,Less)
//打包器将模块化代码转换为浏览器可执行格式;合并文件 减少HTTP请求;转换高级语法为兼容代码;优化代码体积和性能

// webpack.config.js
const path = require("path")
module.exports = {
    entry: "./src/main.js",        // 入口
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            // Loader 配置
        ]
    },
    plugins: [
        // Plugin 配置
    ],
    mode: "development",
}

// vite.config.ts (现代化)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createVerify } from 'crypto'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
//HMR 速度快
//生产构建用rollup (适合库打包,tree shaking效果好,输出格式多样（ESM、CJS、UMD）)
//配置简单


//webpack核心概念
{
    // 1. Entry（入口）
    entry: "./src/main.js",
    
    // 2. Output（输出）
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    
    // 3. Loader（加载器）
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    
    // 4. Plugin（插件）
    plugins: [
      new HtmlWebpackPlugin()
    ],
    
    // 5. Mode（模式）
    mode: "development" // 或 "production"
  }

//样式不生效,如何调试确定问题?
// 看computed选项卡 show all styles 绝对定位元素和浮动元素 float:desk 盒类型是block
// 样式计算过程(浏览器渲染管线第2步)
//确定声明值
//层叠
//继承
//使用默认值

//important不是权重 是优先级

//什么是css原子化?优势劣势?
// atomic css css 原子化 
// tailwind css unocss windi css
/*.text-red{
    color:red;
    width:100px;
    padding:10px;
}
.p-6{
    padding:6px;
}
*/

//劣势:吃团队配置 可读性差 但可以通过组件化(css组件化) 打包体积 css tree-shaking;purgeCSS,uncss

//难点在工程化,源码
// 一、工程化为什么是难点？
// 1. 技术栈复杂且快速变化：
//    - 打包工具：webpack, vite, rollup, esbuild, turbopack...
//    - 框架：React, Vue, Angular, Svelte...
//    - 构建配置：Babel, TypeScript, PostCSS, ESLint, Prettier...
//    - 包管理：npm, yarn, pnpm, bun...
//    - 工具链配置复杂，需要理解各种配置文件的作用和相互关系

// 2. 配置复杂且易出错：
//    - webpack.config.js, vite.config.ts, tsconfig.json, .eslintrc, .prettierrc...
//    - 每个项目配置可能不同，需要理解配置原理
//    - 版本兼容性问题：依赖版本冲突、peer dependencies 警告
//    - 路径解析、别名配置、环境变量处理等

// 3. 性能优化：
//    - 代码分割（Code Splitting）、懒加载、Tree Shaking
//    - 打包体积优化、缓存策略、文件指纹
//    - 构建速度优化、HMR（热模块替换）原理
//    - 浏览器兼容性处理、polyfill 策略

// 4. 开发体验与工程化的平衡：
//    - 开发时要求快速热更新，生产时要求体积小、性能好
//    - 源码映射（Source Map）配置
//    - 不同环境（dev/prod/test）的配置差异

// 二、源码为什么是难点？
// 1. 理解底层原理的必要性：
//    - 只有看源码才能真正理解框架/库的工作机制
//    - 面试常问：React 的虚拟 DOM 原理、Vue 的响应式原理
//    - 遇到 bug 时需要追踪到源码层面才能解决
//    - 性能优化需要理解框架内部实现

// 2. 源码阅读的困难：
//    - 代码量大：React 源码 10万+ 行，Vue 3 也是数万行
//    - 抽象层次深：涉及编译、运行时、调度器等复杂概念
//    - 工程化包装：源码经过编译、压缩，可读性差
//    - 概念复杂：Fiber 架构、调度算法、Diff 算法等

// BFF? 作用？
// Backend For Frontend 后端为前端服务 会加中间层 nodejs吞吐量很好+ 最好前端写 清楚哪些API

//用户登录前 确定ta是谁？
// uuid:全局唯一标识符 不可变 不可预测 不可伪造
// 浏览器指纹 fingerprint.js 客户端生成 相对唯一+ 指纹浏览器（收费）（跨境电商 tiktok）
// ip地址 少用 用户可以伪装

//如何设置精准的setinterval？
//为什么不精确？
//1.事件循环模型影响回调执行时机
//2.4ms最小事件（嵌套5层以上后） whatwg wpt.fyi cve-update
//3.失活页面间隔强制调整1s

//1. 根据performance.now通过时间调整间隔偏差
//2.  requestAnimationFrame 渲染桢不受页面失真影响 会受到其他影响 可以和1配合使用
// 3. webworker 不受到失活页面影响 不受渲染桢影响

//如何判断一个属性是否存在？
//1. boolean判定
//2. undefined判定
//3. object.keys() 判断属性是否存在
// 4. Object.hasOwnProperty()  Reflect.hasOwnProperty() 该方法不看prototype
// 5. in    Reflect.has()  看prototype

// 文件指纹是什么？ 前端工程化中有何作用？
// 文件指纹： 用hash/校验和生成的文件唯一标识 该标识对文件内容敏感
/* 以前加版本号 
<script src="main.js?v=1.0.0"></script>
图片 css会加入缓存； html不加入缓存*/


// 箭头函数作用？ 消除二义性
// 八股文问题 简短 一针见血；场景题 项目难点 知无不言

// 何时发生重排＆ 重绘？
/* 重排： 所有对布局树更改，堆布局树的读取 都会引发重排
更改，异步重排 */
dom.style.width='100px';
dom.style.heigtht='100px';
dom.style.border='1px solid red';

//读取，同步重排
dom.style.width='0px';
dom.style.transition='1s';
dom.clientHeight;
dom.style.width='100px';

//布局树和dom树不是一一对应，布局树是dom树的子集

//重绘： 对所有非几何信息读写造成的可见样式的变化引发重绘
//当元素的样式改变不影响布局（不在文档流中的位置和尺寸）时，浏览器重新绘制元素外观
//触发重绘的场景：
//1. 颜色相关：color, background-color, background-image
//2. 边框样式：border-color, border-style, outline-color, outline-width
//3. 阴影：box-shadow, text-shadow
//4. 透明度：opacity (0-1之间)
//5. 可见性：visibility (hidden/visible)
//6. 文本装饰：text-decoration
//注意：重排(回流)一定会触发重绘，但重绘不一定触发重排

//选择结果为true的表达式
/* null instanceof Object  //fasle
1 instanceof Number //false
1 instanceof Object //false
Number(1) instanceof Number //false
Number(1)   //1
new Number(1)   //[Number: 1]
Number(1).__proto__ === Number.prototype //true 原始类型当做对象去使用时候 js做隐式转换 帮助转换成对象
// Number(1)本身返回原始值1，但当访问.__proto__属性时，
// JS引擎会临时将原始值包装成Number包装对象(相当于new Number(1))，这个过程叫做"装箱/Boxing"，包装后的对象.__proto__指向Number.prototype
// 访问完成后，临时对象会被丢弃，不会影响原始的Number(1)值

Number(1) instanceof Number //false
// instanceof检查的是对象原型链，Number(1)返回原始值，不是对象实例
new Number(1).__proto__ === Number.prototype //true   new number(1)是对象
new Number(1) instanceof Number //true
// new Number(1)是Number构造函数的实例，返回Number对象
1..toFixed(2) //"1.00"
// 1.被解析为1.0（浮点数），访问.toFixed时触发隐式装箱,等价于(1).toFixed(2)/Number(1).toFixed(2)
// 其他隐式转换：'hello'.length、true.toString()
*/

//下面哪种动画实现效率最高？
/* 浏览器渲染原理：
主线程：解析->样式计算->布局->分层->绘制
合成线程：分块->光栅化->画
在css动画中改变元素的transform 主线程都不参与 只影响合成线程中的画 最快
*/

//什么是reflect？有什么作用？
/*
可以完成对象基本操作 直接调用基本方法 不用判断类型
*/
const obj = {};
Object.a = 1;
delete Object.a;
Object.setPrototypeOf(obj,null,{a:1});
Object.keys(obj); // obj be ?TOObject(O);let keylist be ?EnumerableOwnProperties(obj,key)；return createArrayFromList(keylist)

// const Object = {
//   a:1, 
//   b:2,
//   get c(){
//     console.log(this);
//     return this.a+this.b;
//   }};

// const handler = new Proxy(obj,{
//   get(target,key,receiver){
//     console.log(key);
//     return Reflect.get(target,key,receiver);
//   }
// });
// handler.c; //1
Object.defineProperty(obj,'a',{
  value:1, 
  enumerable:true,
});

console.log(obj.c); //1 2

//如何实现一个只读属性？
const obj = {
  get name(){
    return 'name';
  }
};
// object.defineProperty(obj,prop,descriptor)
// Object.defineProperty(obj,'a',{
//   value:1,
//   writable:false,
//   enumerable:true,
//   configurable:true,
// });
// console.log(obj.name);

//2. Proxy
const handler = new Proxy(obj, {
  get(){
    return 'name';
  }
})
console.log(handler.name);

obj.name = 'name';
console.log(handler.name);

//3. Object.freeze 对象什么都不能改


//什么时候用webworker？
/* 1.大量CPU密集型任务（大文件上传，图标计算）
2.任务可被独立拆分 （浏览器渲染管线不能被独立拆分）*/

//HTTP2有哪些升级？
/* 二进制分帧：多路复用，优先级，流失传输，hettp对头阻塞；头部压缩，服务器推送*/

/*http1.1队头阻塞：同一个tcp请求下 后到达的请求后响应
浏览器可以开启几个tcp域名进程
function start(){
  for(let i=0;i<100,i++)
  fetch('http:/localhost:7010/api/'+i)
  .then(resp=>resp.json())
  .then(console.log)}
*/

//手写节流函数 类似技能cd；防抖类似回城
function throttle(fn,delay){
  let lasttime = 0;
  return function (...args){
    const now = new Date().getTime();
    if(now - lasttime > wait){
      lasttime = now;
      return fn.apply(this,args);
    }
  }
}

// 闭包？是否造成内存泄漏？
/* 在一个函数环境中，闭包=函数+词法环境 函数内部定义的函数，可以访问函数内部变量 只要产生一个函数都会产生闭包

function m(){
  var a = 1;
  return sub(){
    a;
  }
  return sub;
}
const s = m();


1.持有本该被销毁的函数 造成关联此法环境无法被销毁 函数本身占用空间不多 但是关联此法环境占用空间多
let handler = ()=>{
}

dom.addEventHandler('click',handler);
dom.removeEventHandler('click',handler);

2.（隐蔽内存泄漏点）当多个函数共享此法环境时 导致词法环境膨胀 发生无法访问但无法销毁的数据
function createXXX(){
  const big = 'xxx'; //1个词法环境
  const small = 'x';
  function s1(){
    big; //big依然存在此法环境里 虽然s1被销毁 造成内存泄漏
}
  function s2(){
    small;
  }
  return s2;
  }
  const xxx = createXXX()
*/

//地址栏输入url后按下回车 发生哪些事？
/*
1. URL解析（URL Parsing）：
   - 解析协议（http/https）、域名、端口、路径、查询参数、锚点
   - 检查URL格式是否正确

2. DNS查询（DNS Lookup）：
   - 将域名解析为IP地址
   - 查询顺序：浏览器缓存 -> 操作系统缓存 -> 本地hosts文件 -> DNS服务器
   - 如果使用CDN，可能返回最近的服务器IP

3. 建立TCP连接（TCP Connection）：
   - 三次握手建立TCP连接
   - HTTPS会进行TLS握手（四次握手）建立安全连接

4. 发送HTTP请求（Send HTTP Request）：
   - 浏览器构建HTTP请求报文
   - 包含请求行（方法、路径、协议版本）、请求头、请求体
   - 通过TCP连接发送到服务器

5. 服务器处理请求（Server Processing）：
   - 服务器接收请求并处理
   - 可能查询数据库、执行后端逻辑
   - 生成HTTP响应

6. 接收HTTP响应（Receive HTTP Response）：
   - 浏览器接收响应报文（状态行、响应头、响应体）
   - 状态码：200成功、301/302重定向、404未找到等

7. 解析响应内容（Parse Response）：
   - 根据Content-Type判断资源类型（HTML、CSS、JS、图片等）
   - 如果是HTML，开始解析DOM树

8. 渲染页面（Rendering）：
   a. HTML解析 → DOM树构建
   b. CSS解析 → CSSOM树构建
   c. 合并DOM和CSSOM → 渲染树（Render Tree）
   d. 布局（Layout/Reflow）：计算元素位置和大小
   e. 绘制（Paint）：填充像素信息
   f. 合成（Composite）：将图层合成最终页面

9. 加载其他资源：
   - 解析HTML时遇到link、script、img等标签
   - 并行下载CSS、JavaScript、图片等资源
   - 执行JavaScript代码（可能触发DOM操作、重新渲染）

10. 页面交互：
    - 用户可以与页面交互
    - JavaScript事件处理
    - 可能的后续网络请求（AJAX/Fetch）

内存相关：
- Stack（栈）：存储基本类型变量、函数调用、参数
- Heap（堆）：存储对象、数组等引用类型
  let a = { n: 1 }  // a在栈中存储引用地址，{n:1}对象存储在堆中

性能优化点：
- DNS预解析：<link rel="dns-prefetch" href="//example.com">
- 预连接：<link rel="preconnect" href="https://example.com">
- 资源预加载：<link rel="preload">
- 服务端渲染（SSR）减少客户端渲染时间
- CDN加速资源加载
*/