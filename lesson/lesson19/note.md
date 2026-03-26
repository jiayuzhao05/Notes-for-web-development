浏览器打开 API提供语言专用

ts.config如何设置属性？ 不需要每个文件开头都写import react;
//compilerOptions.jsx
'''
{
"compilerOptions": {
"jsx": "react-jsx"
}
}
'''

先获取元素 再改变元素

react 和 vue 实现从event驱动->data驱动
count() setCount() react独家函数

为什么react效率更高 比起传统的js函数?
涉及diff算法 遍历耗时很长

react生成虚拟DOM 在内存中如果遇到状态变化则被替换掉

react编译器作用?
自动帮你做性能优化（自动 memo 化），减少不必要的重新渲染，不用手写 useMemo / useCallback / React.memo

React Native 通过 Metro 使用 Babel

ESLint 集成
React 编译器包含一条 ESLint 规则，用于识别无法优化的代码

memo 高阶组件HOC Higher Order Component
优化性能，特别是对于函数组件 避免不必要的渲染 缓存组件的渲染结果 如果组件的 props 没有变化，则 React 会跳过该组件的重新渲染

渐进式采用

Babel 覆盖

组件
React 组件使用props相互通信

hooks （特殊函数）组件需求的无条件申明
useState，以及任何其他以“use”开头的函数 仅在 React渲染期间可用
use只能在组件的顶层或自己的 Hooks 中调用

门控设置 gating允许使用功能标志在运行时控制编译 对运行 A/B 测试或根据用户群体推出编译器有用
'''
// babel.config.js
module.exports = {
plugins: [
['babel-plugin-react-compiler', {
gating: {
source: 'ReactCompilerFeatureFlags',
importSpecifierName: 'isCompilerEnabled',
},
}],
],
};
'''

React 组件必须以大写字母开头
function Profile(){}

组件渲染其他组件，但绝不能嵌套组件的定义 会很慢 容易出错
当子组件从父组件获取一些数据时，通过 props 传递，不是嵌套定义

props
传递任何 JS 值，包括对象、数组和函数
Props 允许独立地考虑父组件和子组件
组件的属性会随着时间推移而变化

children 特殊 prop 组件标签开闭区间内所有内容

JSX规则
从组件返回多个元素，用单个父标签将它们包裹起来
用<div></div> or <></>

{{}} 在 JSX 中正确表示内联样式对象

<ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>

函数式编程有副作用

react喜欢输写纯函数？一个组件处理多个用户请求
组分纯净 不会干涉其他事情 不应该更改渲染之前存在的任何对象或变量 输入相同输出相同

事件处理函数的跨层级传递（Prop Drilling）

组件的职责分离

e.stopPropagation() 阻止事件冒泡

useState 用内存表示组件的视觉状态 动态元素的数量越少越好
'''
const [index, setIndex] = useState(0);
'''

useReducer 分三步从 React 迁移useState到 Reducers 纯函数
与状态更新函数类似，reducer 在渲染期间运行！

useCallback()缓存函数本身 依赖不变时，多次渲染拿到同一个函数引用，减少子组件因“收到新的函数 prop”而重渲染
'''
const 函数 = useCallback(
() => { /_ 函数体 _/ },
[依赖1, 依赖2]
)
'''

useMemo不会加快首次渲染速度，帮助你避免在更新过程中不必要的工作

useRef()-hook 存「和渲染无关、跨渲染保持同一引用」的值
用途：DOM 引用、上一次的值、定时器/订阅 ID、任意可变对象
修改 ref.current 不会触发重新渲染

useEffect() 「副作用」：渲染完成后执行，返回清理函数
用途：订阅、请求、setInterval/setTimeout、手动操作 DOM、打点（logVisit）
setState 的 setter（例如const [show, setShow] = useState(...)）

setShow()/setFunction() 由 state 更新触发的函数
像setState的sette（const [show, setShow] = useState(...)）

