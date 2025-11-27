**回调函数用法？**

把函数 A 作为参数交给函数 B，当 B 做完事情后再调用 A

当有**耗时操作**（如定时器、网络请求、读文件）时，我们不想程序停住等它完成，登记回调函数，等完成后回来通知我们

```js
function greet(name, callback) {
  	console.log("hello"+name)
  	callback() 
}

greet("alice",function(){
  console.log("call-back")
})
```

Fetch(url,callback) 网络请求完成后处理数据

element.addEventListener("animationed",callback) 动画播放结束后执行某事

Button.onlick = callback 点击按钮后触发行为



回调地狱

当代码里出现多个异步任务依赖前一个结果时，如果一直用回调函数，就会形成层层嵌套



**foreach用法?**

不能中途停止，不返回新数组

```js
array.forEach(function callback(currentValue, index, array){
// 执行每个元素
}， thisArg) //option:回调里this

['a','b','c'].forEach((v, i) => {
  console.log(i, v)
})

const nums = [1,2,3]
nums.forEach((v, i, arr) => arr[i] = v * 2)
// nums -> [2,4,6]
```





**props.onbuttonClick(props.title)**

调用父组件传下来的回调函数，并把 title 当作参数传过去

> *“按钮被点时，告诉爸妈：我这边的标题是 xxx。”*

```js
//father
function Parent(){
  const handleButtonClick = (title) => {
    console.log('title',title)
  } 
  return <Child title="setting" onbuttonClick={handleButtonClick} />
}
  
//child
function Child(props) {
  return (
  <button onClick={()})
}
```



**promise链式调用 vs async/await**

复杂流程与错误处理 → 用 async/await；需要**组合器**（all/race 等）或**流式管道** → 用 Promise 链更顺手？？？

```js
//promise chain
getUser(id)
		.then(user=> getOrders(user))
		.then(orders => getDetail(orders[0]))
		.then(detail => console.log(detail))
		.catch(console.error)

// async/await
async function run(id) {
  try {
    const user = await getUser(id)
    const orders = await getOrders(user)
    const detail = await getDetail(orders[0])
    console.log(detail)
  } catch(e){
    console.error(e)
  }
}

//并行执行
Promise.all([getUser(id), getSettings(id)])
  .then(([user, settings]) => { /*...*/ })
  .catch(console.error)

// async/await
const [user, settings] = await Promise.all([getUser(id), getSettings(id)])

// 只要最快返回一个
// 两种写法都用组合器
const fastest = await Promise.race([reqA(), reqB()])
const results = await Promise.allSettled([a(), b(), c()])
```

promise 适合线性流式处理，深度依赖时横向展开和 then 金字塔

async/await 接近同步，条件、循环、早退写起来直观

优先用 async/await：流程复杂，需要条件/循环/早退、用 try/catch 包围片段

保留 promise 链：一次性流水线、自然使用组合器(all/any/race/allSettled)，库内部提供链式 API



**箭头函数 vs JS函数：不是语法糖，this 绑定，argument不同**

箭头函数不是普通函数简写，是不绑定自己的 this，arguments，super，new.target的函数表达式

```js
// 普通函数
function add(a, b) { return a + b}

// 箭头函数 底层机制不同
const add = (a, b) => a + b

//普通函数:this 动态绑定，this 取决于调用方式，谁调用函数，this 就是谁
const obj = {
  name: 'Tom',
  say: function() {
    console.log(this.name);
  }
}
obj.say();          // 'Tom'
const f = obj.say;
f();                // undefined（或window.name）

//箭头函数
const obj = {
  name: 'Tom',
  say: () => console.log(this.name)
}

obj.say() //undefined,因为箭头函数.this来源外层（全局作用域）
```





**理解 DOM 树**

HTML（文本）-> 对象模型（内存结构）

```js
// 1. 选中元素
const h1 = document.querySelector('h1');

// 2. 读取或修改内容
console.log(h1.textContent); // 读取文本
h1.textContent = 'Hi DOM!';  // 修改文本

// 3. 修改样式
h1.style.color = 'blue';

// 4. 创建新元素
const newP = document.createElement('p');
newP.textContent = '新段落';
document.body.appendChild(newP);
```

渲染过程：

HTML —> DOM 树

解析 CSS -> 生成 CSSOM 树

合并成 render tree

