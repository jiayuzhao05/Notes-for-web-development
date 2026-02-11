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

dev server：开发服务器。在开发环境中搭建的临时服务器，用于承载对打包结果的访问

webpack hash实现原理？
hash：整个项目构建相关 只要有文件更改 hash值改变 全部文件公用相同的hash值
chunkhash：每个打包过程单独的hash值 如果有多个entry 每个entry维护自己的chunkhash
contenthash：每个文件内容单独hash值 和打包结果文件内容相关 只要文件内容不变 contenthash不变

webpack如果使用hash命名 每次会重新生成hash？
no 和关联内容是否变化有关 不变则hash不变

webpack如何处理图片？
本身不处理 把图片当作JS解析 报错打包失败 loader需要将图片内容转化成JS webpack才能识别
通过loader处理：url-loader 将图片生成到打包目录得到资源路径 

webpack 打包出来的 html 为什么 style 放在头部 script 放在底部？
浏览器在解析 HTML 时是从上到下进行解析的，当遇到样式和 JS 时，都会停止 HTML 解析，转而解析样式和执行 JS
样式放在顶部 页面样式解析完成后再解析 HTML，避免页面闪烁
JS放在底部 解析完HTML后执行JS 用户尽快看到页面 让JS执行时拿到完整DOM树
HTML5中 script放在顶部 浏览器尽快下载 延迟执行

webpack4 中的 tree-shaking 工作流程？
tree-shaking 仅支持 ESM 的静态导入语法，对于 CMJ 或者 ESM 中的动态导入不支持 tree shaking
1. 标记：webpack 在分析依赖时，会用注释方式对导入和导出进行标记，对于模块中没有被其他模块用到的导出标记 unused harmony export
2. 删除：之后在 Uglifyjs (其他类似的工具) 步骤代码精简，del标记为无用的代码。

开发过程中如果需要对已有模块进行扩展，如何进行开发保证调用方不受影响？
如果此次模块升级只是修复了某一些 bug，作为补丁版本升级，不影响主版本和次版本号
如果此次模块升级会新增一些内容，完全兼容之前的 API，作为次版本升级
如果此次模块升级会修改之前的 API，则作为主版本升级

HMR热更新：运行期间 遇到代码更改后，无须重启整个项目，只更新变动的那一部分代码
原理：
当开启热更新后，页面中会植入一段 websocket 脚本，同时，开发服务器也会和客户端建立 websocket 通信，当源码发生变动时，webpack 会：
1. webpack 重新打包
    > 2. webpack-dev-server 检测到模块的变化，于是通过 webscoket 告知客户端变化已经发生
    > 3. 客户端收到消息后，通过 ajax 发送请求到开发服务器，以过去打包的 hash 值请求服务器的一个 json 文件
    > 4. 服务器告诉客户端哪些模块发生了变动，同时告诉客户端这次打包产生的新 hash 值
    > 5. 客户端再次用过去的 hash 值，以 JSONP 的方式请求变动的模块
    > 6. 服务器响应一个函数调用，用于更新模块的代码
    > 7. 此时，模块代码已经完成更新。客户端按照之前的监听配置，执行相应模块变动后的回调函数。

优化 webpack 的打包速度？
1. noParse
    很多第三方库本身就是已经打包好的代码，对于这种代码无须再进行解析，使用 noParse 配置排除掉第三方库

    > 2. externals
    对于知名的第三方库使用 CDN，这部分库通过 externals 配置不打包
    
    > 3. 限制 loader 的范围
     使用 loader，通过 exclude 排除掉不必要编译，比如 babel-loader 对于已经完成打包的第三方库没必要再降级一次，排除掉
    
    > 4. 开启 loader 缓存
     利用`cache-loader`缓存 loader编译结果，避免源码没有变动时反复编译
    
    > 5. 开启多线程编译
    利用`thread-loader`开启多线程编译，提升编译效率
    
    > 6. 动态链接库
    对于需要打包的第三方库，使用 dll方式单独对其打包，DLLPlugin将其整合到当前项目中，避免在开发中频繁打包这些库