createConnection() 建立连接（如 WebSocket、订阅、服务）
在 useEffect 里调用 createConnection()，在 cleanup 里调用connection.destroy() /connection.close()，避免泄漏

setFunction()
setCount、setShow、setIndex() 取决于给状态给的方法
'''
const[show,setShow]=useState(false);
const[count,setCount]=useState(0);
const [index, setIndex] = useState(0);
'''

logVisit()
onVisit()
「访问/埋点」:在 effect 或事件里调用，记录一次访问

clearInterval()：浏览器/Node 定时器清理 API
React出现在useEffect的cleanup:useEffect里setInterval(...)返回id，cleanup里
clearInterval(id)，避免组件卸载后定时器还跑

非受控组件 vs 受控组件
非受控：具有局部状态的组件 更容易在其父组件中使用，因为它们需要的配置较少 灵活性较差
受控：灵活性大 需要父组件使用 props 对其进行完整配置
每个组件都混合使用本地状态和属性

渲染是纯粹计算过程
渲染（调用）组件后，React 将修改 DOM
初始渲染时， React 将使用appendChild()DOM API 将其创建的所有 DOM 节点显示在屏幕上
对于重新渲染， React 将应用最小必要的操作（在渲染时计算！），使 DOM 与最新的渲染输出相匹配
React 仅在两次渲染之间存在差异时才会更改 DOM 节点

绘制：渲染完成后，React 更新DOM，浏览器会重新绘制屏幕

设置状态只会影响下一次渲染

批处理 UI 只有在事件处理程序及其中的所有代码执行完毕后才会更新

Immer是如何运作的？
Immer提供的是一种称为代理的draft特殊对象，它会“记录”你对它所做的操作。这就是为什么你可以随意修改它的原因！在底层，Immer 会识别出哪些部分发生了变化，并生成一个包含你修改内容的全新对象。

react 中状态不可变

object.assign() “浅拷贝 + 合并”的 API
修改目标对象
'''
Object.assign(目标对象, 来源1, 来源2, ...)
'''

useState(0)：放数字。通常用于计数器、索引
useState('')：放字符串。通常用于输入框的值、文本
useState(false)：放布尔值。通常用于开关、弹窗显示/隐藏
useState([])：放空数组。通常用于列表数据
useState({})：放空对象。通常用于存储包含多个属性的数据（比如用户信息 { name: 'Tom', age: 18 }）。
useState(initialState)：放一个提前定义好的变量。当初始数据比较长或者从外部传入时，直接写变量名更整洁

useState()后 idx(0)current status; idx(1)func updating status

react 处理数组状态 immutablity
数组的开头或末尾加一个新数据 [...arr, newItem]
从数组中去掉某一项（通常根据 id 或 index） filter()
改变数组中某一项的值，其他项保持不变 map()
数组的中间某个指定位置（索引）插入新数据 slice() 配合 ...
对数组进行重新排序或首尾反转 先 [...arr] 拷贝，再 sort/reverse

命令式编程 直接操作DOM
'''
const button = document.getElementById('btn');
const counter = document.getElementById('counter');
let count = 0;
button.addEventListener('click',()=>{
count += 1;
counter.textContent = count;
})
'''

react是声明式写法 描述UI长什么样 用state驱动 关注要的结果
'''
// 声明式：描述 UI 与 state 的关系
function Counter() {
const [count, setCount] = useState(0);
return (
<>
<span>{count}</span>
<button onClick={() => setCount(count + 1)}>+1</button>
</>
);
}
'''

高阶组件 HOC，Higher-Order Component
接收组件 返回增强后组件 类似高阶函数 但作用对象是组件
'''
const higherOrderFunction = (fn)=>(...args)=> fn(...args);
const withSomething = (Component)=>{
return (props)=>{
return <Component{...props}/>
}
}
'''

HOC vs Hooks
hooks 本质是内部实现的函数。但是有实现边界 比如只能在顶部 不能在条件句