layout->paint-> composite



**TS相比JS可以提前检查渲染是否成功?**

不能，TS 是编译器类型检查，把会在运行期才爆的错误提前到写代码结算，降低渲染出错频率，但无法保证真实渲染必定成功

TS 能发现的问题：
组件/函数入参不匹配：缺必填 prop,类型不符，拼错属性名

JSX 属性类型错误：比如给 <button> 传 href、事件回调签名不对

可空值使用：strictNullChecks 下直接用可能为 null/undefined 的值

状态机/分支遗漏：用联合类型 + switch 做穷尽检查

-------------

**JSX** react中构建UI,js语法扩展,浏览器无法识别

```js
const message = 'this is message'

function App(){
  return (
    <div>
      <h1>this is title</h1>
      {message}
    </div>
  )
}
```

```js
//列表渲染
const list = [
  {id:1001, name:'Vue'},
  {id:1002, name: 'React'},
  {id:1003, name: 'Angular'}
]

function App(){
  return (
    <ul>
      {list.map(item=><li key={item.id}>{item}</li>)}
    </ul>
  )
}

//条件渲染
const flag = true
const loading = false

function App(){
  return (
    <>
      {flag && <span>this is span</span>}
      {loading ? <span>loading...</span>:<span>this is span</span>}
    </>
  )
}

//复杂条件渲染
const type = 1  // 0|1|3

function getArticleJSX(){
  if(type === 0){
    return <div>No picture mode template</div>
  }else if(type === 1){
    return <div>Single picture mode template</div>
  }else(type === 3){
    return <div>Triple picture mode template</div>
  }
}

function App(){
  return (
    <>
      { getArticleJSX() }
    </>
  )
}
```





**TS**

Code.ts -> TSC-> code.js-> node.js & chrome

由TS 编译生成的 JS 文件，代码中没有类型信息

*ts-node 命令在内部偷偷的将TS -> JS，然后，再运行JS 代码*

*所有的JS 代码都是TS 代码*

*JS 有类型（比如，number/string 等），但是**JS 不会检查变量的类型是否发生变化**。而**TS 会检查*

```ts
let age:number = 18
```

*JS 已有类型*

*l 原始类型：number/string/boolean/null/undefined/symbol。*

*l 对象类型：object（包括，数组、对象、函数等对象）。*

*2.* *TS 新增类型*

*l 联合类型、自定义类型（类型别名）、接口、元组、字面量类型、枚举、void、any 等*

```ts
let numvers:number[]=[1,3,5]
let strings:Array<string> = ['a','b','c']
let arr:(number | string)[]=[1,'a',3,'b']

type CustomArray = (number | string)[]
let arr1: CustomArray = [1,'a',3,'b']
let arr2: CustomArray =['x','y',6,7]

function greet(name:string):void{ //没有返回值
  console.log('Hello',name)
}

function mySlice(start?:number,end?:number):void{ //可选参数，可选参数只能出现在参数列表最后，可选参数后面不能再出现必选参数
  console.log('index_start',start,'index_end',end)
}

let person:{name:string;age:number;sayHi():void}={
  name:'jack',
  age:19,
  sayHi(){}
}

function myAxios(config:{url:string;method?:string}){//可选属性
  console.log(config)
}

interface Iperson{ //接口，只能为对象指定类型
  name:string
  age:number
  sayHi():void
}

let person: Iperson = {
  name:'jack'
  age:19
  sayHi(){}
}
//类型别名，不仅可以为对象指定类型，实际上可以为任意类型指定别名
type NumStr = number | string

interface Point2D {x:number;y:number}
interface Point3D{x:number;y:number;zero:number}
interface Point3D extends Point2D {z:number}

let position:number[]=[39.54,116.23]
let position:[number,number]=[39.54,116.23] //tuple另一种类型的数组，确切地知道包含多少个元素，以及特定索引对应的类型

const alink = <HTMLAnchorElement>document.getElementById('link')
const alink = document.getElementById('link') as HTMLAnchorElement //类型断言

let count = 18
count = '20'// 这句代码报错
count.toFixed()

let age: number = 18

age = 20
// age = '30'

//原始类型
let age: number = 18
let myName: string = '刘老师'
let isLoading: boolean = false
let a: null = null
let b: undefined = undefined
let s: symbol = Symbol()

```





**React**

