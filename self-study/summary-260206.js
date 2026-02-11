import { useState } from 'react';
//Catch-all [...slug] 必须有子路径 
// app/products/[...categories]/page.tsx

// ✅ /products/electronics/laptop
// ✅ /products/clothing/shirts
// ❌ /products (404，没有分类就不显示)
/*URL: /docs/guide/getting-started/installation

segments 捕获:
└─ guide             → slug[0]
└─ getting-started   → slug[1]  
└─ installation      → slug[2]

params = { slug: ['guide', 'getting-started', 'installation'] }
*/

//Optional Catch-all [[...slug]] 根路径也需要显示内容
// app/shop/[[...slug]]/page.tsx

// ✅ /shop (显示所有商品)
// ✅ /shop/electronics (显示电子产品)
// ✅ /shop/electronics/laptop (显示笔记本)

//动态segments 作为params属性 传递给layout,page,route,generateMetadata函数
// children：React 中，组件标签之间的内容

//平行路由
//拦截路由 
/* (.)匹配同一级别区段 路由地址！！！
(..)匹配上一级区段
(..)(..)匹配上两级区段
(...)匹配根app目录区段 

模块化：一旦写了 module.exports = 新对象，就会“替换”掉之前的导出对象，之前用 exports.xxx 或 module.exports.xxx 加上的属性都不会被导出
*/


//middleware
/*
path rewriting:根据属性动态重写路径到API路由或者页面，支持ABtest，功能推出/旧路径
bot detection 爬虫检测：检测和阻止爬虫程序流量 保护资源
logging&analytics:页面/API处理前捕获和分析请求数据
Feature flagging: 动态启用/禁用功能 无缝功能推出/测试

由root目录中middleware.js/.ts定义middleware，一般位于和pages/app同一级别，或在src/
一个项目仅支持一个middleware file 但是可以将中间件功能拆分为.ts,.js，导入到主middleware file
*/

//matcher 允许过滤middlware以在特定路径允许 支持正则表达式
export const config = {
    matcher:'/about/:path*',
}

/*token：钥匙/认证机制 用用户名和pass 登录 后台生成token 包含信息 角色权限等都可以放进去放在前端 调接口时 
调接口 除了登录接口其他带token 后台校验 如果没带token 不会让我访问 带了他会解析；
token携带过期时间 一串代码 生产机主流模式JWT 提示失效则无法通过
*/

/*
react hooks：函数组件超能力 组件使用状态和生命周期等功能 比如useState, useEffect, useContext
*/

import { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)  // 状态 Hook
  
  useEffect(() => {  // 生命周期 Hook
    console.log('mounted')
  }, [])
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}

//react router: 路由库 创建单页应用SPA页面导航 比如Route, Link, useNavigate, useParams

/*什么时候用use client？类似于mark它是客户端组件 区分服务器和客户端
用react hooks：useState, useEffect, useContext,useContext
添加时间处理器：onClick, onChange, onSubmit
用浏览器API: window,document,localStorage,sessionStorage,fetch(客户端调用)
使用状态管理库：Redux, MobX, Zustand
使用context provider
第三方UI库组件：Ant Design, Material UI, Bootstrap,Chakra UI

不需要use client场景：
纯展示组件，数据获取，静态内容

用react/vue开发时候 只有一个客户端 没有服务器端 最终成品是HTML 所以最后是浏览器帮我们解析 但是开发nextjs组件框架 有两个端口 客户端是浏览器
浏览器有API 比如windows 如果我们部署linux服务器上没有浏览器属性 则是服务器端 如果去服务器端找浏览器端 找不到 会报错
use clien：在客户端刷新 不再服务器端刷新
*/

//react props 
//JSX中展开操作不是ES6展开预算符

//JSX作为插槽传递
//内部props传递？？都是单向 对于接收方是readonly

//HTML中各类标签 HTML 做结构呈现 CSS 做样式处理
//组件层级多 context多级组件传值

//reducer 统一管理状态

//reacthooks
/*
useState,
useEffect 副作用 react 要求所有 func 都是纯函数
useContext,useContext
useRef
forwardRef
useMemo: usememory 缓存数据
useCallback 缓存的是函数

如果向这个组件传入的 prop 没有变化 不会受到父组件的影响

如何对子组件整体缓存优化？

//JSX本质是React.createElement方法的语法糖 是JS 语法扩展 babel 把 JSX 转译成React.createElement func 调用
//react元素是希望在屏幕看到的内容

//UI=fn(state)
/*
quick start：
npx create-react-app my-app
cd my-app
npm start
*/

