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

// 代码输出是什么？
var x = 1,
  y = 2;
var z = function () {
  var x = 2; // 局部变量，遮蔽全局x
  return {
    x, // 对象属性x，创建时值为2（值拷贝）
    y(a, b) {
      x = a + b; // 通过闭包访问局部变量x，并修改它
    },
    z() {
      return x; // 通过闭包返回局部变量x的值
    },
  };
};
var a = z();
a.y(x, y); // 传入全局x(1)和全局y(2)，闭包中的x变为3
console.log(a.z(), a.x, x); 
// 输出：3, 2, 1
// a.z() 返回闭包中的x = 3
// a.x 返回对象创建时的x = 2（值拷贝，不会变）
// x 返回全局变量x = 1

// 关键点：
// 1. 对象属性x是值拷贝，创建时是2，之后不变
// 2. 方法y和z中的x通过闭包引用局部变量x，可以修改
// 3. 全局x和局部x是不同变量，互不影响


//上传文件展示上传速度？
/*XMLHttpRequest
浏览器支持：fetch 不行
xhr.upload.adEventListner('progress',e=>{}){}
promise没有中间状态 只有成和不成
    */

//创建webworker时如何不指定特定文件？
const code = console.log('worker');

//1.object url 不用新开文件指定文件 和方法2效果完全相同 在工程化中不希望打包时出现大量worker文件，将其压缩到一个文件中
const blob = new Blob([code],{type:'application/javascript'});
const url = URL.createObjectURL(blob);
console.log(url)
const worker = new Worker(url);
//2.data url
const dataURL = `data:application/javascript,base64,${encodeURLComponent{code}}`;
const worker = new Worker(url);

//如何清理源码里没有被应用的代码 主要是js，ts，css代码？
/* 只针对js代码 单模块 ESLint,Terser:文件->AST->分析语法树->删除没有被应用的代码->生成新的AST->新的语法树->生成新的代码
tree-shaking  多模块 支持js不支持css 必须是esm 静态分析 cms（动态模块化语言）动态搞不定
PurgeCSS(css 原子化) 针对css不支持js 没有被应用代码清理掉
自定义 如果陈旧工程太多问题 自己写脚手架
*/

//下面哪些属于cookie属性？ httponly secure samesite path
/*
补充属性：键值对 expires/max-age
*/

//实现数组转树？
function arrayToTree(arr){
  // to do
  const map = new Map();
  for(const item of arr) {
    //找到父节点 O（n）-> O（1）
    map.set(item.id,item);
  }
  const roots = []; //根节点数组
  for(const item of arr) {
    //找到item父节点
    if(item.parent === null) {
        roots.push(item);
    }
    else{
        const parent = map.get(item.parent);
        if(!parent.children) {
            parent.children = [];
        }
        parent.children.push(item);
    }
    return roots;
}
}

arrayToTree([
  { id: 1, value:1, parent: null },
  { id: 2, value:2, parent: 1 },
  { id: 3, value:3, parent: 2 },
  { id: 4, value:4, parent: 1 },
])


//下面代码输出什么？Vue watch 如何监听多个响应式对象？响应式相关题目 敲响应式源码一遍
import { watch, reactive } from 'vue';

const state = reactive({
  a: 1,
  b: 2,
  c: 3,
});

watch( //控制台：3
  () => {
    console.log(state.a + state.b);
    return state.a + state.b; //function1:3 最后运行2次
  },
  (val) => { //只有当运行上面函数结果不一样才运行这个函数 所以最后这个函数不运行
    console.log(val);
  },
  {
    immediate:true,
  }
);

setTimeout(() => {
  state.a++;
  state.b--;
  //state.c++; //如果只有这行，则只输出3
}, 1000);
// 3 3


// 输出什么？
const s = '123'; //原始类型 没有属性 可迭代对象（实现Symbol.iterator方法）
s.c = '4'; //产生的临时string对象 设置属性 并立即丢弃临时对象
s.d = '5'; //产生的临时string对象 设置属性 并立即丢弃临时对象
const [a, b] = s; //自动装箱 原始类型无法解构 当成对象用 类似const [a, b] = string(s)
const { c, d } = s; //隐式类型转换 类似const { c, d } = string(s)
console.log(a); //1 a获得第一个字符'1'
console.log(b); //2 b 获得第二个字符 '2'
console.log(c); //undefined s.c没有被保存 无法提取c属性
console.log(d); //undefined s.d没有被保存 无法提取d属性


