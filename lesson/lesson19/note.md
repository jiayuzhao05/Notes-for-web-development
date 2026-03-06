浏览器打开 API提供语言专用

ts.config如何设置属性 不需要每个文件开头都写import react;

先获取元素 再改变元素

react 和 vue 实现从event驱动->data驱动
count() setCount() react独家函数

为什么react效率更高 比起传统的js函数?
涉及diff算法 遍历耗时很长

react生成虚拟DOM 在内存中如果遇到状态变化则被替换掉

react编译器作用?

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

门控设置 gating允许使用功能标志在运行时控制编译 对运行 A/B 测试或根据用户群体逐步推出编译器有用
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

组件可以渲染其他组件，但绝不能嵌套组件的定义 会很慢 且容易出错
当子组件需要从父组件获取一些数据时，应该通过 props 传递，而不是嵌套定义


props
传递任何 JS 值，包括对象、数组和函数
Props 允许独立地考虑父组件和子组件
组件的属性会随着时间推移而变化

children 特殊 prop 组件标签开闭区间内的所有内容


JSX规则
从组件返回多个元素，请用单个父标签将它们包裹起来
用<div></div> or <></>

{{}} 是在 JSX 中正确地表示内联样式对象
<ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>

函数式编程有副作用

react 喜欢输写纯函数？ 这样一个组件可以处理多个用户请求

组分纯净 不会干涉其他事情 不应该更改渲染之前存在的任何对象或变量 输入相同输出相同


事件处理函数的跨层级传递（Prop Drilling） 


组件的职责分离


e.stopPropagation() 阻止事件冒泡


useState
'''
const [index, setIndex] = useState(0);
'''

渲染是纯粹计算过程
渲染（调用）组件后，React 将修改 DOM
初始渲染时， React 将使用appendChild()DOM API 将其创建的所有 DOM 节点显示在屏幕上
对于重新渲染， React 将应用最小必要的操作（在渲染时计算！），使 DOM 与最新的渲染输出相匹配
React 仅在两次渲染之间存在差异时才会更改 DOM 节点

绘制：渲染完成后，React 更新了 DOM，浏览器会重新绘制屏幕

设置状态只会影响下一次渲染

批处理 UI 只有在事件处理程序及其中的所有代码执行完毕后才会更新

Immer是如何运作的？
Immer提供的是一种称为代理的draft特殊对象，它会“记录”你对它所做的操作。这就是为什么你可以随意修改它的原因！在底层，Immer 会识别出哪些部分发生了变化，并生成一个包含你修改内容的全新对象。

react 中状态不可变

object.assign()

useState(0)：放数字。通常用于计数器、索引
useState('')：放字符串。通常用于输入框的值、文本
useState(false)：放布尔值。通常用于开关、弹窗显示/隐藏
useState([])：放空数组。通常用于列表数据
useState({})：放空对象。通常用于存储包含多个属性的数据（比如用户信息 { name: 'Tom', age: 18 }）。
useState(initialState)：放一个提前定义好的变量。当初始数据比较长或者从外部传入时，直接写变量名更整洁

useState()后 idx(0)current status; idx(1)func updating status

react 处理数组状态 immutablity
数组的开头或末尾加一个新数据  [...arr, newItem]
从数组中去掉某一项（通常根据 id 或 index） filter()
改变数组中某一项的值，其他项保持不变   map()
数组的中间某个指定位置（索引）插入新数据  slice() 配合 ...
对数组进行重新排序或首尾反转  先 [...arr] 拷贝，再 sort/reverse