//next内置路由管理系统：依据文件夹确定路由 路由用来控制页面 不影响URL的情况下组织路由，创建一个组以将相关路由保持在一起
/*
root layout
每个nextjs路由树在最终渲染时只能对应一个layout 但是也可以写多个

CI/CD：持续集成/持续交付 不仅仅包含部署
<a>只用来跳转
动态路由参数：app/blog/[slug]/page.js example url:/b1og/a  params:{ slug: 'a' }
params:Next.js 动态路由的核心机制

react中 {}包裹内部可运行的表达式
CSS伪类：降低选择器优先级 方便后面覆盖样式 伪类是特殊状态

软导航:在客户端导航期间，Next.js将执行部分渲染，更改槽内的子页面，同时保持另一个槽的活动子页面，即使它们与当前URL不匹配。
硬导航：浏览器进行的完整页面加载，重新请求 HTML 文档 刷新整个页面 清空所有JS status 重新加载所有资源 触发浏览器前进/后退按钮 浏览器历史记录中新增一条 速度慢 页面闪烁（白屏）丢失页面状态
触发硬导航方式：点击普通链接<a href="/about.html">about us</a> 触发硬导航 ；修改window.location；刷新页面window.location.reload();
location.reload();表单提交；地址栏输入URL

开发环境和有没有缓存没有关系 测试和登录需要缓存

docker核心功能：项目启动 `docker-compose up`能否解决在不同设备上都可以运行的问题 不用考虑环境配置了 可以统一开发商环境

单页面SPA：1个html 软导航 不刷新 url变化通过history API AJAX/Fetch获取数据 后续跳转快（无刷新） 用户体验流畅（类原生应用） SEO困难（需SSR） 开发复杂度高 
多页面MPA：多个html 硬导航（完整刷新） 真实页面切换 通过HTML响应获取数据 首次加载快（只加载当前页） 后续跳转慢（完整刷新） SEO简单（天然友好） 开发复杂度低

<div> = Division（分区）→ 用于分隔大块内容 布局 容器
<span> = Span（跨越）→ 用于跨越一小段文本 修饰一段文本
<ul> - Unordered List（无序列表）创建一个项目符号列表（默认显示为圆点 •）
<li> - List Item（列表项）代表列表中的每一项内容 必须放在 <ul> 或 <ol> 标签内部
*/

//react组件 使用类的方式声明一个组件
class 类名 extends React.Component {
  render() {
    return (
    )}}

//早期函数组件无状态 纯UI展示 从react16.8推出hooks后 使用函数组件更多 相比类组件
<button onclick={activeLasers}>Active lasers</button>
//*React* 中无法通过 *return false* 来阻止默认行为，只有使用e.preventDefault阻止默认行为
eventHandler(e){
  e,nativeEvent //原生事件对象
}

/*事件处理函数中this不会指向当前组件 因此需要自行对this修正指向
如何向事件处理函数传参？
bind()在绑定this指向时候向事件处理函数传参
绑定事件时 通过写箭头函数传参

如果在事件处理函数里面想拿到 *setState* 执行后的数据，可以提前使用一个变量来存储计算结果，或使用setState的第二个参数，它是一个函数，这个函数会在state更新后被调用
把所有setState当成异步 不信任setState调用的状态 
如果要使用改变后状态 使用回调函数（setState第二个参数）
如果新的状态要根据之前的状态进行运算，使用函数的方式改变状态（*setState* 的第一个函数）
*React* 优化异步*setState*，合并多次 setState（多次状态改变完成后，统一改变state，触发 *render*）
*/

//如果是类组件，则需要在 *constructor* 中将 *props* 通过super传递给父类，然后通过this.props的方式来获取传入的值
class 组件名 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
       // 一段 JSX
    	 // 通过 this.props.xxx 获取传入的值
        <div>
          <p>姓名：{this.props.name}</p>
          <p>年龄：{this.props.age}</p>
          <p>性别：{this.props.gender}</p>   
        </div>
     );
	}
}

//可以对传入的 *props* 设置默认值，验证props有效性
// 设置默认的 props 值，当组件没有传值时会使用默认值
Greeting.defaultProps = {
  name : 'xiejie',
  age : 18,
  gender : 'male'
};