ref 保存「和渲染无关、跨渲染保持同一引用」的值
用于聚焦输入框、测量元素尺寸、调用第三方库
可变值：ref.current 不会触发重新渲染
'''
const inputRef = useRef(null);
inputRef.current?.focus();
return <input ref={inputRef}/>
'''

context 在组件树中共享数据 避免层层传递props(prop drilling)
createContext（）创建上下文-> <Context.Provider value={...}> 包裹需要共享数据的子树-> 子组件用useContext()/<Context.Consumer>读取
'''
const ThemeContext = createContext('light');
// 父组件提供
<ThemeContext.Provider value="dark">
<Child />
</ThemeContext.Provider>
// 子组件消费
const theme = useContext(ThemeContext);
'''

react-redux 在react组件里用redux的state和dispatch
'''
const count = useColor(state=>state.count)
const dispatch = useDispatch()
dispatch({type:'INCREMENT'})
'''

portals 把组件渲染到DOM树中另一个结点 不是当前组件的父节点下
场景：模态框、弹窗、提示框、Tooltip
实现：ReactDOM.createPortal(child, container) child是react元素 container是目标DOM节点
央视和层级更易控制（避免被父元素overflow：hidden裁剪）
'''
// 把模态框渲染到 body 下，而不是当前组件内部
ReactDOM.createPortal(
<Modal />,
document.body
);
'''

错误边界
捕获子组件树中JS错误 避免应用崩溃
用class组件实现getDerivedStateFromError 或 componentDidCatch
渲染，生命周期，子组件构造函数中错误
不捕获：事件处理、异步代码、服务端渲染、错误边界自身的错误
'''
class ErrorBoundary extends React.Component {
state = { hasError: false };
static getDerivedStateFromError(error) {
return { hasError: true };
}
componentDidCatch(error, info) {
console.log(error, info);
}
render() {
if (this.state.hasError) return <h1>出错了</h1>;
return this.props.children;
}
}
'''

scheduler 调度延时
react18调度器 控制任务何时执行 实现可中断渲染和优先级调度

最小堆
在react18中的shceduler中 任务优先级队列用最小堆实现
每个任务有过期时间 堆顶是过期时间最小 优先级最高任务
插入 取出 调整优先级都是O(logn) 适合频繁增删任务 保证高优先级先被调度执行

位运算 bitwise
react大量用位运算做标记和状态管理
fiber的flags：placement update deletion等用二进制表示
用 | 合并多个标记 用&检查某个标记
相比对象和数组 更省内存 判断更快

completeWork 工作流程
reconciler中自底向上阶段 在beginwork递归返回时执行
host组件：create/update真实DOM节点
收集effect：徐娅增删改的节点记到effectList
处理子节点 处理children的DOM挂载 属性更新
向上冒泡 把effect链接到父fiber的effectList

流程：beginWork 向下遍历 → completeWork 向上返回并处理 DOM 和 effect

性能优化 & eagerState
react对useState/setState的优化：
同步更新且没有其他待处理更新时 react会立即计算新state
如果新state和当前state相同（用Object.is比较） 跳过本次更新 不调度 不重新渲染
在一次事件处理里多次setState 减少无效更新
// 点击时 setCount(count) 设置相同值 有 eagerState 时，React 会直接跳过这次更新

bailout vs ContextAPI
bailout 提前退出：react在reconcile时 如果发现组件的props和state没有变 会跳过该组件的子树的reconcile 减少计算
contextAPI：context变化让所有消费该context的组件重新渲染 即使他们只依赖其中一小部分数据 消弱bailout的效果 因为“依赖context”的组件在context变化时无法被跳过
context使用不当减少bailout机会 导致不必要渲染

onChange 受控组件 输入框值同步到state
'''
onChange={e => setText(e.target.value)}
'''
e.target.value 输入内容
setText() 更新react state
输入变化->触发onchange->更新state->组件重渲染->输入框显示新值

