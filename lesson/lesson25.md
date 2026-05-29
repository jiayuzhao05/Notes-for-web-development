JSX 只能返回顶层结构
组件return里 最外层只能有一个根节点 不能并列写多个同级标签
return <div>Hello</div>;
编译后：return _jsx("div",{children:"Hello"})
一次return对应一次函数调用 只能得到一个react element对象

react需要一颗组件树 做diff 更新dom 多个并列根节点没有唯一父节点 树结构不清楚 协调算法不好处理


从组件返回多个元素 单个父标签将他们包裹起来 用<div></div>或<></>
<div> 相当于fragment <> (只提供逻辑上父容器 当不想多包一层DOM)


html中<label>for属性和input类似
<label>中for和某个表单控件id配对 最常见和<input>配对
<label>给控件加文字说明 [username]
for: 写在<label> 值等于目标控件id 建立「这段文字 ↔ 这个输入框」的关联
<label for="username">用户名</label>
<input id="username" type="text" />


react没有for属性 用htmlFor？
JSX不能写for 因为for是JS保留字（for loop）
<label htmlFor="username">用户名</label>
<input id="username" type="text" />
渲染到真实DOM时 变成HTML的for="username"

html解析器松散 不闭环  自动纠错机制   比如<p>改进<header> 但是渲染时还是渲染进<body>

有些包在生产 环境环境之分    同一个包在不同环境下会用不同构建版本
很多库会发布两套构建产物：
开发development：体积大 性能慢 额外功能有警告、详细报错、DevTools支持 用本地pnpm dev
生产production：体积小（压缩后） 性能快 去掉额外功能 只保留核心逻辑 pnpm build后部署

dependencies 运行时需要包 打进最终产物 用户会用到例：react，react-dom，express
devDependencies：只在开发/构建时需要，不会发给用户例：vite,eslint,@types/react

Eslint用来纠错 主要纠错.ts/.tsx 属于开发阶段工具 不会进生产包
vite/webpack打包时：
1. process.env.NODE_ENV 替代成'production'/'development'
2. 让react等库加载对应版本
3. 去掉if(process.env.NODE_ENV !== 'production')里开发专用代码


组件本质是函数
react里组件个js函数   JSX标签最终变成对这个函数调用

function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}

使用时：<Greeting name="Alice" />
编译后：_jsx(Greeting, { name: "Alice" });
//调用 Greeting 函数，传入 { name: "Alice" }

JSX语法糖-> _JSX/React.createElement -> React Element(virtual DOM) -> React DOM (true DOM)
组件函数(props)  →  返回 React Element 对象  →  React 把它渲染成页面
react希望组件尽量是纯函数 同样的props->渲染同样UI 不在渲染中产生副作用（请求 改dom 改外部变量） 
副作用应放在事件处理函数(onClick),useEffect

<App />在调用App()
props是readonly 像函数参数 子组件不直接修改
组件嵌套，组合 函数调用函数 组件渲染其他组件
Hooks是给函数组件加能力的特殊函数：useState,useEffect只能在组建函数顶层调用
性能优化：useMemo,useCallback,React.memo都是在优化（函数何时重新执行 返回什么）

ScoreProvider 是用 React Context 做的「全局状态容器」，放在 App 最外层，让 Dashboard 和所有游戏页面共享同一份分数数据；子组件通过 useScore() 读取和修改，无需 props 层层传递

在react应用最外层放全局context provider： {ScoreProvider} (minigamesspa里管理[剩余胜利次数]这类跨页面共享数据) 让多个页面/组件共享同一份全局状态，而不必一层层传props

createContext() 创建上下文

context也是传递方式的一种： provider广播

子组件变数据：
通知父组件（回调） 父组件改state 传新props下来
或用组件自己的state/context

<AppLayout> 页面方式
<AppRoutes> 根据url不同呈现页面
<Layout> 布局/
<Features> 业务目录
<public> 静态资源


组件(props,state)
props(data) 子组件不能直接修改

.json 文档型 类型类似.md 通用格式 java,go,python 不能识别JS对象 但能识别json格式的对象


如果db/里直接用.json格式来搜索 搜索速度会很慢 
1）没有索引：不像mysql按字段建索引快速定位
2） 整文件读：查一条记录要读整个json并parse
json不能直接表示JS的函数、undefined、data对象等
3）线性扫描：只能从头道尾遍历
4）无查询语言：没有sql那种where,join
5) 并发差：多用户同时读写同一文件容易冲突


//js 对象
const obj = {score:5, fn:()=>{}};
//json 要先json.parse()才能当对象用
{"score":5}