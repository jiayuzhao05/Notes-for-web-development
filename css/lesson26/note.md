html符合A11Y 优化SU搜索

<nav>
<ul>
<li>
<a>

<ol>1.2.3.
<ul>....

transform 视觉效果 监听效果 时间线
transition 怎么变化 哪个属性 变化

布局：flex，grid

上个操作 command+z

scaleX()

Container()
文字()

<nav> <a></a>  <button></button>

往上分层：
tailwind CSS

JSS 布局

context/provider

components layer

---

emmet缩写写法

> 嵌套 div>ul>li

- 同级元素 header+main+footer
  ^ 返回上一级 div>ul>li^p div>ul>li^^footer

* 重复 li\*5

$ 自动编号
li.item$*3 
li.item$$$\*3(多个 $ 控制位数)   
li.item$@-*3(倒序)  
li.item$@5*3（指定编号）

# ID div#app

. class div.container
[] 属性 input[type=text] 多个属性 a[href=# target=_blank]
{} 文本 a{Home}
（）分组 改变优先级 div>(header>nav)+main+footer

context作为第三方库 外面用<provider>包裹 全局上下文 解决了prop drilling每层传播的问题 避免传递很长

useEffect/useState 作为react hooks（纯函数组件）

为什么用纯函数？
因为用类组件麻烦

<link> vs <a>

先写html后写css（撬动GPU渲染） 最后写js

作业：搞清楚animation flex和grid布局
transform:视觉效果 缩放、旋转、位移 瞬间改变
transition：怎么变 只有起点和终点 触发方式：状态变化时（如 :hover）
animation：时间线（关键帧） 加载后自动跑 可以无限循环

如果优先动画属性 浏览器用GPU合成层：transform，opacity 尽量少动画 容易触发重排reflow

┌─────────────────────────────────────┐
│ flex container (display: flex) │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
│ │ item│ │ item│ │ item│ │ item│ │ ← 主轴 main axis →
│ └─────┘ └─────┘ └─────┘ └─────┘ │
└─────────────────────────────────────┘
↑ 交叉轴 cross axis

布局：flex 一维； grid 二维 格子里放内容(e.g.dashboard,多行多列排版)