state 提升 Lifting State Up
多个组件共享一份数据 UI一致 共享的state放到最近的公共父组件中 通过props向下传递 回调向上更新

setVisibleTodos()
更新 todo visible list的state 根据筛选条件/排序结果

getFilteredTodos() 在渲染阶段调用的纯函数

console.timeEnd()
性能测量API 和console.time('label')成对使用 time到timeend耗时
'''
console.time('render')
//... 要测量的代码
console.timeEnd('render'); // 输出: render: 12.5ms
''

setPrevItems()
保存上次的列表数据 对比前后变化或者做动画

setSelection()
保存当前选中项（selectedId） 展示/高亮

渲染时计算派生数据
'''
function List({ items }) {
const [isReverse, setIsReverse] = useState(false);
const [selectedId, setSelectedId] = useState(null);
// Best: Calculate everything during rendering
const selection = items.find(item => item.id === selectedId) ?? null;
// ...
}
'''
selection 在每次渲染时根据 items 和 selectedId 计算，而不是用 useState 或 useEffect 存储
逻辑简单 避免state 和 effect 不同步；数据始终与 props/state 一致；符合 React 的“在渲染中计算派生数据”的推荐做法

navigateTo()
路由跳转 react router等库

onFetched()
数据请求完成后回调 更新state/后续处理

removeEventListener()
移除之前通过 addEventListener 添加的事件监听 在useEffect清理函数中调用 避免组件卸载后仍执行回调
'''
useEffect(()=>{
const handler = () =>{...}
window.addEventListener('resize',handler)
return ()=> window.removeEventListener('resize',handler)
},[])
'''

function组件 vs class 组件
方面 Function 组件 Class 组件
写法 函数，用 Hooks 类，用生命周期
state useState this.state
副作用 useEffect componentDidMount 等
复用逻辑 自定义 Hooks HOC、render props
趋势 当前推荐 逐步被替代

如何从 class 组件转成 function 组件?
state:this.state-> useState
生命周期：componentDidMount → useEffect(() => {...}, [])
更新后逻辑：componentDidUpdate-> useEffect(() => {...}, [依赖])
卸载逻辑：componentWillUnmount → useEffect 的 return 函数
this引用：不需要 直接使用局部变量和函数参数

react-dom：web browser 渲染器
react-native：手机原生平台

react dom 文档对象模型 doc.html(div,title,body,img) 元素->文档对象节点
react 只负责核心 state rfeconciler等 不负责平台 平台差异由各自的渲染器处理

CDN content delivery network 分发网络
把静态资源（JS CSS png）缓存到全球多个节点 用户从最近节点加载 加快访问速度

addEventListener()是 浏览器提供的web api 不是react提供的
react的onclick onchange是对这些原生事件的封装

平时都是 npm install pkg in node_modules

react 脚手架 预置 热更新 开发服务器等配置
快速搭建react项目工具
create react app(cra): npx create-react-app my-app
Vite: npm create vite@latest my-app -- --template react
nextjs:带ssr 路由等react框架

纯函数
相同输出->相同输出
无副作用 不修改外部变量 不发起请求 不操作DOM等
'''
// ❌ 非纯：依赖外部变量
let x = 1;
function addToX(y) {
return x + y; // 输出随 x 变化
}