1. react.js：React核心库。
2. react-dom.js：提供操作DOM的react扩展库。
3. babel.min.js：解析JSX语法代码转为JS代码的库。



创建DOM

```js
//创建虚拟DOM对象
const CDOM = React.createElement('xx',{id:'xx'},'xx')
//我们只需要操作虚拟DOM数据,react会转换为真实DOM变化而更新界
//用的是JSX,本质是react.createElement(component,props,..children)方法语法糖
//JSX需要babel转译成纯JS代码运行,只要用JSX,都要加上type=“text/babel"声明需要babel来处理

var ele=<h1>Hello JSX!</h1>  //产生JS对象,而不是字符串,也不是HTML/XML 标签
```

渲染DOM(元素)

```js
ReactDOM.render(virtualDOM,containerDOM)
//将虚拟DOM元素渲染到页面中的真实容器DOM中显示
//containerDOM用来包含虚拟DOM元素的真实dom元素对象(一般是div)
//虚拟DOM元素只有一个根元素,有结束标签
//react调用render()得到virtual DOM,解析成真实DOM Diff → Fiber 更新计划 → Commit DOM
```

```javascript
// App.jsx
import React from "react";

const frameworks = ["Angular", "React", "Vue"];

function FrameworkList({ title, items }) {
  return (
    <section style={{ padding: 16, border: "1px solid #ddd", width: 280 }}>
      <h2 style={{ marginTop: 0 }}>前端 js 框架列表</h2>
      <ul>
        {items.map((name) => (
          <li key={name}>{name}</li> // 动态渲染 + 唯一 key
        ))}
      </ul>
    </section>
  );
}

export default function App() {
  return <FrameworkList title="前端 js 框架列表" items={frameworks} />;
}
```

**组件属性**

**1.state** (key-value) 通过更新组建state来更新页面显示

事件回调里this可能丢失

自定义实例方法如果作为回调传下去，**必须绑定**或写成箭头函数，否则在严格模式下 this 会是 undefined：

```js
class Counter extends React.Component {
  state = { n: 0 };

  // 推荐：箭头函数自动绑定 this
  handleClick = () => {
    this.setState({ n: this.state.n + 1 });
  };

  // 普通方法：若不绑定，this 为 undefined
  // handleClick() {
  //   this.setState({ n: this.state.n + 1 });
  // }

  render() {
    console.log(this === this); // true，this 是组件实例
    return <button onClick={this.handleClick}>{this.state.n}</button>;
  }
}
```

普通方法需要在构造器里绑定

```js
constructor(props) {
  super(props);
  this.state = { n: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

```js
//更新状态 2 种写法
setState(stateChange, [callback]) //对象式
//callback:可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
setState(updater, [callback]) //函数式
//updated为返回 stateChange 对象函数，接收state，props

//对象式是函数式语法糖（简写）
// 如果新状态不依赖于原状态 ===> 对象式
// 如果新状态依赖于原状态 ===> 函数式
```

```js
function App(){
  const [ count, setCount ] = React.useState(0)
  return (
    <div>
      <button onClick={()=>setCount(count+1)}>{ count }</button>
    </div>
  )
}
```



```js
let [count, setCount] = useState(0);

const handleClick = () => {
    // 直接修改 无法引发视图更新(react中状态只读)
    count++;
    console.log(count);
}

const handleClick = () => {
    // 作用：
    // 1. 用传入的新值修改count
    // 2. 重新使用新的count渲染UI
    setCount(count + 1)
}

//修改对象状态,对对象类型状态变量,给set一个全新对象修改
const [form, setForm] = useState({
    name: 'jack',
})

const handleChangeName = () => {
    form.name = 'john'
}

const [form, setForm] = useState({
    name: 'jack',
})

const handleChangeName = () => {
    setForm({
        ...form,
        name: 'john',
    })
}
```



**表单控制**

```js
//受控绑定:使用React组件的状态（useState）控制表单状态
function App(){
  const [value, setValue] = useState('')
  return (
    <input 
      type="text" 
      value={value} 
      onChange={e => setValue(e.target.value)}
    />
  )
}

