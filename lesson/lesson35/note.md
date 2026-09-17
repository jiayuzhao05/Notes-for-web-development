

函数本质是封装逻辑 


副作用：其他事导致二次渲染 请求外部数据API 定时器 读写IO 修改DOM 纯函数UI 让函数外部不纯粹 react树之外同步事项

useMemo()

底层CSS：碎片化
tailwind：类似ant design 更灵活 类似砖块的一层 可以调整 可以用这块砖调整
css.module:和css无关 和webpack和vite有关
css 局部作用域  底层CSS:碎片化
类似砖块模块 没法调整 


react继承

render props很老了不要了解 是hooks出现之前复用逻辑

useReducer():状态复杂的useState() 包含子值 下一个状态影响前一个状态

useContext():用户信息跨层级

CSS冲突:全局 式样
pageA.module.css =〉.box =〉 vite => .box12627381218
pageB.module.css =〉.box =〉 vite => .box2121212121