函数本质是封装逻辑

副作用：函数执行时，影响了 React 组件树之外的东西 react树之外同步事项
请求外部数据API 定时器setInterval / setTimeout 读写localStorage /file IO 修改DOM（非 React 管理） 修改函数外部的变量 订阅 WebSocket
纯函数UI 让函数外部不纯粹

useMemo(): 缓存计算结果，依赖不变就复用上次的值，避免重复昂贵计算

底层CSS：碎片化
tailwind：类似ant design 更灵活 类似砖块的一层 可以调整 可以用这块砖调整
css.module:和css无关 和webpack和vite有关
css 局部作用域 底层CSS:碎片化
类似砖块模块 没法调整

react继承

render props很老了不要了解 是hooks出现之前复用逻辑

useReducer():状态复杂的useState() 包含子值 下一个状态影响前一个状态

useContext():跨层级共享数据，避免 props 一层层传（prop drilling）

CSS冲突:全局 式样
pageA.module.css =〉.box =〉 vite => .box12627381218
pageB.module.css =〉.box =〉 vite => .box2121212121

react render:函数组件是render过程 useState()会触发更发 react会集成更新 重新调用并执行一次 函数组件重新执行代表DOM重新创建 react故意执行两次检测是否有不纯洁组件 是否有副作用

render是计算阶段
