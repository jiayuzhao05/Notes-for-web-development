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


react里return <div></div> （react.createElement）

伪类和伪元素无关
伪类：:active() :focus() :focus-within() :focus-visible() :target()
伪元素 ::before()   ::after()

伪元素让CSS能像HTML一样构建内容 让CSS也可以添加假肢

函数是组件 是render一次的逻辑过程
state是react重新执行
重新调用函数组件

react中用<strictmodel>开发检查副作用问题 所以有时候执行App()会执行函数两次
如果放在useEffect() 只会调用一次
调用App()->新JSX->和旧JSX比较（diff）->commit

react要保证所有组件都是纯函数 副作用在useEffect里


agent：
AI agent
LLM是大脑 ->topic 拆解 （规划是难点）-> 工具调用：手脚 ->硬件

example：（规划）
量化模型 game theory（博弈视角：多空力量） 诱空55% -> distribution 吸筹 K线图（3d 20d）当日情报（QQQ，VD）-> chain of thought -> 拆成子目标-> AI 执行
multiagent：

agent loop：Observe→ Think→ Plan→ Act→ Observe → ...

规划模式：CoT / ReAct / Plan-and-Execute / Multi-Agent

工具设计：单一职责 + schema + 结构化返回 + 权限控制

记忆：短期 context / 工作记忆 / 长期向量库