// ❌ 非纯：有副作用
function setTitle(title) {
document.title = title; // 修改了 DOM
}
'''

react组件为什么要是纯函数？
同样的props->渲染出同样UI
不在渲染中产生副作用（请求 写DOM 订阅）

'''
// ❌ 非纯：渲染时修改外部状态
let count = 0;
function BadComponent() {
count++; // 副作用！
return <div>{count}</div>;
}
// ❌ 非纯：渲染时发起请求
function BadComponent() {
fetch('/api/data'); // 副作用！应放在 useEffect
return <div>...</div>;
}
'''

副作用放在哪里？
事件处理函数 onClick onChange
useEffect：订阅 请求 定时器 DOM操作
'''
function Product({ id }) {
const [data, setData] = useState(null);
// 副作用放在 useEffect
useEffect(() => {
fetch(`/api/product/${id}`)
.then(res => res.json())
.then(setData);
}, [id]);

// 渲染部分保持纯
return data ? <div>{data.name}</div> : <div>Loading...</div>;
}
'''

Uncaught SyntaxError: Cannot use import statement outside a module
type="module" esm

# react本质是什么?  
用状态驱动 UI 的声明式视图库
不用手动改DOM UI拆开组件化(函数)
state/props变化->触发重新渲染->得到新的UI描述
最小更新:用调和（reconciliation）比较新旧结果，只对真实 DOM 做必要修改

# createElement如何创建元素? 创建的元素两种不同写法?
描述UI元素的底层API JSX被编译成它
'''
React.createElement(type, props, ...children)

const el = React.createElement(
  'h1',
  { className: 'title' },
  'Hello React'
)

const element= <div id="box">Hi</div>

function APP() {
    return React.createElement('hi',null,'Hello')
}

function App() {
    return <h1>Hello</hi>
}

React.createElement('p', null, 'text')

React.createElement(
    'ul',
    null,
    React.createElement('li',null,'A')
    React.createElement('li', null, 'B')
)
'''

JSX 是语法糖：写起来像 HTML，最终会被编译成 JS 函数调用
语法糖:编译/转换后 运行的还是底层语法
语法糖  →  编译器/转换器  →  底层等价语法  →  浏览器/引擎执行
JSX → Babel/SWC 编译 → createElement 或 jsx() → 浏览器执行
有些语法糖浏览器已经原生支持了（如箭头函数、解构、模板字符串），现代浏览器直接就能跑，不需要再转;有些语法糖浏览器不认识（如 JSX、TypeScript），必须先编译才能跑

新的runtime:把 JSX 编译到 react/jsx-runtime，不再依赖 React.createElement，因此多数情况下不需要每个文件 import React

原生JS改掉reactDemo counter


无条件命令式更新
DOM 命令式方法
样式改变JS初始值 改变页面视图和方法

V8引擎->运行方式—>
浏览器解析HTML react没有标签<p><span> 映射成<p> 创建react-DOM  生成虚拟DOM（JS 对象）→ React DOM 再用浏览器 API 把它变成真实 <p>/<span> → 渲染引擎画到屏幕上

type是什么-> v8引擎 -> 运行方式-> 只支持JS

react DOM属性包括事件 属性属于对象

createRoot() react18 的新 api 创建react 根节点 渲染 react 组件树

babel和esmodule只需要选一个


CDN网址获取npm包和其他静态资源
https://unpkg.com/
https://esm.sh/
https://www.jsdelivr.com/ 

生成器函数
function* idGen() {let id=0;while(true) yield ++id;}

const it = {
    cur:0,
    next(){return this.cur<3?{value:this.cur++,done:false}:{done:true};},
    [Symbol.iterator](){return this}
}

for(const v of it) {console.log(v)}

function* range(a,b,step=1){
    for(let i=a;i<b;i+=step) yield i;
}

console.log([...range(0,5)])


class Animal{
    constructor(name){this.name=name}
    speak(){console.log(`${this.name}makes a nois.`);}
    static create(name){return new Animal(name);}
}

class Dog extends Animal{
    #hp=100;
    constructor(name){super(name)}
    speak(){console.log(`${this.name}barks.`);}
    get hp(){return this.#hp;}
    set hp(){this.#hp = Math.max(0,v);}
}


安全获取深层属性
const get = (obj,path,dft)=>{
    return path.split('.').reduce((o,k)=>(o?.[k]),obj)??dft;
}

html5 新元素
语义化标签 <header>、<footer>、<nav>、<main>、<section>、<article>、<aside>

功能化标签<video>、<audio>,<canvas>,<input type="date/email/range/..."> <details> / <summary>

语义化 用有意义的标签描述内容结构
<header>
  <nav>...</nav>
</header>

dom 操作 用 JS 操作页面元素 增删改查
'''
// 查
document.getElementById('box')
document.querySelector('.item')
// 改
el.textContent = 'new text'
el.style.color = 'red'
el.setAttribute('class', 'active')
// 增
const div = document.createElement('div')
parent.appendChild(div)
// 删
parent.removeChild(child)
'''
react本质是自动帮做 DOM 操作 不用手动

执行上下文 js 代码执行的运行环境 每次调用函数创建一个新的执行上下文
全局执行上下文
函数执行上下文
eval 执行上下文

每个执行上下文都有 变量环境（var 声明的变量、函数声明） 词法环境（let/const 声明的变量） this 绑定
执行上下文按照调用顺序放入调用栈 执行完弹出

作用域链
变量查找机制：从当前作用域开始 沿着外层作用域一层层往上找直到全局
函数定义时已经确定作用域链（词法作用域 / 静态作用域）不是调用时（closure） 

es5 数组 api 给数组加的常用方法 不修改原数组（除了 sort/splice 等）

es6+ promise generator
generator 用 function*和 yield暂停和恢复函数
'''
function% gen(){
    yield1
    yield2
}