//获取元素尺寸有多少中方式？区别是什么？
/*
1.dom.style.width/height 获取dom cssom树 不回流 dom.dataset.xxx '3em'
2.getComputedStyle(dom) 计算后的样式 '48px'
3.offsetWidth scrollWidth clientWidth 布局树中信息 没有单位 '28'
4.dom.getBoundingClientRect() 视觉尺寸 没有单位 '320' 视觉尺寸和布局树中信息不一致
*/

// 当QPS达到峰值时，如何处理？ QPS QUeries Second 
/*
前端做法
缓存：本地缓存 服务器缓存 CDN预热
合并请求：雪碧图...
懒加载
用户体验：提示 loading 体感优化

后端扩容
数据库优化：sql优化 索引 读写分离
负载均衡
监控报警
*/


//有A、B和C三个作业同时到达，执行时间分别为4,3,6，且在系统中以单道方式运行，则可以获得最短的平均周转时间的执行顺序为(    )。
/*
BAC

周转时间=等待时间+执行时间
平均周转时间：总周转时间/任务数
SJF shortest job first 最短任务优先
*/

//img可见宽度多少？
<style>
* { box-sizing: border-box; }
div, a, img { border: 5px solid; padding: 10px;}
div{ width: 500px; }
a { width: 300px; }
img { width: 100%; }
</style>

<div>
  <a>
    <img>
  </a>
</div>
</body>
/*css重点只有2个：视觉格式化模型，样式计算
500-10-10-10=470
*/

//如何遍历树的前序 中序 后序？
// 在线计算器（少用eval 容易攻击注入；用逆波兰表达式）或者其他编译器 用后序居多

//AST是什么？在前端有哪些应用场景？
/*
abstract syntax tree 抽象语法树 用源代码转换成树形结构
应用：
转换代码
babel
less/sass
构建工具
压缩和混淆
自定义转换方式
ESLint, Babel, 构建工具(webpack,swc,esbuild)
*/

//同一个url地址 如何实现手机打开是移动端页面 电脑打开是web页面？
/*www.abc.com
流体布局 100% 相对单位 rem flex grid 1fr

media query 媒介查询
1.css判断 js逻辑(matchmedia)
2.差异化越大 开发维护成本越大
3.打包体积
适合差异化小站点 

独立开发 独立部署 服务器判断请求头 user-agent 
*/

//网络调试重点去学

//浏览器如何知晓服务器传递资源类型（js，css，图片等）？
/*
响应头中的 content-type 
不能看后缀 后缀可以伪造
*/

//有哪些跨域方案？真实项目中如何选择？
/*
cors （JSONP太古老）
代理

保持生产环境和开发环境一致
生产环境有没有ajax跨域问题？ 没有则两个环境无需处理
是否需要支持古老浏览器？ Y：生产和开发用JSONP N：生产和开发用CORS
*/

//如何用JS判断多行文本溢出位置？
//options:包含字体大小 字体类型 行高等影响溢出位置信息
function exceedIndex(str,options){
}

/* 
通过font-size计算 算不出来
font-size:16px; //px代表英文顶行和底行高度
写入canvas  measureText(text) y有几行不好算 行的截断位置
创建div盒子 //visibility:hidden display:none
getComputedStyle

//后端响应巨量数据 如何避免性能问题？
/*
网络性能：
const resp =await fetch("xxx");
await resp.json();

sse(server-sent events)
websocket(改服务器)
渲染性能：
分页（产品同意）
分片渲染（react fiber）
虚拟滚动
canvas （交互行为太多 canvas也困难））
*/

//页面有100w个任务需要执行 如何保证页面不卡顿？
/*
requestAnimationFrame
requestIdlCallbak
webworker
postmessage
凡是涉及卡顿问题 给浏览器留时间渲染
*/

//死循环会导致什么后果？无限递归导致什么后果？
/*
考察浏览器进程模型 eventloop
死循环：阻塞 浏览器卡死 无响应
无限递归：栈溢出
while(1){}

V8引擎没有尾递归优化
JS只有变量（stack）和对象（heap）占用内存 
只要调用函数 出现执行上下文
*/

//JS不存在引用传递 都是复制粘贴 值传递


//JS作用域有哪些？
/*全局作用域 函数作用域 块作用域  
模块作用域 type=module
脚本作用域 script type=text/javascript
catch作用域 里面定义的函数很怪
eval作用域
with作用域
*/

//下载不一定在文档解析完成后发生 有预下载线程；执行在文档解析后发生

//箭头函数没有自己的this 继承上层作用域的this 类似其他普通变量 因此也不存在通过call()等方法绑定它的this值
//箭头函数内部use strict 不能用arguments对象；可以根据前面变量名和属性名推断出同名name属性

