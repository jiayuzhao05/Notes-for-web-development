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
  () => { /* 函数体 */ },
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

react-redux

portals

错误边界

scheduler 调度延时

最小堆

位运算

completeWork 工作流程

性能优化
eagerState

bailout vs ContextAPI

onChange
'''
onChange={e => setText(e.target.value)}
'''

state 提升

setVisibleTodos()

getFilteredTodos()

console.timeEnd()

setPrevItems()

setSelection()

function List({ items }) {
const [isReverse, setIsReverse] = useState(false);
const [selectedId, setSelectedId] = useState(null);
// ✅ Best: Calculate everything during rendering
const selection = items.find(item => item.id === selectedId) ?? null;
// ...
}

navigateTo()

onFetched()

removeEventListener()

function组件 vs class 组件

如何从 class 组件转成 function 组件

react-dom：web browser 渲染器
react-native：手机原生平台

react dom 文档对象模型 doc.html(div,title,body,img) 元素->文档对象节点
react 只负责核心 不负责平台

CDN 分发网络

addEventListener()是 web api

平时都是 npm install pkg in node_modules

react 脚手架