//非受控绑定:通过获取DOM获取表单输入数据
function App(){
  const inputRef = useRef(null)

  const onChange = ()=>{
    console.log(inputRef.current.value)
  }
  
  return (
    <input 
      type="text" 
      ref={inputRef}
      onChange={onChange}
    />
  )
}
```

生命周期方法componentDidMount、componentDidUpdate、componentWillUnmount 等里的 this 也都是组件实例??????

> 生命周期方法 = 组件在不同生命阶段触发的回调函数,在这些时间点“插入操作”
>
> 查react生命周期流程??

| mounting                | 组件第一次渲染                                             |
| ----------------------- | ---------------------------------------------------------- |
| constructor()           | 初始化 state、绑定方法                                     |
| render()                | 渲染 UI（纯函数，不能 setState）                           |
| componentDidMount()     | 组件挂载后执行，请求数据、操作 DOM；开启监听, 发送ajax请求 |
| **Updating**            | **state/props改变触发**                                    |
| shouldComponentUpdate() | 性能优化，是否更新组件                                     |
| render()                | 重新渲染 UI                                                |
| componentDidUpdate()    | 更新后执行副作用，如同步 DOM                               |
| **Unmounting**          | **组件消失**                                               |
| componentWillUnmount()  | 收尾工作，清理定时器、取消订阅、清理事件                   |

**类组件 vs hooks**

自定义hook是use开头函数, 实现逻辑封装和复用

```js
//class
componentDidMount() {
  document.title = this.state.count;
}
componentDidUpdate() {
  document.title = this.state.count;
}
componentWillUnmount() {
  cleanup();
}

//hooks
useEffect(() => {
  document.title = count;
  return () => cleanup();
}, [count]);
```

```js
//1.state hook
setXxx(newValue) //参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
setXxx(value => newValue)//参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

//2.effect hook
//执行副作用 模拟类组件生命周期钩子
// 发ajax请求数据获取--设置订阅 / 启动定时器--手动更改真实DOM
useEffect(() => {
          // 执行带副作用操作
          return () => { // 组件卸载前执行
            // 收尾工作, 比如清除定时器/取消订阅
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
//useEffect hook = componentDidMount()+componentDidUpdate()+componentWillUnmount()
//清除副作用的函数最常见的执行时机是在组件卸载时自动执行

//3.ref hook
//函数组件中存储/查找组件内的标签或任意其它数据
const refContainer = useRef()
//保存标签对象,功能与React.createRef()一样
```

清除副作用

```js
import { useEffect, useState } from "react"

function Son () {
  // 1. 渲染时开启一个定时器
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器执行中...')
    }, 1000)

    return () => {
      // 清除副作用(组件卸载时)
      clearInterval(timer)
    }
  }, [])
  return <div>this is son</div>
}

function App () {
  // 通过条件渲染模拟组件卸载
  const [show, setShow] = useState(true)
  return (
    <div>
      {show && <Son />}
      <button onClick={() => setShow(false)}>卸载Son组件</button>
    </div>
  )
}

export default App
```

封装自定义hook

```js
// 问题: 布尔切换的逻辑 当前组件耦合在一起的 不方便复用

// solution:自定义hook
import { useState } from "react"

function useToggle () {
  // 可复用的逻辑
  const [value, setValue] = useState(true)

  const toggle = () => setValue(!value)

  // 哪些状态和回调函数需要在其他组件中使用 return
  return {
    value,
    toggle
  }
}

// 封装自定义hook思路
// 1. 声明一个以use打头的函数
// 2. 在函数体内封装可复用的逻辑（只要是可复用的逻辑）
// 3. 把组件中用到的状态或者回调return出去（以对象或者数组）
// 4. 在哪个组件中要用到这个逻辑，就执行这个函数，解构出来状态和回调进行使用

function App () {
  const { value, toggle } = useToggle()
  return (
    <div>
      {value && <div>this is div</div>}
      <button onClick={toggle}>toggle</button>
    </div>
  )
}

export default App
```



只能在组件或其他自定义hook func调用;在组件顶层调用个,不能嵌套在if,for,其他func中????







**2.props** (properties)

组件标签舒心都在props中,通过标签属性从组建外向内传递变化数据,内部不要修改props数据

```js
this.props.name  //内部读取某个属性值

//对props中的属性值进行类型限制和必要性限制
// 使用prop-types库进限制（需要引入prop-types库）
Person.propTypes={
name.PropTypes.string.isRequired,
age:PropTypes.number
}

//扩展属性: 将对象的所有属性通过props传递
<Person{...person}/> 