//若进栈序列为1，2，3，4，5，6，进栈和出栈穿插进行 不可能出现的出栈序列是？ 栈先出后进
// A: 2,4,3,1,5,6  ✅可能
// B: 3,2,4,1,6,5  ✅可能  
// C: 2,3,5,1,6,4  ❌不可能（答案）
// D: 4,3,2,1,5,6  ✅可能

// 最实用的快速判断方法（针对选择题）：
// 找出序列中"逆序对"：
//如果一个大数出栈后，后面出现了比它小且在原序列中在它前面的数，且这个小数不在栈顶，则序列不可能

//cookie和session
/* session数据保存在服务器；会话cookie关闭浏览器后直接销毁；session安全性比cookie高；cookie被进制时还可以通过header将session id传递回服务器
单点登录：cookie+session 对服务器压力大 大企业居多
JWT 小企业居多 分布式方案 对服务器压力小 只需要验证token
*/

// son instanceof func1; instanceof判断是否存在原型链

//有多个IP地址 如何在最短时间内找出RTT最小的IP（要求并发数最大为10）？
/*
round-trip time 请求-收到响应 往返时间

策略：分批并发 + 滑动窗口
1. 将IP列表分批，每批最多10个（并发限制）
2. 使用Promise.all并发执行一批请求
3. 记录每批的RTT结果
4. 找到最小的RTT对应的IP

优化策略：
- 如果只需要找到最小的，可以考虑提前返回（找到很小值后不再等待）
- 但如果要保证准确，需要等待所有请求完成
- 使用超时机制避免单个请求阻塞太久
*/

// 方法1：分批并发（基础版本）
async function findMinRTTIP_Batch(ipList, maxConcurrent = 10) {
  const results = []
  
  // 分批处理
  for (let i = 0; i < ipList.length; i += maxConcurrent) {
    const batch = ipList.slice(i, i + maxConcurrent)
    
    // 并发请求一批IP
    const batchResults = await Promise.all(
      batch.map(async (ip) => {
        const start = Date.now()
        try {
          await fetch(`http://${ip}`, { signal: AbortSignal.timeout(5000) })
          const rtt = Date.now() - start
          return { ip, rtt, success: true }
        } catch (error) {
          return { ip, rtt: Infinity, success: false }
        }
      })
    )
    
    results.push(...batchResults)
  }
  
  // 找到RTT最小的IP
  const validResults = results.filter(r => r.success)
  if (validResults.length === 0) return null
  
  return validResults.reduce((min, curr) => 
    curr.rtt < min.rtt ? curr : min
  )
}

// 方法2：使用信号量控制并发（推荐）
async function findMinRTTIP_Semaphore(ipList, maxConcurrent = 10) {
  const semaphore = Array(maxConcurrent).fill(null)
  let available = maxConcurrent
  const results = []
  
  async function acquire() {
    while (available === 0) {
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    available--
  }
  
  function release() {
    available++
  }
  
  async function measureRTT(ip) {
    await acquire()
    try {
      const start = Date.now()
      await fetch(`http://${ip}`, { signal: AbortSignal.timeout(5000) })
      const rtt = Date.now() - start
      return { ip, rtt, success: true }
    } catch (error) {
      return { ip, rtt: Infinity, success: false }
    } finally {
      release()
    }
  }
  
  // 所有请求并发，但受信号量控制
  const promises = ipList.map(ip => measureRTT(ip))
  const allResults = await Promise.all(promises)
  
  const validResults = allResults.filter(r => r.success)
  if (validResults.length === 0) return null
  
  return validResults.reduce((min, curr) => 
    curr.rtt < min.rtt ? curr : min
  )
}

// 方法3：使用队列控制并发（更优雅）
class ConcurrencyLimiter {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent
    this.running = 0
    this.queue = []
  }
  
  async execute(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject })
      this.process()
    })
  }
  
  async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return
    }
    
    this.running++
    const { task, resolve, reject } = this.queue.shift()
    
    try {
      const result = await task()
      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      this.running--
      this.process()
    }
  }
}

async function findMinRTTIP_Queue(ipList, maxConcurrent = 10) {
  const limiter = new ConcurrencyLimiter(maxConcurrent)
  
  async function measureRTT(ip) {
    return limiter.execute(async () => {
      const start = Date.now()
      try {
        await fetch(`http://${ip}`, { signal: AbortSignal.timeout(5000) })
        const rtt = Date.now() - start
        return { ip, rtt, success: true }
      } catch (error) {
        return { ip, rtt: Infinity, success: false }
      }
    })
  }
  
  const results = await Promise.all(ipList.map(ip => measureRTT(ip)))
  const validResults = results.filter(r => r.success)
  
  if (validResults.length === 0) return null
  
  return validResults.reduce((min, curr) => 
    curr.rtt < min.rtt ? curr : min
  )
}