const g = gen()
g.next() //{value:1,done:false}
'''


es2016 async await 
异步看起来像同步的语法糖
'''
async function getData(){
    const res = await fecth('/api')
    const data = await res.json()
    console.log(data)
}
'''

http 协议 浏览器和服务器通信规则 请求-响应模型：浏览器发请求（GET/POST/PUT/DELETE...），服务器返响应（状态码+数据）

缓存
强缓存：Cache-Control、Expires->没过期直接用本地缓存
协商缓存：ETag/Last-Modified -> 先问服务器“资源变没“，没变返回 304 用本地的

跨域 CORS
同源策略：协议+域名+端口一致 否则请求被拦
cross-origin resource sharing：服务端设响应头Access-Control-Allow-Origin 来允许跨域

cookie session
cookie：存在浏览器端小数据 每次请求都自动带（比如登录凭证）
session：存在服务端的用户对话数据 通过 cookie 的 session ID 关联

jwt JSON web token
无状态的认证方案 服务端把用户信息加密成 token 发给前端 前端每次请求带上 token 服务端验证 token 不需要在服务端存 session


ajax
异步请求 不刷新页面就能和服务器交换数据 通过XMLHttpRequest fetch axios 实现

https：oauth2  websocket
HTTP + TLS/SSL 加密，数据传输加密，防窃听、防篡改
OAuth2：第三方授权协议
websocket：全双工通信 建立连接后服务器主动推送信息给浏览器 用来聊天 实时通知 协同编辑 股票行情

库 
lodash JS 工具函数库（防抖 深拷贝 数组/对象操作）
bootstrap  CSS UI 框架 快速搭建响应式页面
easyui  jQuery 时代 UI 组件库（后台管理）
layui 国产轻量 UI 框架（后台管理）
mockjs  模拟假数据 前后端联调前用来 mock 接口
echarts 百度出的图表库（可视化）

工程化 框架  
less/sass css 预处理器：支持变量 嵌套 混入 函数 写完编译成普通 css
'''
$color:#333;
.box{
    color:$color;
    .title{font-size:16px;}
}
'''
postcss  css后处理器 对已有 css 做转换
常见插件
Autoprefixer 自动加浏览器前缀（-webkit-、-moz- 等）
cssnano 压缩 css

服务端  web 服务器 
express  nodejs 框架
koa  express 原班人马做的 基于 async/await更轻量

egg 阿里出的框架 基于 koa 约定优于配置
nestjs

ssr  react ssr/
server-side rendering
服务端渲染 服务端生成 html 发给浏览器 而不是浏览器端用 js 渲染
react ssr 用 nextjs 实现