Person.defaultProps = {
  age:18,
  sex:'male'
}

constructor(props){
  super(props)
  console.log(props)//打印所有属性
}
```



**3.refs**

```js
<input ref="input1"/>
<input ref={(c)=>{this.input1 = c}}/>  //回调

//createRef创建ref容器
myRef = React.createRef() 
<input ref={this.myRef}/>
```



事件处理

通过 onXxx 属性指定时间处理

react 用的是自定义事件，不是原生 DOM，通过时间委托（给组件最外层元素）

通过 e.target 得到发生事件的 DOM 元素对象



**虚拟 DOM 和 DOM diffing 算法**

初始化显示：创建 virtual DOM 树----真实 DOM 树-- 绘制界面显示

更新页面：setState()更新状态---重新创建virtual DOM 树--更新差异--局部页面重绘



**React 应用**

单页 WEb应用SPA只有一个完整页面

react + webpack + es6 + eslint

react只关注界面，不包含发送 ajax 请求代码，但是前端需要通过 ajax 请求喝后台交互（json 数据），所以需要集成 ajax 库

| jQuery | 比较重, 如果需要另外引入不建议使用                           |
| ------ | ------------------------------------------------------------ |
| axios  | 轻量级；封装XmlHttpRequest对象的ajax；promise 风格；可以用在浏览器端和node服务器端 |



API

```js
//1.get
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })


//2.post
axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})
.then(function (response) {
console.log(response);
})
.catch(function (error) {
console.log(error);
});
```





```
//消息订阅-发布
1)import PubSub from 'pubsub-js' //引入
2)PubSub.subscribe('delete', function(data){ }); //订阅
3)PubSub.publish('delete', data) //发布消息
```

fetch: 原生函数，不再使用XmlHttpRequest对象提交ajax请求??

```
//1.get
fetch(url)                    // 1. 发起请求
  .then(response => {         // 2. 处理响应
    return response.json()    // 3. 解析JSON
  })
  .then(data => {            // 4. 处理数据
    console.log(data)        // 5. 输出数据
  })
  .catch(error => {          // 6. 处理错误
    console.log(error)       // 7. 输出错误
  })
  
//simpler version ES6+
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
  
//2.post
fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  }).then(function(data) {
    console.log(data)
  }).catch(function(e) {
    console.log(e)
  })
```



**路由** key:value

```js
router.get(path, function(req, res))
//后端路由：当node接收到一个请求时, 根据请求路径找到匹配路由, 调用路由中的函数来处理请求, 返回响应数据

<Route path="/test" component={Test}>
//前端路由：当浏览器的path变为/test时, 路由组件就会变为Test组件
//一个路径 path 对应一个组件 component 当我们在浏览器中访问一个 path 的时候，path 对应的组件会在页面中进行渲染
```

抽象路由???



必用库 react-router-dom

如何嵌套路由？向路由组件传递参数数据？多种路由跳转方式？

嵌套路由

```js
//配置:1. 使用 `children`属性配置路由嵌套关系  
//2. 使用 `<Outlet/>` 组件配置二级路由渲染位置
const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'board',
                element: <Board />,
            },
            {
                path: 'about',
                element: <About />,
            },
        ],
    },
];

const Layout = () => {
    return (
        <div>
            <div>我是Layout</div>
            <Link to="/board">面板</Link>
            <Link to="/about">关于</Link>
            {/* 二级路由出口 */}
            <Outlet />
        </div>
    );
}

```



```js
//lazyload
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))

	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



**路由导航**

路由之间跳转,同时传递参数通信

声明式导航:通过 `<Link/> ` 组件描述出要跳转到哪里去，比如后台管理系统的左侧菜单通常使用这种方式进行

编程式:通过 `useNavigate` 钩子得到导航，通过调用方法以命令式路由跳转，比如在登录请求完毕之后跳转可以选择这种方式，更加灵活

```js
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
            我是登录页
            <button onClick={() => navigate('/article')}>跳转至文章</button>
        </div>
    );
}

export default Login
```





**事件绑定**

`on + 事件名称 = {事件处理程序}`

在事件回调函数中设置形参e???

