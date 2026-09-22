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

COT是prompt enginering design 不是底层设计 只是推理策略

react render:函数组件是render过程 useState()会触发更发 react会集成更新 重新调用并执行一次 函数组件重新执行代表DOM重新创建 react故意执行两次检测是否有不纯洁组件 是否有副作用

render是计算阶段


react tree: UI=func(props,state) 
函数组件核心：输入 props/state（+ Hooks），输出 UI 描述
- 输入：props、useState/useReducer 的状态、useContext 等
- 输出：JSX（React Element 描述），不是直接操作真实 DOM

render->(re-render)新/旧DOM对比->commit->修改DOM树
1. **Render 阶段（计算 / Reconciliation）**
   - 首次：mount，调用组件函数，得到 Element 树
   - 更新：父或自身 state/props/context 变化 → 再次调用组件函数 → 得到新的 Element 树
   - 与上一帧的 Element 树做 diff（虚拟 DOM 对比）
   - 此阶段不直接改真实 DOM

2. Commit 阶段
   - 把 diff 结果应用到真实 DOM（只改有变化的部分）
   - 浏览器 layout / paint

- 组件函数重新执行 ≠ 真实 DOM 全部重建
- React 只在两次渲染结果有差异时才改 DOM 节点

`<StrictMode>` 下开发模式可能故意 mount → unmount → remount，用来查副作用

UI=func(props,state)

会性能优化的情形:
pureComponent: 类组件  函数组件对应React.memo
上下文: 全局context  context变回让消费组件更难跳过重渲染
class——>forceUpdate 强制重渲染 绕过优化 不是性能优化

| 手段 | 适用 | 作用 |
|------|------|------|
| `React.PureComponent` | 类组件 | props/state 浅比较没变 → 跳过更新 |
| `React.memo` | 函数组件 | 同上，相当于 PureComponent |
| `useMemo` | 函数组件 | 缓存计算结果 |
| `useCallback` | 函数组件 | 缓存函数引用，配合 memo 子组件 |
| 状态下沉 / 组合 | 通用 | 把 state 放在真正需要的子树，减少波及范围 |


父组件rerender会导致子组件rerender 不管有没有props
默认再执行子组件:props没变时可用memo/PureComponent跳过


### bailout（提前退出）
reconcile 时若发现 props/state **没变**（且满足条件），可**跳过**该组件子树的 reconcile → 少算、少 diff。
PureComponent / React.memo 就是在帮 React 做这件事。

### Context 与性能（不是「优化手段」）
- Context 用于**跨层传数据**，不是专门用来优化性能的
- **Provider 的 value 变化** → 所有 `useContext` 该 Context 的组件都会 re-render
- 即使用户只用到 value 里一小部分，也可能整组件重渲染 → **削弱 bailout**
- 做法：拆 Context、memo 子组件、状态下沉，避免「一个大 Context 包一切」

### forceUpdate（不是优化）
- 类组件：`this.forceUpdate()`
- **强制**本组件 re-render，**绕过** `shouldComponentUpdate` / PureComponent
- 用于特殊场景，**不是**性能优化工具
### 父 → 子重渲染（准确表述）
- 默认：父 re-render → 子也会 re-render（会再执行子组件）
- 若子包了 `React.memo` / `PureComponent` 且 props **浅比较相等** → 可**跳过**子组件 render
- 所以不是「不管 props 一定重渲染」，而是「默认会，优化后可跳过」