//状态提升：如果子组件需要向父组件传递数据，同样是通过触发父组件传递给子组件的事件传递
//https://zh-hans.reactjs.org/docs/lifting-state-up.html
/*前端开发采用*MVVM*模式，绑定视图和视图模型，视图模型的改变会带来视图改变。开发需要专注在视图模型

MVVM vs MVC vs MVP
MVVM（Two-Way Data Binding）
View (视图)  ←→  ViewModel (视图模型)
    ↑                  ↑
用户输入          自动更新
自动更新          数据变化

MVC (Model-View-Controller)：
Model ←→ Controller ←→ View
Controller 主动控制 View
View 的更新需要 Controller 手动操作

MVVM (Model-View-ViewModel)
Model ←→ ViewModel ←→ View
           ↑          ↑
           └─数据绑定─┘

ViewModel 通过数据绑定自动同步 View
不需要手动操作 DOM

生命周期钩子函数
constructor():同一个组件对象只会创建一次；不能在第一次挂载到页面之前，调用 *setState*，为了避免问题，构造函数中严禁使用 *setState*
render:类组件中必须要书写的生命周期方法
返回虚拟 *DOM*，会被挂载到虚拟 *DOM* 树中，最终渲染到页面真实 *DOM* 
render可能不只运行一次，只要需要重新渲染，就会重新运行
严禁使用 *setState*，因为可能会导致无限递归渲染

componentDidMount:只执行一次 可以使用useState 会将网络请求、启动计时器等一开始需要的操作，书写到该函数
componentWillUnmount:在该函数中销毁一些组件依赖的资源(e.g.计时器)

hooks: JS函数 思想转变 从“面向对象”的思想转为“函数式编程” （声明式编程）
https://www.imaginarycloud.com/blog/functional-programming-vs-oop/
useLocation: 获取location对象后 获取state属性 其他路由跳转过来 在state里传递额外数据
useNavigate：调用后返回的函数做跳转
useparams:获取动态参数

嵌套路由：

原则：
只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用
只能在React函数组件中调用Hook。不要在其他JavaScript函数中调用

useState:添加状态
useEffect:处理函数副作用
*/
function App(props) {

  let [count, setCount] = useState(0);

  function clickhandle(){
    setCount(++count);
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={clickhandle}>+1</button>
    </div>
  );
}

export default App;

//纯函数：不存在副作用（函数结果不可控 不可预期）
/*
自定义hook：本质是函数 但和普通函数有区别
能调用比如useState, useEffect等hook 普通函数不能 因此可以内置hooks获得fiber访问方式 实现组件级别存储数据的方案
以use开头 普通函数没有这个限制
*/

/*
react rooter：以前只有后端路由
使用json-server搭建服务器
npm初始化服务器目录 安装json-server依赖 创建db.json模拟数据库
package.json添加db："json:server":"json-server --watch db.json"
启动服务器 npm run json:server
访问地址：http://localhost:3000/

组件：
BrowserRouter:前端路由以history模式开始 包裹根组件
HashRouter：前端路由以hash开始 包裹根组件
Routers：类似于v5版本的Switch 提供上下文环境（path匹配路由；element：匹配上路由时渲染的组件））
Navigate：导航组件 类似于useNavigate返回值函数
NavLink：；类似Link 被渲染为<a> 和Link有区别 当前link有一个名为active的激活样式 做顶部/左侧导航栏跳转




NavLink：负责“点哪里、跳到哪个路径”（导航）。
Route：负责“这个路径要显示哪个组件”（匹配并渲染）

<tr> table row 表格行
<td> table data 表格数据
<thead> table head 表格头
<tbody> table body 表格体
*/

/*CMJ 是使用 API 实现的模块化，ESM 是使用新语法实现的模块化
CMJ 仅在 node 环境中支持，ESM 各种环境均支持
CMJ 是动态依赖，同步执行。ESM 既支持动态，也支持静态，动态依赖是异步执行
*/

/*使用`npx 命令`时，它会首先从本地工程的`node_modules/.bin`目录中寻找是否有对应的命令
npx webpack
npx prettyjson 1.json

`npm init`初始化工程的`package.json`文件
除此之外，有时也可以充当`npx`的作用
npx -p @vue/cli vue create vue-app

npm init 包名 # npx create-包名
npm init @命名空间 # npx @命名空间/create
npm init @命名空间/包名 # npx @命名空间/create-包名
*/