```js
function App(){
  const clickHandler = (e)=>{
    console.log('button clicked', e)
  }
  return (
    <button onClick={clickHandler}>click me</button>
  )
}
//传递自定义函数,clickHandler传递实参
function App(){
  const clickHandler = (name)=>{
    console.log('button clicked', name)
  }
  return (
    <button onClick={()=>clickHandler('jack')}>click me</button>
  )
}
//不能直接写函数调用，这里事件绑定需要函数引用????

//传递事件对象和自定义参数,clickHandler中声明形参
function App(){
  const clickHandler = (name,e)=>{
    console.log('button clicked', name,e)
  }
  return (
    <button onClick={(e)=>clickHandler('jack',e)}>click me</button>
  )
}
```



**组件**

用户界面一部分,互相嵌套,服用多次

```js
// 1. 定义组件
function Button(){
  return <button>click me</button>
}

// 2. 使用组件
function App(){
  return (
    <div>
      {/* 自闭和 */}
      <Button/>
      {/* 成对标签 */}
      <Button></Button>
    </div>
  )
}
```



数据mock实现

前端可以在没有实际后端接口的支持下先进行接口数据的模拟，进行正常的业务功能开发

 json-server实现mock demo????







**Redux** 

js.state库 不能异步变成，某些应用需要 redux 中异步任务(ajax, 定时器)

状态管理工具,类似vue.Pinia(vuex),可以独立框架运行,无视组件间的层级关系;单项数据流清晰，易于定位bug;方便调试

使用情况：某个组件的状态，需要让其他组件可以随时拿到（共享）；一个组件需要改变另一个组件的状态（通信）

redux+react绑定食用?????? 展开demo(异步action处理)

1.action (type(标识属性, 值为字符串, 唯一, 必要), data(值类型任意, 可选))

```js
{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }
```

2.reducer

```js
加工时，根据旧的state和action， 产生新的state的纯函数
```

3.store 核心管理对象

将state、action、reducer联系在一起的对象

```js
//get
1)import {createStore} from 'redux'
2)import reducer from './reducers'
3)const store = createStore(reducer)
//function
getState(): 得到state
dispatch(action): 分发action, 触发reducer调用, 产生新的state
subscribe(listener): 注册监听, 当产生了新的state时, 自动调用
```

**纯函数 vs 高阶函数**

不改写参数；不产生副作用（网络请求，IO）；不能调用 date.now()或者 math.random()等不纯方法

redux的reducer函数必须是一个纯函数



高阶函数 实现动态可扩展功能

1) 定时器设置函数
2) 数组的forEach()/map()/filter()/reduce()/find()/bind()
3) promise
4) react-redux中的connect函数

```js
setAttribute(name, value)
applyMiddleware()
combineReducers()
```



Fragment 不用一定存在真实 DOM 根标签

```js
<Fragment><Fragment>
```



**Context 组件通信（祖组件 with 后代组件）**

props是只读对象,可以传递任何合法数据,父组件数据只能被父组件修改

prop-children:内容嵌套在组件的标签内部时，组件会自动在名为children的prop属性中接收该内容??????

```js
const XxxContext = React.createContext()

<xxxCOntext.Provider.value = {data}>
      子组件
      </xxxContext.Provider>
//后代组件读取数据
//第一种方式:类组件
	  static contextType = xxxContext  // 接收context
	  this.context // 读取context.value数据

	//第二种方式: 函数组件/类组件
	  <xxxContext.Consumer>
	    {
	      value => ( // context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

应用开发一般不用context, 一般都用context.封装react插件



```js
//子传父
function Son({ onGetMsg }){
  const sonMsg = 'this is son msg'
  return (
    <div>
      {/* 在子组件中执行父组件传递过来的函数 */}
      <button onClick={()=>onGetMsg(sonMsg)}>send</button>
    </div>
  )
}


function App(){
  const getMsg = (msg)=>console.log(msg)
  
  return (
    <div>
      {/* 传递父组件中的函数到子组件 */}
       <Son onGetMsg={ getMsg }/>
    </div>
  )
}

//兄弟通信
//状态提升机制,通过父亲进行兄弟间数据传递 A -> App -> B
import { useState } from "react"

function A ({ onGetAName }) {
  // Son组件中的数据
  const name = 'this is A name'
  return (
    <div>
      this is A compnent,
      <button onClick={() => onGetAName(name)}>send</button>
    </div>
  )
}

function B ({ name }) {
  return (
    <div>
      this is B compnent,
      {name}
    </div>
  )
}