// 方法4：提前返回优化（找到很小值后可以提前结束）
async function findMinRTTIP_EarlyReturn(ipList, maxConcurrent = 10, earlyThreshold = 50) {
  let minRTT = Infinity
  let bestIP = null
  const semaphore = Array(maxConcurrent).fill(null)
  let available = maxConcurrent
  let completed = 0
  
  async function measureRTT(ip) {
    await acquire()
    try {
      const start = Date.now()
      await fetch(`http://${ip}`, { signal: AbortSignal.timeout(5000) })
      const rtt = Date.now() - start
      
      if (rtt < minRTT) {
        minRTT = rtt
        bestIP = ip
        // 如果RTT很小，可以考虑提前返回（但这里为了准确性，还是等所有完成）
      }
      return { ip, rtt, success: true }
    } catch (error) {
      return { ip, rtt: Infinity, success: false }
    } finally {
      release()
      completed++
    }
  }
  
  // ... (acquire/release 函数同方法2)
  
  await Promise.all(ipList.map(ip => measureRTT(ip)))
  return bestIP ? { ip: bestIP, rtt: minRTT } : null
}

// 实际使用示例
const ipList = ['192.168.1.1', '192.168.1.2', '10.0.0.1', /* ...更多IP */]
const result = await findMinRTTIP_Semaphore(ipList, 10)
console.log(`最小RTT的IP: ${result.ip}, RTT: ${result.rtt}ms`)

// 1. 并发控制：使用信号量/队列限制同时进行的请求数
// 2. 超时处理：避免单个请求阻塞太久（如5秒超时）
// 3. 错误处理：失败的IP标记为Infinity，不影响结果
// 4. 性能优化：方法2和方法3比方法1更高效，不会等待整批完成才开始下一批
// 5. 时间复杂度和空


//css样式计算过程？
/*
1. 确认声明值
2. 层叠冲突：确定优先级；特殊性（权重）；源次序
3. 继承
4. 使用默认值
*/

//哪些情况触发reflow？
/*
修改元素宽高属性
给元素设置display：none
给元素设置position：absolute

仅仅优化seo 简单渲染 可以直接用无头浏览器 
*/

//console.log([1<2<3,3<2<1]); //[true,true]

//列表分页，快速翻页下的竞态问题？
/*
请求顺序不代表收到响应的顺序 
取消上一次请求
let xhr = null

function request_XHR(url) {
  // 取消上一次请求
  if (xhr) {
    xhr.abort()
  }
  
  // 发出这一次请求
  xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.send()
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log(xhr.responseText)
    }
  }
}
*/

/*defer：异步加载 不阻塞解析 解析完成后按顺序执行
async：不阻塞解析 下载完成后立即执行
prefetch：立即加载
preload：
*/

//页面加载后发生大量的ajax请求 如何优化？
/*
1.请求队列（优先级）
2.缓存 幂等性
3.压缩 GZIP
4.CDN分发
5.多域名并发
6.BFF
7.HTTP2.0 兼容型浏览器
*/

//哪种方案组合不合理？
/*
less+ css modules √
BEM+postcss √ postcss本身不解决类名冲突问题
BEM+css in js × css in js不存在类名 所以自动解决类名冲突 二者功能有重叠点
BEM：css类名命名规范 为了避免类名冲突和类名语义化
*/

//如果一个包修复了一些bug 对版本号改动 应该改动（补丁版本号） 架构基建涉及版本号管理

//文件上传表单字段，上传文件本质是http请求
//表单字段名是键值对里的键 
POST/api/login HTTP/1.1
Host: localhost:3000
Content-Type: multipart/form-data;boundary=aaa

//表单格式不一定是multipart/form-data 要看接口格式

//A instanceof B； A.prototype是否出现在B的原型链上
/*
Object.keys() 不能遍历出对象原型链上属性
使用Object.assign(obj1,obj2) 可以实现对象浅拷贝
for in 循环遍历对象自身和原型链上可枚举属性
*/

// Promise 执行顺序 某些状态下一个promise吸收另一个promise状态 微队列（A吸收B）
const p1 = Promise.resolve(1)
const p2 = new Promise(resolve => resolve(p1))
p2.then(() => {
  console.log(2)
})
p1.then(() => {
  console.log(1)
}).then(() => {
  console.log(4)
})
console.log(3)

//p1： f 1
//p2： p
//控制台：3