/*
eslint会自动寻找根目录中的配置文件，它支持三种配置文件：

- `.eslintrc` JSON格式
- `.eslintrc.js` JS格式
- `.eslintrc.yml` YAML格式
*/

/*
webpack
最新webpack5，最广泛webpack4

# webpack scope hoisting
webpack内置优化 针对模块优化 生产环境打包时自动开启
未开启scope hoisting时，webpack将每个模块代码放置在独立函数，模块作用域互不干扰
scope hoisting把多个模块代码合并到一个函数环境中执行。webpack按照顺序正确的合并模块代码，对标识符处理避免重名
好处：减少函数调用，提升运行效率，降低了打包体积
启用有前提，如果遇到某些模块多次被其他模块引用/使用动态导入模块/非ESM模块，不会有scope hoisting

https://webpack.docschina.org/plugins/module-concatenation-plugin/

module.exports = {
  devtool: 'none',
};
关掉source map
devtool 控制 Webpack 是否生成、以及如何生成源码映射
打包后的 dist/main.js 里没有 source map 的引用或内联数据；浏览器里调试时只能看到打包、压缩后的代码，看不到原始 src/ 下的文件和行号



await 用法？？？？


//webpackconfig.json
module.exports = {
  mode: 'development',  开发模式，便于调试、构建快
  devtool: 'source-map',   生成独立 source map，方便对照源码调试
  entry: './src/index.js',   指定打包入口
  experiments: {
    topLevelAwait: true,   启用顶层 await，支持在入口里直接写 await
  },
};

`webpack4`中，需要使用`cache-loader`缓存打包结果以优化打包性能

而在`webpack5`中，默认开启打包缓存，无须再安装`cache-loader`

`webpack5`将模块打包结果缓存到内存，通过`cache`配置进行更改
cache配置：https://webpack.docschina.org/configuration/other-options/#cache

Webpack 打包 = 从 entry 解析依赖 → Loader 转译 → 建依赖图 → 分 Chunk → 生成运行时和模块代码 → 写出到 dist


资源模块
在`webpack4`中，针对资源型文件通常使用`file-loader`、`url-loader`、`raw-loader`处理
由于大部分前端项目用到资源型文件，因此`webpack5`原生支持了资源型模块

npm模块安装机制
npm检查本地node_modules/是否安装过该模块 已经安装则不再安装
npm检查缓存中模块是否相同 如果有 从缓存读取安装
如果本地和缓存均不存在 npm从registry指定地址下载安装包 写入本地node_modules/ 同时缓存

'''
npm cache clean -f  # 清除缓存
npm config get cache  # 获取缓存位置
npm config set cache "D:\npm-cache"  # 设置缓存位置
'''

dist/是构建工具（webpack）自动生成的 不要手改 执行build可能被覆盖 通常放进.gitignore 不用提交git
只改 src/，改完再 build 就会得到新的 dist/

前端工程化 模块化 组件化
模块化：基础 解决问题：全局污染和依赖混乱
工程化：解决前端开发环境和生产环境要求不一致的矛盾 开发环境代码细分 代码格式统一；生产环境中 代码被压缩 混淆 优化体积 工程化解决矛盾 开发环境的代码打包后生成适合的生产环境代码 让开发者更多集中在开发环境
组件化开发：前端框架 一个网页/站点/产品线划分为多个小组件（复用unit）

webpack vs gulp
webpack：基于模块化 大宝漆 以入口为起点 构建项目依赖图 打包生成结果
gulp：基于工作流 过程管理器 每步做什么看开发人员配置 每步连接形成完整构建流水线
两者不矛盾 可以在一个工程中使用webpack和gulp 将webpack作为gulp流水线一环

webpack.loader 和.plugins的区别？
都是扩展点
loader：加载器 转换代码 （JS代码降级 CSS预编译 模块化）
plugin:插件 webpack打包每个环节提供钩子函数 他们参与打包生命周期 修改/增加webpack功能（生成页面和css，压缩打包结果）

HMR热更新：运行期间 遇到代码更改后，无须重启整个项目，只更新变动的那一部分代码
dev server：开发服务器。在开发环境中搭建的临时服务器，用于承载对打包结果的访问

webpack hash实现原理？
hash：整个项目构建相关 只要有文件更改 hash值改变 全部文件公用相同的hash值
chunkhash：每个打包过 
*/