function App () {
  const [name, setName] = useState('')
  const getAName = (name) => {
    setName(name)
  }
  return (
    <div>
      this is App
      <A onGetAName={getAName} />
      <B name={name} />
    </div>
  )
}

export default App
```



```js
//跨层通信
//使用 `createContext`方法创建一个上下文对象Ctx 
//顶层组件（App）通过 `Ctx.Provider` 组件提供数据
// 底层组件（B）通过 `useContext` 钩子函数获取消费数据
// App -> A -> B

import { createContext, useContext } from "react"

// 1. createContext方法创建一个上下文对象

const MsgContext = createContext()

function A () {
  return (
    <div>
      this is A component
      <B />
    </div>
  )
}

function B () {
  // 3. 在底层组件 通过useContext钩子函数使用数据
  const msg = useContext(MsgContext)
  return (
    <div>
      this is B compnent,{msg}
    </div>
  )
}

function App () {
  const msg = 'this is app msg'
  return (
    <div>
      {/* 2. 在顶层组件 通过Provider组件提供数据 */}
      <MsgContext.Provider value={msg}>
        this is App
        <A />
      </MsgContext.Provider>
    </div>
  )
}

export default App
```









组件优化

Component 问题

1. 只要执行 setState(),即使不改变状态数据, 组件也会重新 render() ==> 效率低

2. 只当前组件重新 render(), 就会自动重新 render 子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

原因：Component 中的 shouldComponentUpdate()总是return true

```js
//solution
//1.重写shouldComponentUpdate(),比较新旧state或props数据, 如果有变化才返回true
//2.PureComponent重写shouldComponentUpdate(), 只有state或props数据有变化才返回true
//只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false；不要直接修改state数据, 而是要产生新数据；项目中一般PureComponent来优化
```

render props

```js
//向组件内部动态传入带内容结构
//children props:通过组件标签体传入结构
<A>
  <B>xxxx</B>
</A>
{this.props.children}
问题: 如果B组件需要A组件内的数据, ==> 做不到

//render props:通过组件标签属性传入结构,携带数据，用render函数属性
<A render={(data) => <C data={data}></C>}></A>
A组件: {this.props.render(内部state数据)}
C组件: 读取A组件传入的数据显示 {this.props.data}
```



Error boundary

捕获后代组件错误,不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误,渲染出备用页面

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error){
		console.log(error)
  // 在render之前触发
		return {
				hasError: true,
		}
}

componentDidCatch(error, info) {
  //统计页面错误,发送请求到后台
  console.log(error, info)
}
```

组件通信(父子,兄弟(非嵌套),祖孙(跨级))

```js
1.props：父子
		(1).children props
		(2).render props
	2.消息订阅-发布： 兄弟、祖孙
		pubs-sub、event
	3.集中式管理： 兄弟
		redux、dva等等
	4.conText: 祖孙
		生产者-消费者模式
```



**react router 6**

三个包发布在npm上

react-router:组件,钩子??

react-router-dom: router所有内容+用于DOM组件(<BrowserRouter>)

React-router-native: router所有内容+用于ReactNative的API(<NativeRouter>)



```js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    {/* 整体结构（通常为App组件） */}
  </BrowserRouter>,root
)
```

<HashRouter>作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的hash值

```js
<Routes>
    /*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/
    <Route path="/login" element={<Login />}></Route>

		/*用于定义嵌套路由，home是一级路由，对应的路径/home*/
    <Route path="home" element={<Home />}>
       /*test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/
      <Route path="test1" element={<Test/>}></Route>
      <Route path="test2" element={<Test2/>}></Route>
		</Route>
	
		//Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
    <Route path="users">
       <Route path="xxx" element={<Demo />} />
    </Route>
</Routes>
```



```js
import { Link } from "react-router-dom" //修改URL，且不发送网络请求（路由链接）
//外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹
function Test() {
  return (
    <div>
    	<Link to="/path">button</Link>
    </div>
  );
}
```



```js
// NavLink默认类名是active，下面是指定自定义的class

//自定义样式
<NavLink
    to="login"
    className={({ isActive }) => {
        console.log('home', isActive)
        return isActive ? 'base one' : 'base'
    }}
>login</NavLink>

/*
	默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
	当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
*/
<NavLink to="home" end >home</NavLink>
```