webpack Loader：
> - cache-loader：启用编译缓存
    > - thread-loader：启用多线程编译
    > - css-loader：编译 css 代码为 js
    > - file-loader：保存文件到输出目录，将文件内容转换成文件路径
    > - postcss-loader：将 css 代码使用 postcss 进行编译
    > - url-loader：将文件内容转换成 dataurl
    > - less-loader：将 less 代码转换成 css 代码
    > - sass-loader：将 sass 代码转换成 css 代码
    > - vue-loader：编译单文件组件
    > - babel-loader：对 JS 代码进行降级处理

  开发过程中，如何进行公共组件的设计？（字节跳动）
  1. 确定使用场景
    >    明确这个公共组件的需求是怎么产生的，它目前的使用场景有哪些，将来还可能出现哪些使用场景。
    >    明确使用场景至关重要，它决定了这个组件的使用边界在哪，通用到什么程度，从而决定了这个组件的开发难度
    
    > 2. 设计组件功能
    >    根据其使用场景，设计出组件的属性、事件、使用说明文档
    
    > 3. 测试用例
    >    根据使用说明文档编写组件测试用例

项目里有做过哪些 webpack 上的优化（字节跳动）

    > 1. 对传输性能的优化
    >    - 压缩和混淆
    >      使用 Uglifyjs 或其他类似工具对打包结果进行压缩、混淆，可以有效的减少包体积
    
    >    - tree shaking
    >      项目中尽量使用 ESM，可以有效利用 tree shaking 优化，降低包体积
    
    >    - 抽离公共模块
    >      将一些公共代码单独打包，这样可以充分利用浏览器缓存，其他代码变动后，不影响公共代码，浏览器可以直接从缓存中找到公共代码。
    >      具体方式有多种，比如 dll、splitChunks
    >
    >    - 异步加载
    >      对一些可以延迟执行的模块可以使用动态导入的方式异步加载它们，这样在打包结果中，它们会形成单独的包，同时，在页面一开始解析时并不需要加载它们，而是页面解析完成后，执行 JS 的过程中去加载它们。
    >      这样可以显著提高页面的响应速度，在单页应用中尤其有用。
    >
    >    - CDN
    >      对一些知名的库使用 CDN，不仅可以节省打包时间，还可以显著提升库的加载速度
    >
    >    - gzip
    >      目前浏览器普遍支持 gzip 格式，因此可以将静态文件均使用 gzip 进行压缩
    >
    >    - 环境适配
    >      有些打包结果中包含了大量兼容性处理的代码，但在新版本浏览器中这些代码毫无意义。因此，可以把浏览器分为多个层次，为不同层次的浏览器给予不同的打包结果。
    
    > 2. 对打包过程的优化
    >    - noParse
    >      很多第三方库本身就是已经打包好的代码，对于这种代码无须再进行解析，可以使用 noParse 配置排除掉这些第三方库
    
    >    - externals
    >      对于一些知名的第三方库可以使用 CDN，这部分库可以通过 externals 配置不进行打包

    >    - 限制 loader 的范
    >      在使用 loader 的时候，可以通过 exclude 排除掉一些不必要的编译，比如 babel-loader 对于那些已经完成打包的第三方库没有必要再降级一次，可以排除掉
    >    - 开启 loader 缓存
    >      可以利用`cache-loader`缓存 loader 的编译结果，避免在源码没有变动时反复编译

    >    - 开启多线程编译
    >      可以利用`thread-loader`开启多线程编译，提升编译效率

    >    - 动态链接库
    >      对于某些需要打包的第三方库，可以使用 dll 的方式单独对其打包，然后 DLLPlugin 将其整合到当前项目中，这样就避免了在开发中频繁去打包这些库
  
    > 3. 对开发体验的优化
    >    - lint
    >      使用 eslint、stylelint 等工具保证团队代码风格一致
    
    >    - HMR
    >      使用热替换避免页面刷新导致的状态丢失，提升开发体验

babel：JS编译器 将下一代JS语言代码编译成兼容性更好的代码

`redis`对数据的操作是在内存中完成 读写效率高 耗费大量内存 搭建redis集群解决内存不足


# TS
TS添加了静态类型和类型检查 如果使用OOP 产生大量接口 调用复杂度剧增

函数式编程：以数学运算为思考切入点

继承关系中，this的指向是动态——调用方法时，根据具体调用者确定this指向
静态成员：附着在类上的成员（属于某个构造函数的成员）static修饰 非实例成员，属于某个类 this指向当前类
实例成员：对象成员，属于某个类的对象 this指向当前对象

单例模式：某些类的对象，在系统中最多只能有一个，为了避免开发者造成随意创建多个类对象的错误，可以使用单例模式强约束

JS指向：大部分时候，this的指向取决于函数的调用方式
- 如果直接调用函数（全局调用），this指向全局对象或undefined (启用严格模式)
- 如果使用```对象.方法```调用，this指向对象本身
- 如果是dom事件的处理函数，this指向事件处理对象

- 箭头函数，this在函数声明时确定指向，指向函数位置的this
- 使用bind、apply、call手动绑定this对象
*/