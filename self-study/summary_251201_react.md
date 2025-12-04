**JSX为什么只允许有一个父节点？**

react在比较新旧虚拟DOM采用同层比较策略（最小节点比较原则） 如果JSX有多个根节点 导致diff打算处理更复杂属性结构比较 降低性能且增加实现复杂度

多节点会使组件渲染结果变得不确定（缺少稳定的key，fragment隐式key[使用 <>...</> 时，React 内部会生成 key，但这些 key 可能不稳定]

JSX最终会被转译为`React.createElement()`（接收一个根元素作为参数，根节点多个导致转译后代码难处理）调用



如何处理jsx的多节点

```js
//1.显式 Fragment 添加 key
function Component({ items }) {
  return (
    <React.Fragment key="container">
      <div key="header">Header</div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <div key="footer">Footer</div>
    </React.Fragment>
  );
}
//2.单个根元素包裹
function Component({ items }) {
  return (
    <div>
      <div>Header</div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <div>Footer</div>
    </div>
  );
}
//确保条件渲染的稳定性
function Component({ showExtra }) {
  return (
    <>
      <div key="a">A</div>
      {showExtra ? <div key="b">B</div> : null}
      <div key="c">C</div>
    </>
  );
}
```



限制

| diff算法 | 特点                                       | 限制                                                         |
| -------- | ------------------------------------------ | ------------------------------------------------------------ |
|          | 采用分层比较策略，只比较同层级的节点       | 按位置（索引）比较同级节点。                                 |
|          | 使用key值优化列表对比，减少不必要的DOM操作 | 类型相同则复用，不同则重建                                   |
|          | 默认采用双指针算法进行同级比较             | 多根节点时，位置关系可能被误判。如果没有key react按照顺序比较子节点 导致性能问题 |
|          | 当组件类型不同时会直接销毁重建整个子树     |                                                              |

比较子节点列表，通过key属性识别节点哪些新增、移动、删除 

再根据比较结果 生成最小更新操作 应用到真实DOM



**何时添加refs？**

react每次更新都是两阶段

| 阶段 |                                | status                                  |
| ---- | ------------------------------ | --------------------------------------- |
| 渲染 | React 调用组件确定屏幕显示什么 | `ref.current`=null                      |
| 提交 | React 把变更应用于 DOM         | React 立即将它们设置到相应的 DOM 节点。 |

**何时使用ref？**

存储timeoutID

存储和操作 DOM 元素

存储不需要被用来计算 JSX 的其他对象



| 区别     | ref                                      | state                                                    |
| -------- | ---------------------------------------- | -------------------------------------------------------- |
| 用途     | 访问DOM节点/保存不会触发渲染的可变值     | 存储组件内部状态数据，state变化时触发组件重新渲染        |
| 更新机制 | 修改ref.current的值不会导致组件重新渲染  | 修改state使用setState/useState的setter函数，触发重新渲染 |
| 使用场景 | 适合存储不需要触发渲染的数据/访问DOM元素 | 适合存储会影响UI渲染的数据                               |
| API      | 通过useRef或React.createRef创建          | 通过useState或this.state/this.setState管理               |
| 响应性   | ref的变化需要手动处理，不会自动更新UI    | 变化自动反映在UI上                                       |



fragment 片段

```js
//1.<React.Fragment>
//需要给 Fragment 添加 key 属性时（例如在列表渲染中），必须使用完整语法
import React from 'react';

function Component() {
  return (
    <React.Fragment>
      <td>单元格1</td>
      <td>单元格2</td>
    </React.Fragment>
  );
}

//2.<>...</>
function Component() {
  return (
    <>
      <td>单元格1</td>
      <td>单元格2</td>
    </>
  );
}
```

|              | fragment   | 普通元素（div） |
| ------------ | ---------- | --------------- |
| DOM节点      | 不创建     | 创建            |
| 可以添加key  | √ 完整语法 | √               |
| 可以添加属性 | ×          | √               |
| 影响布局     | ×          | 可能影响        |
| 性能         | 更轻量     | 稍重            |



#### 高阶组件 HOC（Higher-Order Component）？？？

函数，接收一个组件并返回一个新的增强组件，概念类似高阶函数，但用于组件

```js
// 高阶函数示例
const higherOrderFunction = (fn) => {
  return (...args) => {
    console.log('调用前');
    const result = fn(...args);
    console.log('调用后');
    return result;
  };
};

// 高阶组件示例
const higherOrderComponent = (Component) => {
  return (props) => {
    // 增强逻辑
    return <Component {...props} />;
  };
};
```

高阶组件通过包裹（wrapped）被传入的 React 组件，经过一系列处理，最终返回一个相对增强（enhanced）的 React 组件，供其他组件调用。

1. 复用逻辑：高阶组件更像是一个加工 react 组件的工厂，批量对原有组件进行加工，包装处理。我们可以根据业务需求定制化专属的 HOC,这样可以解决复用逻辑。
2. 强化 props：这个是 HOC 最常用的用法之一，高阶组件返回的组件，可以劫持上一层传过来的 props,然后混入新的 props,来增强组件的功能。代表作 react-router 中的 withRouter。
3. 赋能组件：HOC 有一项独特的特性，就是可以给被 HOC 包裹的业务组件，提供一些拓展功能，比如说额外的生命周期，额外的事件，但是这种 HOC，可能需要和业务组件紧密结合。典型案例 react-keepalive-router 中的 keepaliveLifeCycle 就是通过 HOC 方式，给业务组件增加了额外的生命周期。
4. 控制渲染：劫持渲染是 hoc 一个特性，在 wrapComponent 包装组件中，可以对原来的组件，进行条件渲染，节流渲染，懒加载等功能，后面会详细讲解，典型代表做 react-redux 中 connect 和 dva 中 dynamic 组件懒加载。



HOC vs Hooks

hook可以替代HOC

```js
// 使用 HOC
const UserProfile = withAuth(withData(Profile, '/api/user'));

// 使用 Hooks（更清晰）
function UserProfile() {
  const isAuthenticated = useAuth();
  const { data, loading } = useData('/api/user');
  
  if (!isAuthenticated) return <div>请登录</div>;
  if (loading) return <div>加载中...</div>;
  
  return <Profile data={data} />;
}
```



**组件通信**

1.父子组件通信（常用）

父传子：props向下传递数据

子传父：回调函数（父组件传递函数给子组件，子组件调用时传参）

```js
// 父组件
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleChildClick = (childData) => {
    console.log('来自子组件的数据:', childData);
  };

  return <Child count={count} onChildClick={handleChildClick} />
}

// 子组件
function Child({ count, onChildClick }) {
  return (
    <button onClick={() => onChildClick('子组件数据')}>
      click me {count}
    </button>
  );
}
```



2.跨层级组件通信

- Context API：适合全局状态（如主题、用户信息等）
- 状态管理库：Redux/MobX等（复杂场景）
- 事件总线（较少用，可能引起维护问题）

```js
//context
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button style={{ background: theme === 'dark' ? '#333' : '#EEE' }}>button</button>;
}
```

- 简单父子关系优先用props（只能向下传递 父 → 子）深层嵌套会出现"prop drilling"（逐层传递）
- 深层嵌套考虑Context
- 复杂全局状态用Redux

```js
// ❌ 使用 props - 出现 prop drilling
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <Layout theme={theme}>
      <Header theme={theme}>
        <Navigation theme={theme}>
          <Menu theme={theme} />
        </Navigation>
      </Header>
    </Layout>
  );
}

// ✅ 使用 Context - 避免 prop drilling
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout>
        <Header>
          <Navigation>
            <Menu /> {/* 直接使用 useContext(ThemeContext) */}
          </Navigation>
        </Header>
      </Layout>
    </ThemeContext.Provider>
  );
}

//redux 调试强大 有中间件支持 有时间旅行
// 复杂状态场景示例
// - 多个组件需要共享状态
// - 状态之间有复杂的依赖关系
// - 需要撤销/重做功能
// - 需要中间件（日志、异步处理等）
// - 需要时间旅行调试

// Redux 示例
const store = createStore(reducer, applyMiddleware(thunk, logger));

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
      <Sidebar />
      <Header />
    </Provider>
  );
}

// 任何组件都可以访问状态
function Dashboard() {
  const user = useSelector(state => state.user);
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  
  // 复杂的状态逻辑
  useEffect(() => {
    dispatch(fetchUserPosts(user.id));
  }, [user.id, dispatch]);
  
  return <div>...</div>;
}

//alternative method
// zustand 比 Redux 更简单，但功能强大
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Component() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  return <button onClick={increment}>{count}</button>;
}

// Jotai / Recoil
// 更细粒度的状态管理
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

function Component() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

避免过度使用Context导致组件不必要的重渲染



**hook规则**

只在顶层使用 每次渲染以相同顺序调用hook

只在react函数组件中用hook：只在react函数组件/自定义hook使用hook 不在普通js函数/类组件使用hook



**为什么react的hook不能放在条件表达式？**

- React 内部是通过一个调用栈来跟踪组件的状态和副作用。
- 如果Hook 在某些条件下被跳过、重新排列，React 无法追踪管理状态，可能导致 bugs /不符合预期行为。
- Hook 在函数组件`渲染时`被执行。如果条件语句（如 `if`）控制 Hook 执行顺序,某些 Hook 可能在某次渲染中被调用，其他渲染中则不被调用，破坏了 Hook 的调用顺序。





**虚拟DOM virtual DOM** 编程概念 

用一个js对象来表示整个DOM结构，当状态发生改变时会先比较前后两个js对象，得到最小操作序列再应用到真实的DOM上

reconciliation（协调）：用virtual UI表示形式保存在内存 通过库（reactDOM）和真实DOM同步

目的：计算最少DOM操作 提高UI重新渲染性能 不是和真实DOM竞争 不一定比真实DOM快 提供一种机制（开发者不用手动操作DOM 可以写出更可预测代码）



|      | 真实DOM       | 虚拟DOM                                   |
| ---- | ------------- | ----------------------------------------- |
| 优势 | 易用          | 简单方便                                  |
| 缺点 | 效率低 性能差 | 性能要求高无法优化 首次渲染大量DOM 速度慢 |
| 区别 | 频繁重排重绘  | 跨平台 不重排重绘                         |



**useContext**

```js
// 1.创建上下文（Context）,包含一个 Provider 组件和一个 Consumer 组件。
const MyContext = React.createContext();
//2. 使用 Provider 组件包裹组件树。通过 value 属性传递需要共享的数据。
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const contextValue = { /* 共享数据 */ };
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

//3. 需要使用上下文值的组件中，使用 useContext Hook 获取上下文值。
import MyContext from './MyContext';

const MyComponent = () => {
  const contextValue = useContext(MyContext);

  // 现在可以使用 contextValue 中的数据了
  return (
    <div>
      {/* 使用 contextValue 中的数据 */}
    </div>
  );
};
```



**子孙组件如何修改通过useContext获取的值**

使用 `useState` 和 `useContext`

```js
// 创建上下文
const MyContext = createContext();

function App() {
  const [value, setValue] = useState('initial value');

  // 提供上下文
  return (
    <MyContext.Provider value={{ value, setValue }}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

function ChildComponent() {
  const { value, setValue } = useContext(MyContext);

  // 修改上下文中的值
  const changeValue = () => {
    setValue('new value');
  };

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={changeValue}>Change Value</button>
    </div>
  );
}
```

使用 `useReducer`

```js
const MyContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { value: 'initial value' });

  // 提供上下文
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

function ChildComponent() {
  const { state, dispatch } = useContext(MyContext);

  // 修改上下文中的值
  const changeValue = () => {
    dispatch({ type: 'CHANGE_VALUE', payload: 'new value' });
  };

  return (
    <div>
      <p>Value: {state.value}</p>
      <button onClick={changeValue}>Change Value</button>
    </div>
  );
}
```



**React 的 useContext 因为value变化导致组件刷新怎么解决？**

|      | 问题                                        | 方案                                                         |
| ---- | ------------------------------------------- | ------------------------------------------------------------ |
| 1    | 避免直接将复杂对象作为 Context 的 value     | 避免每次渲染时都创建新的对象或数组作为 `value`，因为引用的变化会导致组件重新渲染 |
|      |                                             | 使用 `useMemo` 或 `useCallback` 来缓存 `value`，确保只有在值实际变化时，`value` 的引用才会改变 |
| 2    | 拆分 Context，减少不必要的重新渲染          |                                                              |
| 3    | 使用 `React.memo` 或 `useMemo` 优化组件     | `React.memo` 是一个高阶组件，用于包裹子组件并避免不必要的重新渲染。结合 `useContext` 使用，以确保当上下文变化时，只有需要更新的子组件才会重新渲染 |
| 4    | 避免过多的 Context 订阅                     | 合并到一个上下文中 减少组件订阅数量。通过将多个相关值组合到一个对象中 使用useMemo/useCallback优化 减少组件重新渲染 |
| 5    | 使用 `useReducer` 优化 Context 中的状态管理 | 一些复杂的场景中，使用 `useReducer` 管理 Context 状态比直接使用 `useState` 高效 集中处理更新逻辑 |



|          | useContext                                                   | useReducer                                                   |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 功能     | 访问 React 的上下文 (context) 对象,在组件树中共享状态和行为  | 是 useState 的替代方案,用于通过 reducer 函数管理复杂的状态逻辑 |
| 状态管理 | 通过在组件树共享 context 对象管理状态。context 在多组件中使用,避免prop drilling | 通过 reducer 函数管理组件内部的状态，处理复杂状态逻辑        |
| 状态更新 | 更新 context 对象，通知所有使用该 context 组件重新渲染       | 更新状态时触发当前组件重新渲染,不影响其他组件                |
| 适用场景 | 应用程序级别的状态管理,如主题、当前登录用户                  | 组件内部的复杂状态管理,如表单状态、多个状态之间的依赖关系    |
| 结合适用 | 二者可以结合使用。可以在组件树中共享这些状态                 | 管理组件内部状态                                             |

|              | useReducer                                                   | Redux                                                        |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 实现方式     | React 内置Hook,通过 reducer 函数管理组件内部状态。状态更新时触发组件重新渲染 | 一个独立状态管理库,提供`createStore`、`dispatch`、`subscribe` 等 API 管理全局状态。状态更新时通知所有订阅组件重新渲染。 |
| 状态管理范围 | 管理组件内部状态逻辑,状态范围相对较小                        | 管理应用程序级别全局状态,状态范围较大,适用于复杂应用程序     |
| 状态更新机制 | 态更新时只会触发当前组件重新渲染,不会影响其他组件            | 状态更新时会通知所有订阅该状态组件重新渲染                   |
| 代码结构     | 状态管理逻辑集中在 reducer 函数中,组件内部可以直接访问和更新状态 | 要创建 store、reducer、action 等多个模块,代码结构相对更加复杂 |
| 适用场景     | 适用于组件内部状态管理,尤其在处理复杂的状态逻辑时            | 适用于大型应用程序的全局状态管理,可以方便状态追踪和时间旅行调试 |



|          | useMemo                                                      | useCallback                    |
| -------- | ------------------------------------------------------------ | ------------------------------ |
| 用途     | 缓存计算结果，避免重复计算                                   | 缓存函数本身，避免函数重复创建 |
| 返回值   | 计算结果的缓存值                                             | 函数的缓存引用                 |
| 使用场景 | 需要复杂计算的场景 const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]); | 需要保持函数引用稳定的场景     |
| 性能优化 | 都是性能优化手段但优化对象不同，usememo优化计算过程          | 优化函数引用                   |



**setState**

参数两种形式  用于类组件 该方法通过 `this` 关键字在类组件内部调用 react夜壶优化 但有时需要使用 `shouldComponentUpdate` 生命周期方法手动优化

```js
//1.对象形式
this.setState({ property1: value1, property2: value2 })
//2.函数形式（key异步更新 访问props）
this.setState((prevState, props) => {
  return { /* new state */ };
})
```

同步异步取决于调用setstate环境

| 异步                                                         | 同步                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 在合成事件和生命周期函数中，`setState`是异步的。调用`setState`后，React 不会立即更新组件的状态，而是将状态更新放入一个队列中,取最后一次执行的结果 | 在原生事件，React 无法控制代码的执行顺序，所以需要立即更新组件的状态 |
|                                                              | 在`setTimeout`、`setInterval`等函数中，`setState`也是同步    |

| setState(i+1)                                                | setState(i=>i+1)                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 直接传递一个对象，它不会接收到当前的状态值，因此在异步操作中可能导致状态更新不正确 | 传递一个函数，函数接收当前的状态值作为参数`i`，返回新状态值。确保在异步操作中获取到最新的状态值。 |



**useState 为什么使用数组而不是对象？**

```js
const[count,setCount] = useState(0);

// 数组解构
const foo =[1,2,3]
const [one,two,three] = foo; //可以自己命名
console.log(one,two,three);

//对象解构
const user ={ id :123, name :'123'} 
const {id,name} =user; //必须使用原本的key
console.log(id,name);

const { state,setState} = useState(false);
const { state: counter,setState:setCounter} = useState(0);


const [state, setState] = useState(initialState)
//lazy loading
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
})

const [user, setUser] = useState(() => {
  const initialUser = JSON.parse(localStorage.getItem('user'))
  return initialUser || { name: 'John Doe', age: 30 }
})
```



**useEffect**

useEffect(func,[])

- 第二参数无值，每次组建渲染都会触发
- 第二个参数是空数组，相当于componentDidmount 挂载时
- 第二个参数有值，参数发生变化时触发
- 第一个参数函数里加入return 相当于componentUnDidmount 销毁时





**React hook vs 生命周期**





**网络请求在 componentWillMount 和 componentDidMount 有什么区别**

|              | componentWillMount                                           | componentDidMount                                            |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 调用时机     | 在组件挂载前调用                                             | 在组件挂载后调用                                             |
| 服务器端渲染 | 在服务器端渲染时也被调用                                     | 只在客户端渲染时调用                                         |
| 网络请求     | 由于 `componentWillMount` 可能在服务器端渲染时被调用，因此不推荐在该方法中发起网络请求 | 发起网络请求的最佳位置，因为它保证了组件已经挂载到 DOM 中    |
| 副作用操作   |                                                              | 执行副作用操作（如发起网络请求、设置定时器、订阅事件等）的理想位置，因为这些操作通常需要在组件挂载到 DOM 后执行 |



**初始渲染数据放在哪个⽣命周期？**

初始渲染数据通常放在 `constructor` 中初始化状态，或者使用 `getDerivedStateFromProps` 来根据初始的 props 设置状态。

对于网络请求等副作用操作，应放在 `componentDidMount` 生命周期方法中执行。



**Redux**

1. 基于 Flux 架构思想的状态管理库。

2. 单一数据源，有且仅有一个store来存储状态。

3. 状态只读：当状态改变时，reducer会根据原有的状态计算并返回一个全新的状态，而不是直接修改旧状态。

4. reducer是一个纯函数，接收当前的状态和action作为输入，根据action的类型来处理状态的更新，并返回一个新的状态。

5. 单向数据流：View通过action分发给reducer更新store中的状态，并且从store中获取状态来渲染。

6. action是一个js对象，包含type字段用于标识操作类型，也可以包含可选字段来传递数据。
7. 中间件：在action和reducer之间处理自定义逻辑，如异步操作、日志记录、错误处理等。



#### ⼯作流程：

a. 调⽤ store.dispatch(action) 来发起⼀个action。

b. 将当前的状态树和action传递给reducer计算新的状态。

c. 应⽤可能有多个reducer，每个reducer管理状态树的⼀部分。根reducer将这些独⽴部分组合成⼀个单⼀的状态树。

d. store.subscribe监听变化。之后store通知所有订阅



#### Redux中的异步请求怎么处理

`redux-thunk` 中间件

- createStore时使用，applyMiddleware(thunk)
- 编写异步action creators，接收dispatch`和`getState 并在适当的时候调用dispatch来发送同步action
- 在组建中的mapDispatchToprops中分发异步action

#### 

#### useSelector原理

1. 使用 `useContext` 来访问 `react-redux` 提供的 `ReactReduxContext`。包含了store 的引用。
2. 会订阅该 store 的状态变化。当 store 的状态更新时，`useSelector` 都会重新执行，并且返回的值发生变化，组件就会重新渲染。
3. `useSelector` 的返回值相同，组件就不会重新渲染。

#### useDispatch原理

1. 使用 `useContext` 钩子来访问 `ReactReduxContext`。
2. 直接获取 `dispatch` 函数，并将其作为返回值。
3. 可以被用来分发任何 action，就像你在 Class 组件中使用 `this.props.dispatch` 一样。



**Fiber**

react新的调度算法 通过创建fiber树表示UI渲染过程

工作流程：

1. **Fiber 树的构建**：React 在渲染时会创建一个 Fiber 树，每个 Fiber 节点代表一个 React 元素，包含组件的信息、状态以及渲染任务。
2. **调度机制**：Fiber 通过调度器将渲染任务分割成多个较小的单元。每个任务被赋予一个优先级，这些任务可以根据任务的优先级来处理。例如，用户交互相关的更新（如点击、输入等）通常会有更高的优先级，而非关键的更新（如数据加载）会有较低的优先级。
3. **分片执行**：Fiber 将渲染过程分为多个“小片段”，每个片段的执行时间非常短，以避免长时间的阻塞。Fiber 允许任务在每一帧之间暂停，待浏览器空闲时继续执行，保持 UI 的响应性。
4. **空闲时间段的执行**：Fiber 会检测浏览器的空闲时间并根据优先级选择性地执行任务。浏览器的空闲时间通常通过 `requestIdleCallback` API 来捕捉，React 会在此时调度低优先级的任务（如动画、非关键数据更新等）。



**如何实现空闲时间段执行任务**

1. **任务队列**：所有的渲染任务会被放入一个任务队列（或称为工作队列）。每个任务都有优先级，React 会先执行优先级高的任务（比如用户输入、点击事件等），再执行优先级低的任务（如背景数据加载）。
2. **调度算法（Scheduler）**：React 使用 **Scheduler** 来管理这些任务，它根据当前的任务优先级和浏览器的空闲时间，决定什么时候执行哪些任务。调度器会在每一帧执行后判断是否有更多任务可以执行。
3. **空闲时间检测**：通过 `requestIdleCallback`（浏览器 API）或者 React 的内部机制，React 会检测到浏览器是否处于空闲状态，如果是，就会调度低优先级任务。
4. `requestIdleCallback` API： 
   - 这个浏览器 API 用来在浏览器空闲时运行某些低优先级的操作。React 可以在这段时间里完成不那么重要的任务，例如更新后台状态或进行一些非紧急的 UI 渲染。
5. **`yield` 和 `setTimeout`**：React 可以使用 `setTimeout` 等方式将渲染工作分成更小的部分，每次执行一小段，然后返回控制权给浏览器，这样就可以在空闲时段继续渲染。



**react的路由有哪几种模式？**

- **HashRouter**：使用 URL 的哈希部分（即#后面的部分）来处理路由，无需服务器配置，兼容性良好，路由信息保存在哈希部分。
- **BrowserRouter**：使用 HTML5 的 History API 来管理路由，无需哈希部分，使用 History API 实现路由导航和状态管理，需要服务器配置
- **MemoryRouter**：将路由状态存储在内存中，适用于不需要浏览器 URL 导航的情况。
- **NativeRouter**：用于在 React Native 应用中进行导航和路由管理。
- **StaticRouter**：用于在服务器端渲染或静态网站生成时进行路由管理。



#### 跳转路由组件怎样销毁

1. **使用`componentWillUnmount`生命周期方法**：
2. **在路由切换时取消异步操作**：如果在组件中进行了异步操作，例如发送网络请求，可以在路由切换前取消这些操作，以防止在组件销毁后异步操作返回并更新组件状态；
3. **取消订阅事件**：如果组件订阅了某些事件，例如`Redux`的`store`事件或其他全局事件，需要在组件销毁时取消订阅，以避免内存泄漏；
4. **使用`useEffect`的清理函数**：如果使用了`useEffect`钩子来执行副作用操作，可以在`useEffect`的返回函数中进行清理操作，例如取消订阅、清除定时器等。



#### react-router里的Link标签和a标签有什么区别

`<Link>` 标签是 React Router 中专门用于路由导航的组件，提供了更方便和高效的方式来路由切换。

而 `<a>` 标签则是 HTML 中的标准链接标签，用于链接导航。

在使用 React Router 时，通常建议使用 `<Link>` 标签来实现路由功能，以充分利用其与路由系统的集成和优化。但在某些情况下，可能仍然需要使用 `<a>` 标签来链接到外部资源或执行其他与路由无关的操作。



**组件加载方式**

- **按需加载**：使用 `React.lazy` 和 `Suspense` 实现组件按需加载。
- **分批渲染**：使用虚拟列表或分页技术分批渲染数据。
- **图片懒加载**：使用 `IntersectionObserver` 实现图片懒加载。



|          | react                                                 | react native                                                 |
| -------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| 目标平台 | 构建 Web 应用程序的 JavaScript 库                     | 用于构建跨平台移动应用程序的框架,可以在 iOS 和 Android 上运行 |
| UI组件   | 使用 HTML 元素作为 UI 组件,如 `div`、`span`、`button` | 使用原生移动平台的 UI 组件,如 `View`、`Text`、`Image` 等,这些组件直接映射到原生的 UI 元素 |
| 开发体验 | 开发者使用浏览器的开发者工具调试和测试                | 开发者使用特定于移动平台的开发工具,如 Xcode 和 Android Studio |



**React项目性能优化**

| **`React.memo`**                                             | 默认包裹组件对props浅比较（比较两个对象引用是否相同），确定是否更新，使用自定义 React.memo(MyComponent, (prevProps, nextProps) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `React.lazy` 和 `Suspense` 实现动态组件导入和加载            |                                                              |
| React.PureComponent                                          | 对组件的 props 和 state 浅比较。  class MyComponent extends React.PureComponent { |
| 使用 `useCallback` 和 `useMemo` Hooks 缓存计算结果           | `useCallback` 缓存函数引用,`useMemo` 缓存计算结果,减少重复计算 |
| 使用 `windowing` 或 `virtualization` 技术优化长列表性能      | 仅渲染可见区域,减少 DOM 操作                                 |
| 使用 `React.Fragment` 减少 DOM 节点                          | `React.Fragment` 在不添加额外 DOM 节点的情况下对子元素分组   |
| React.Profiler 性能分析                                      | 帮助识别应用程序性能瓶颈                                     |
| 使用 `shouldComponentUpdate` 生命周期方法使用nextProps, nextState进行 Props 和 State 浅层比较 | 通过比较 props 和 state 的变化,决定是否需要重新渲染组件      |
| 使用 `React.StrictMode` 发现隐藏性能问题                     | `React.StrictMode` 帮助发现应用程序中的一些潜在问题,例如意外副作用 |
| 大组件拆分成小组                                             | 优势在于小组件内state更新后不影响大组件render                |



### Suspense原理

1. 当 `Suspense` 包裹的组件中触发异步操作时，`Suspense` 会将该组件标记为暂停状态。
2. 当组件被标记为暂停状态后，`Suspense` 会使用备用内容。
3. `Suspense` 会监听异步操作。一旦异步操作完成。
4. `Suspense` 会将组件的暂停状态解除，并重新渲染被包裹的组件



### React渲染流程

1. babel把 jsx代码转为 React.createElement（16），jsx(17 react/jsx-runtime） 形式叫render方法。
2. render方法返回虚拟dom
3. react把虚拟dom转为fiber，过程分为beighwork和completeWork
4. beighwork 从下往上 将vdom 转 fiber，比较虚拟 DOM 和旧虚拟DOM，找出需要更新部分，
   1. 对于需要更新部分，React 创建一个更新队列，按照优先级顺序依次更新 DOM
   2. 更新过程中，React 递归渲染子组件,
   3. 渲染过程中，React 调用组件生命周期钩子 如果组件状态变化
   4. 再次调用render()，重复上述渲染流程
5. completeWork 从上往下 按顺序创建元素，组装成 dom 树。



**Webpack**

静态资源打包工具 输出编译好文件 放在浏览器直接运行

本身功能有限：编译js中es module语法 压缩js代码



基本配置 5大核心概念

1. Entry(入口) 提示webpack从哪个文件开始打包
2. Output（输出） 指示webpack打包完的文件输出到哪里去，如何命名
3. Loader(加载器) webpack本身只能处理js\json等资源，其他资源需要借助loader,webpack才能解析
4. Plugin(插件) 拓展webpack的功能
5. Mode(模式) development, production

```js
const path = require("path")
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"), //绝对路径
        filename: "main.js",
    },
    // 加载器
    module: {
        rules: [
       ]
    },
    plugins: [
    ],
    mode: "development",
}
```



**loader vs plugin**

**Loader**
本质是函数，处理非js文件，如css图片字体
在module.rules中定义

常见：
babel：将es6+代码转换为es5
css：处理css文件
file：处理图片、字体等文件
sass：将sass代码转换为css
postcss：预处理css
url：和file作用一样，设置一个limit，小于它时返回url



**Plugin**
具有apply方法的js对象，访问webpack完整的编译生命周期，修改各种配置
能解决loader无法实现的其他自定义需求，如文件压缩，资源优化等
在plugins数组中定义

常见：
HtmlWebpackPlugin：自动生成html文件
MiniCssExtractPlugin：将css从bundle中提取为单独的文件
OptimizeCssAssetsWebpackPlugin：优化和最小化css资源
webpack.HotModuleReplacementPlugin：开启模块化热替换功能
clean-webpack-plugin：删除构建目录
DefinePlugin：允许在编译时创建配置的全局对象，不需要安装
copy-webpack-plugin：赋值文件或者目录到执行区域，例如vue的打包过程中，如果将一些文件放在public下，打包后就会放到dist文件夹中，复制的规则在patterns属性中设置：

- from：设置从哪一个源中开始复制
- to：复制到的位置，可以省略，会默认复制到打包的目录下
- globOptions：设置一些额外的选项，其中可以编写需要忽略的文件



**webpack遇到import如何解析出来？**

1. 遇到import会使用模块解析器，解析 `import` 语句中的模块标识符，将其转换为模块相对/绝对路径
2. 根据模块路径查找对应模块文件，加载并执行模块代码。
3. 加载模块中，解析内部 `import` 语句，递归处理模块依赖关系，构建模块依赖图。
4. 根据模块依赖图，将所有模块打包成1/n个输出文件。



**AST？**

抽象语法树 编译器/解释器在编译/解释源代码时构建的中间表示形式

每个节点表示源代码中语法结构，节点之间关系表示源代码逻辑关系

通过分析 AST做语法检查、代码优化、代码生成



**如何生成AST？**

词法分析：词法分析器负责将源代码文本分解成一个个的词法单元（源代码的最小有意义的单元）

语法分析：语法分析器会检查是否语法规则，并构建出一棵树状结构AST



**Babel**

js编译器

核心库：core（解析、转换、生成代码），cli（命令行接口），preset-env（智能预设）



**ESLint**

静态代码分析⼯具，识别JavaScript代码中的模式和错误



**Tree Shaking** 摇树优化

通过移除多余代码优化打包体积技术 生产环境默认开启 可以再代码不运行时分析出不需要的代码 发生在webpack优化阶段



**持久化缓存？**

服务端设置http缓存头 （cache-control）实现强缓存或协商缓存

• 使用前端存储方案，比如local session Storage

• 使用service worker的api实现离线缓存

• webpack打包中，配置contenthash生成带哈希值的文件名，对资源强缓存



**webpack生命周期**

1. 初始化阶段：

- 读取与合并配置参数
- 加载所有配置的插件
- 初始化Compiler对象（整个构建过程的核心对象）

2. 编译阶段：

- 入口文件开始，递归分析依赖关系
- 对每个模块调用loader转译
- 构建模块依赖图(Module Graph)

3. 输出阶段：

- 根据入口和模块依赖关系，组装成多个chunk
- 每个chunk转换成一个单独文件
- 输出指定output目录





**CDN原理**

内容分发网络

**分布式存储**：在多个地理位置部署了大量的服务器节点

**缓存机制**：当用户请求资源时，会首先检查本地节点是否有缓存的该资源。如果有，就直接提供，减少了数据传输的距离和时间，提高了访问速度。

**智能路由**：根据用户的地理位置、网络状况等因素，将用户的请求导向距离最近、网络状况最佳的节点，以确保数据能够快速、可靠地传输到用户。

**内容更新**：当网站或应用的内容发生更新时，源站会将更新信息推送到 CDN 网络，CDN 节点会及时更新缓存的内容。

**负载均衡**：将大量用户的请求分散到不同的节点上，避免单个服务器负载过高。



**生命周期钩子**

- `entry-option`：读取配置文件后，初始化 Compiler 之前触发。
- `after-plugins`：在所有内置插件和用户定义的插件被添加到 Compiler 后触发。
- `compiler.hooks.run`：在 Compiler 开始执行编译后触发。
- `compiler.hooks.compile`：在创建新的编译(compilation)对象时触发。
- `compilation.hooks.optimize`：在优化阶段开始时触发。
- `compilation.hooks.afterOptimizeAssets`：在优化阶段完成后触发。
- `compilation.hooks.processAssets`：在处理资源阶段触发。
- `emit`：生成资源到输出目录之前触发。
- `done`：完成所有编译过程后触发。



**webpack热更新原理**

1. **编译器（Compiler）**：Webpack 编译器在编译过程中生成一个 HMR 更新的清单。包含模块的 ID 和更新后的哈希值。
2. **运行时（Runtime）**：HMR 运行时被注入到入口文件中。负责与编译器通信，接收，并根据清单中信息来决定哪些模块需要更新。
3. **模块更新**：当检测到模块更新时，会请求编译器提供更新后的模块代码。编译器会将更新后的模块代码发送给运行时。
4. **模块替换**：接收到更新后的模块代码后，使用一种策略来替换旧模块。对于 CSS 模块，直接替换样式表。对于 JavaScript 模块，运行时尝试使用一种热替换逻辑更新模块。
5. **通知应用**：会通知应用哪些模块被更新了，在这个过程中添加自定义逻辑处理模块更新。

webpack proxy

```js
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 代理到的服务器地址
        pathRewrite: {'^/api' : ''}, // 重写路径，去除请求中的 '/api'
        changeOrigin: true, // 允许改变请求头中的 host
      },
    },
  },
};
```



**代理原理**

工作流程：

1. 浏览器向代理服务器发送请求。
2. 代理服务器接收到客户端请求后，根据配置规则决定如何处理这个请求。
3. 将请求转发到目标服务器。
4. 目标服务器处理请求并返回响应给代理服务器。
5. 代理服务器接收到目标服务器的响应后，可能对响应处理后返回给客户端。



类型：

- **正向代理**：用于客户端，配置代理服务器地址，通过代理服务器访问外部网络。隐藏客户端的真实 IP 地址，匿名访问。
- **反向代理**：用于服务器端，客户端直接访问反向代理服务器，反向代理服务器根据请求的 URL 路径将请求转发到后端服务器。反向代理可以实现负载均衡、缓存、安全过滤等功能



### ts 编写的库， 使⽤ webpack 构建的时候，如何对外提供 d.ts？

类型声明文件(.d.ts)让使用库的其他TypeScript开发者获得完整的类型提示和检查，比如代码补全、参数类型提示等

- 首先确保tsconfig.json中配置`"declaration": true`，编译时会自动生成.d.ts文件

- 在webpack配置中，设置output的libraryTarget为"umd"，确保库能兼容不同环境
- 在package.json中通过"types"或"typings"字段指定主声明文件路径



|            | import                              | require            |
| ---------- | ----------------------------------- | ------------------ |
| 语法       | ES6 引入的模块导入语法              | CommonJS 规范      |
| 静态和动态 | 静态 编译时确定模块的依赖关系       | 运行时动态加载模块 |
| 异步特性   | 值的引用 模块内部变化会影响到import | 值的拷贝           |



**微应用模式下，模块联邦的好处是什么**

跨应用共享代码

独立开发和部署

运行时动态加载

版本控制更灵活

降低维护成本



**webpack 如何手写 plugin**

webpack plugin：具有apply方法的JavaScript对象（或类实例）

```js
class MyPlugin {
  apply(compiler) {
    // 这里注册hook回调
  }
}
```

``` js
//日志插件
class LogOnBuildPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('LogOnBuildPlugin', compilation => {
      console.log('webpack构建开始...');
    });
    
    compiler.hooks.done.tap('LogOnBuildPlugin', stats => {
      console.log('构建完成！');
    });
  }
}
```



**webpack和vite的热更新如何去监听文件的变化？**

| 区别 | webpack                                                      | vite                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|      | 通过webpack-dev-server启动开发服务器时，底层使用chokidar库来监听文件系统的变化 | 开发模式下利用浏览器原生ESM能力                              |
|      | 当文件被修改时，chokidar会触发change事件                     | 使用ESBuild进行依赖预构建时，建立文件监听                    |
|      | webpack会重新编译修改的模块及其依赖                          | 对于源码文件变化，Vite服务器通过原生Node.js的fs.watch API监听 |
|      | 编译完成后通过websocket向浏览器发送hash和ok消息              | 当文件变化时，Vite立即转换ESM模块并通过websocket通知浏览器   |
|      | 客户端HMR runtime接收到更新后，通过JSONP请求获取最新的模块代码 | 浏览器接收到HMR事件后，直接请求更新后的ES模块                |
| 总结 | Webpack需要完整的重新编译过程                                | Vite利用浏览器原生ESM，跳过打包，更新单个文件                |



### Cookie 随请求自动携带有什么问题

1. 隐私问题：敏感信息可能会被攻击者窃取，从而导致用户的隐私泄露。
2. CSRF 攻击：跨站请求伪造
3. 带宽消耗：Cookie 随请求自动携带会增加请求的大小，从而增加网络带宽的消耗。
4. 存储限制：自动携带，并且包含大量的数据，可能会超出浏览器的存储限制，从而导致 Cookie 被丢弃或无法正确存储。
5. 兼容性问题：不同的浏览器对 Cookie 的处理方式可能不同。

可以采取以下措施：

1. 加密和签名 Cookie
2. 限制 Cookie 的范围，以减少 CSRF 攻击的风险。
3. 设置 Cookie 的过期时间
4. 优化 Cookie 的大小



### cookie 的 samesite是什么

SameSite 是 Cookie 的一个属性，用于控制 Cookie 在跨站请求时是否会被发送。它主要用于防范 CSRF（跨站请求伪造）攻击，是浏览器安全策略的一部分。

SameSite 有三种可能的取值：

1. `Strict`（严格模式）：
   - 仅当请求来自设置 Cookie 的同一站点时才会发送 Cookie
   - 完全阻止第三方上下文的 Cookie 发送
   - 例如：用户从邮件点击链接访问网站时，不会发送 Strict 模式的 Cookie
2. `Lax`（宽松模式，现代浏览器的默认值）：
   - 允许在顶级导航（如链接点击）时发送 Cookie
   - 阻止跨站的 POST 请求等非安全方法的 Cookie 发送
   - 平衡了安全性和用户体验
3. `None`（无限制）：
   - 允许跨站请求携带 Cookie
   - 必须同时设置 `Secure` 属性（即仅 HTTPS）
   - 主要用于需要跨站功能的场景（如嵌入的第三方内容）



**浏览器缓存机制**

|      | 强缓存                                                       | 协商缓存                                                     | 浏览器缓存                                        | CDN 缓存                  | Service Worker 缓存                     |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------- | ------------------------- | --------------------------------------- |
|      | 最直接缓存机制。浏览器根据缓存头（`Cache-Control` 和 `Expires`）的设置，直接使用本地缓存的数据，而不去向服务器请求数据 | 缓存失效时，仍然尝试向服务器询问是否需要更新缓存的机制。即使缓存数据已过期，浏览器仍会发送请求，询问服务器资源是否发生变化。如果资源没有变化，服务器返回 304 状态码，表示缓存仍然有效，浏览器可以继续使用本地缓存。 | 浏览器根据 `Cache-Control` 等头部信息自动管理缓存 | 缓存静态资源,减轻源站压力 | Service Worker 完全控制资源的缓存和更新 |
|      | 通过 `Cache-Control` 和 `Expires` 头部控制                   | 通过 `Last-Modified` 和 `If-Modified-Since` / `ETag` 和 `If-None-Match` 头部实现 | 用户手动清除浏览器缓存也会失效                    | 优先于浏览器缓存          | 离线访问页面,提升用户体验               |
|      | `Cache-Control: max-age=3600` ：资源在 3600 秒内直接使用缓存 | `Last-Modified` :资源最后修改时间,`If-Modified-Since` 用于向服务器询问资源是否有更新 |                                                   |                           |                                         |
|      | `Expires: Fri, 31 Dec 2024 23:59:59 GMT` ：资源在指定时间之前都可以使用缓存 | `ETag` :资源的唯一标识符,`If-None-Match` 用于向服务器询问资源是否有变化 |                                                   |                           |                                         |



**Etag vs last-modified**

都是缓存验证机制 etag 出现为了解决 last-modified 局限性



为什么出现 etag？

- Last-Modified 只能精确到秒级，对于频繁修改的资源不够精确
- 某些情况下文件内容可能没有变化，但修改时间会更新（比如重新生成）
- 分布式服务器可能时间不同步，导致 Last-Modified 不可靠

优势：

- 更精确：Etag 是基于文件内容生成的哈希值，内容变化才会改变
- 更灵活：可以自定义生成策略（如包含文件大小、inode 等元信息）
- 更可靠：不受服务器时间同步问题影响



- 解决了秒级精度不足的问题
- 解决了内容未变但修改时间变化导致的无效缓存失效
- 解决了分布式系统时间不一致的问题
- 处理 Last-Modified 无法处理的场景（某些特殊文件）



持久连接：在一次TCP连接中可以传输多个HTTP请求和响应，而不需要为每个请求/响应都建立新连接。减少TCP连接建立和关闭的开销，提高网页加载性能。

在HTTP/1.1中默认开启持久连接（通过Connection: keep-alive头部）。WebSocket是一种更高级的持久连接技术，它允许在单个TCP连接上进行全双工通信，适合实时应用场景



**etag底层怎么判断两个文件是否相同？**

内容哈希

对文件内容计算哈希值（如MD5、SHA-1等）只要内容不变，哈希值就相同

文件元数据：

部分实现可能结合文件属性（如inode编号、最后修改时间、大小等）

`Last-Modified` + 文件大小的组合

文件系统的唯一标识符（如inode）



强/弱验证

强ETag（如`"123456"`）：要求字节完全一致

弱ETag（如`W/"123456"`）：允许语义相同但字节不完全相同（如HTTP响应的无关空格差异）



应用：

Nginx默认ETag由文件最后修改时间+文件大小组成

某些CDN可能使用内容哈希，确保分布式节点间一致性



**浏览器的请求并发上限**

1. 现代浏览器（Chrome/Firefox/Edge）对同一域名的HTTP/1.1并发请求限制通常是6-8个
2. 如果使用HTTP/2协议，由于多路复用特性，没有硬性限制
3. 不同浏览器版本有差异
   - Chrome/Firefox: 6个
   - IE11: 13个
   - Edge: 6个
   - Safari: 6个

如果需要突破这个限制，解决：

- 使用域名分片（Domain Sharding）：资源分散到多个子域名下
- 升级到HTTP/2协议
- 对于静态资源可以使用CDN加速



**网络**

**TCP/ip5层模型**

**应用层**：`用户与网络交互的接口`如网页浏览、文件传输、电子邮件、域名解析 、数据格式化、数据加密、数据压缩等。

**传输层**：`端到端`的数据传输服务。它确保数据包按顺序、无差错地传输，并提供流量控制和拥塞控制。传输层有两个主要协议： TCP，UDP

**网络层：**将`数据包`从源主机传输到目标主机

**数据链路层**：在相邻网络节点之间传输数据。它处理物理地址（如MAC地址）

**物理层**：在物理介质上（如双绞线、光纤、无线信号等）传输原始比特流。



DNS域名解析

DNS：Internet 中用于将域名转换为 IP 地址的一个分布式数据库系统



**三握四挥**

第一次握手，客户端向服务器发送一个syn报文段（控制标志位），请求传输数据

第二次握手，服务器收到客户端的请求，返回一个ack表示确认收到，同时发送一个syn请求发送数据

第三次握手，客户端收到服务器的syn返回ack表示确认收到，建立连接

第一次挥手，客户端向服务器发送一个fin报文段，关闭客户端到服务器的发送数据通道，表示我发完了

第二次挥手，服务器收到客户端发来的fin，返回ack表示确认收到

第三次挥手，服务器发送一个fin，关闭服务器到客户端的数据通道，表示我也发完了

第四次挥手，客户端发送ack表示收到fin，连接关闭





**tcp连接 为什么需要三次？**

1. 为什么不能用两次握手?

   . 无法确保可靠连接的建立。

   - 第一次服务器并知道客户端的存在，客户端不知道服务器的存在。
   - 第二次服务器知道客户端的存在,但客户端不知道服务器是否收到自己的请求。

2. 为什么需要三次握手?

   三次握手可以确保TCP连接的可靠建立。

   - 第一次让客户端知道服务器的存在,并告诉服务器建立连接。
   - 第二次让服务器知道客户端的存在,并告诉客户端可以建立连接。
   - 第三次让客户端知道服务器收到了自己的连接请求。

3. 为什么不能用四次握手?

   - 四次挥手也可以实现 TCP 连接的可靠释放,但不必要。
   - 三次挥手就可以完成连接的释放,第四次挥手是多余的。

4. 为什么需要四次挥手?

   - 四次挥手可以确保 TCP 连接的可靠释放。
   - 第一次关闭方告诉被动关闭方要关闭连接。
   - 第二次被动关闭方收到关闭请求,并发送关闭确认。
   - 第三次关闭方知道自己的关闭请求被对方收到。
   - 第四次被动关闭方知道自己的关闭确认被收到。



### tcp怎么保证可靠传输

1. 每个数据包分配一个`序列号`,接收后会发送确认号给对方。
2. 如果指定时间内没有收到确认号,就会`重传数据包`。
3. `滑动窗口`机制来控制发送速率,避免接收方`缓存溢出`。
4. 检测到网络拥塞时,会自动降低发送速率。
5. 接收方会重新计算校验和并与原校验和对比。
6. 三次握手和四次挥手来建立和关闭连接,确保连接的可靠性。



| TCP                                                      | UDP                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| 面向连接的协议,提供可靠的数据传输                        | 无连接的协议,不提供可靠性保证                                |
| 三次握手建立连接                                         | 不需要建立连接,直接发送数据报                                |
|                                                          | 传输速度较快                                                 |
| 头部较大,包含更多控制信息                                | 头部小,开销低                                                |
| 适用于要求高可靠性的应用,如 Web 浏览、文件传输、电子邮件 | 适用于对实时性要求较高,但可靠性要求较低的应用,如视频会议、在线游戏、流媒体 |
| 有流量控制和拥塞控制机制,根据网络状况调整发送速率        | 没有流量控制和拥塞控制机制,发送速率由应用层决定              |



**网络加密算法**

| 对称加密算法                                                 | 非对称加密算法                               | 哈希算法                                                 | 其他算法                                        |
| ------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------- |
| AES（高级加密标准）：目前最常用的对称加密算法，支持128/192/256位密钥 | RSA：基于大数分解，广泛用于HTTPS和数字签名   | SHA-2系列（如SHA-256（密码存储时用））：最常用的哈希算法 | ChaCha20-Poly1305：流加密算法，性能较好         |
| DES（数据加密标准）：较老的算法，56位密钥，安全性较低        | ECC（椭圆曲线加密）：比RSA更高效，安全性更高 | SHA-3：新一代哈希标准                                    | 国密算法（SM2/SM3/SM4）：中国自主设计的加密标准 |
| 3DES（三重DES）：DES的增强版，通过三次加密提高安全性         |                                              | MD5：已不推荐使用，存在安全隐患                          |                                                 |



**HTTP请求方法**

get 获取服务器上的资源

post 提交或者修改服务器上的资源

put跟post差不多，但是put有指向

delete删除服务器上的资源

head获取资源的元信息

options跨域请求

trace追踪请求



|      | get                     | post                                                  |
| ---- | ----------------------- | ----------------------------------------------------- |
| 本质 | 发送了一次http请求      | 先发请求头再发请求体两次请求                          |
| 功能 | 用来获取服务器上的资源  | 用来更新服务器上的资源                                |
| 安全 | get将数据明文在url上    | post请求比get安全性要高，post请求参数被包装到请求头里 |
| 大小 | 受限于浏览器对url的限制 | 没有大小限制                                          |

信号量(Semaphore)

计数器 控制多进程对共享资源的访问 用于实现进程间的互斥和同步

二值信号量（二进制），整型信号量



**JWT (JSON Web Tokens)？**

**Header（头部） Payload（负载）（关于实体和其他数据的声明） Signature（签名）**

相对于以前的 session+cookie 模式有什么优点？

1. **无状态**：JWT 不需要服务器保存任何会话数据
2. **可扩展性**：可以轻松地在多个服务器之间共享
3. **易于使用**： 在客户端（如浏览器）和服务器之间轻松地通过 HTTP 头部传输。



**Http1.1 http 2 http3**

**HTTP/2 和 HTTP/1.1 之间有以下主要区别:**

1. 传输协议:
   - 1、纯文本 2、使用二进制。
2. 多路复用:
   - 1、一个 TCP 连接只能处理一个请求。 2、支持多路复用,一个 TCP 连接上并行处理多个请求。
3. 头部压缩:
   - 1、中不回对头部压缩。2 HPACK 算法对头部进行压缩。

HTTP/3 是基于 QUIC 协议的新一代 HTTP 协议。它相比 HTTP/2 有以下主要改进:

1. 传输协议:
   - 2、 TCP 作为传输层协议,存在一些局限性。3、基于 UDP的QUIC 协议。
2. 连接建立:
   - 2、TCP 的三次握手。 3、基于 QUIC 快速建立连接。
3. 流量控制:
   - 2、依赖于 TCP 流量控制。3、QUIC 实现了更灵活的流量控制。
4. 安全性:
   - 2 依赖于 TLS 提供安全性。3 直接集成到 QUIC 中。



**http vs https**

1. 安全性:

   - **HTTP**: 数据传输是明文的,容易遭受中间人攻击,数据在传输过程中可能被窃取或篡改。
   - **HTTPS**: 数据传输是经过加密的,使用 SSL/TLS 协议对数据进行加密和认证,能够有效防止中间人攻击,提高了数据传输的安全性。

2. 端口:

   - **HTTP**: 80 。
   - **HTTPS**: 443 。

3. 证书:

   - **HTTP**: 不需要证书。
   - **HTTPS**: 由 CA(Certificate Authority)数字证书来验证服务器的身份。

4. 性能:

   - **HTTP**: 无需加密和解密,性能比 HTTPS 更好。

5. 应用场景:

   - **HTTP**: 非敏感数据的传输,如静态网页、图片等。

   - **HTTPS**: 需要保护隐私数据的场景,如电子商务、在线支付、登录验证



**如何解决浏览器跨域问题？**

1. **CORS(跨域资源共享)**：

- 最标准的解决方案，需要后端配合
- 后端在响应头中添加`Access-Control-Allow-Origin`等CORS相关头信息
- 对于简单请求会自动处理，非简单请求会先发送OPTIONS预检请求

2. **代理服务器**：

- 前端开发时常用的解决方案
- 通过webpack-dev-server配置proxy
- 或者使用Nginx反向代理将API请求转发到目标服务器

3. **JSONP**：

- 利用\<script>标签不受同源策略限制的特性\</script>
- 只支持GET请求
- 需要后端配合返回特定格式的JS代码

4. **postMessage**：

- 可用于不同窗口/iframe间的跨域通信
- 需要精确控制消息来源和内容以确保安全

5. **WebSocket**：

- WebSocket协议本身不受同源策略限制
- 适用于需要实时双向通信的场景

主要使用CORS和代理这两种方式。开发环境常用代理解决，生产环境则通过后端配置CORS。



**网络攻击方式**

CSRF、XSS、SQL注入和DDoS是四种常见的网络攻击方式，它们各自有不同的攻击手段和目的。下面简要介绍它们的区别：

1. CSRF（跨站请求伪造）：

- 攻击者利用用户已登录的身份，诱导用户点击恶意链接或访问特定页面
- 在用户不知情的情况下，以用户身份发起非预期的请求（如转账、修改密码等）
- 防御措施：使用CSRF Token、SameSite Cookie属性、验证码Referer等

2. XSS（跨站脚本攻击）：

- 攻击者向网页注入恶意脚本，当其他用户访问时执行
- 主要分为存储型、反射型和DOM型
- 可能导致cookie窃取、页面篡改等
- 防御措施：输入输出编码（如HTML Entity编码）、CSP策略、避免使用innerHTML等

3. SQL注入：

- 通过构造特殊输入，使后端拼接出恶意SQL语句
- 可能导致数据泄露、数据篡改甚至服务器被控制
- 防御措施：参数化查询、ORM框架、输入验证等（虽然主要是后端防护，但前端也应做基础验证）

4. DDoS（分布式拒绝服务攻击）：

- 通过大量请求使服务器资源耗尽，导致正常用户无法访问
- 通常利用僵尸网络发起攻击
- 防御主要在运维层面：流量清洗、CDN、限流等

区别总结：

- 攻击目标：CSRF和XSS针对用户，SQL注入针对数据库，DDoS针对服务器可用性
- 技术手段：CSRF利用身份认证，XSS注入脚本，SQL注入恶意SQL，DDoS靠流量压制
- 防御重点：CSRF防御在前端+后端，XSS主要在前端，SQL注入主要在后端，DDoS主要在基础设施

特别注意XSS和CSRF的防范，确保前端代码的安全性。



**如何防御xss攻击，输入框如何过滤危险字符**？

1. 输入过滤方面：

   - 对用户输入进行严格的转义处理，特别是<、>、&、"、'等特殊字符

   - 使用DOMPurify等第三方库进行HTML净化

   - 对于富文本输入，采用白名单机制，只允许特定的HTML标签和属性

2. 输出防护方面：

   - 根据输出位置使用不同的编码方式：
     - HTML内容使用HTML实体编码
     - HTML属性使用属性编码
     - JavaScript变量使用JS编码
     - URL参数使用URL编码

   - 避免直接使用innerHTML，优先使用textContent

3. 其他防护措施：

   - 设置Content Security Policy(CSP)策略限制脚本执行

   - 对cookie设置HttpOnly属性

   - 使用现代前端框架(如React/Vue)内置的XSS防护机制

对于输入框的危险字符过滤，

1. 使用正则表达式过滤或替换危险字符和脚本标签
2. 对于必须保留的HTML内容(如富文本编辑器)，使用白名单过滤库
3. 在服务端进行二次验证和过滤



### https的证书可以被代理绕过吗

HTTPS证书在正常情况下是无法被代理绕过的，因为HTTPS建立的安全连接依赖于CA颁发的可信证书。但在某些特定情况下可能存在被绕过的可能：

1. 如果客户端主动信任了伪造的CA证书（比如企业内网监控场景下安装的企业自签名证书）
2. 使用中间人攻击(MITM)工具如Fiddler、Charles时，需要用户手动信任这些工具生成的证书
3. 客户端没有正确验证证书（比如早期某些APP没有做证书锁定）

从安全角度来说，正规的HTTPS证书验证流程设计上是不应该被代理绕过的。这也是为什么我们在开发中要：

- 确保服务端使用受信任CA颁发的证书
- 在敏感场景实现证书锁定(Certificate Pinning)
- 避免跳过证书验证的安全警告



### 为什么握手阶段不使用对称加密

1. **密钥交换问题**：如果完全使用对称加密，通信双方需要事先共享同一个密钥。但在首次通信时，双方还没有建立安全通道，无法安全地传输这个密钥。如果直接在网络上传输密钥，攻击者可以截获密钥，从而解密后续所有通信内容。
2. **安全性问题**：对称加密的密钥一旦被泄露，整个通信过程都会被破解。而握手阶段使用非对称加密（如RSA）可以安全地交换对称密钥，即使公钥被截获，没有私钥也无法解密出真正的对称密钥。
3. **性能折中方案**：虽然非对称加密计算量较大，但只在握手阶段使用；后续数据传输阶段切换为对称加密，既保证了密钥交换的安全性，又获得了对称加密的高效性。

（这种设计是TLS/SSL协议的典型做法，先通过非对称加密建立安全通道交换对称密钥，再用对称加密处理大量数据传输）



**为什么使用pnpm不是npm？**

1. **存储效率更高**：

   - pnpm采用硬链接的方式安装依赖包，相同版本的包只会被安装一次，避免了重复下载，显著节省磁盘空间

   - 而npm采用复制方式，每个项目都会完整复制依赖包，导致大量重复存储


2. **安装速度更快**：

   - 由于硬链接机制，pnpm在安装已存在的依赖时几乎不需要下载，安装速度比npm快很多

   - 特别是在多个项目共享依赖的情况下，优势更加明显


3. **更严格的依赖管理**：

   - pnpm使用内容寻址的方式管理包，确保每个包都是唯一的，避免了依赖冲突

   - npm的扁平化依赖结构有时会导致版本冲突问题


4. **设计上的关键区别**：

   - pnpm使用`pnpm-lock.yaml`来锁定依赖版本，保证团队一致性

   - pnpm的node_modules结构更清晰，保持依赖树的原始结构，避免了npm的依赖提升可能带来的问题

   - pnpm默认会创建一个全局存储仓库，所有项目共享这个仓库中的包



**硬链接**

高效的文件系统管理方式，它通过让多个项目共享同一个依赖包的物理存储来实现依赖安装的优化

1. 当多个项目使用同一个依赖包时，pnpm不会像npm/yarn那样在每个项目的node_modules中复制一份完整的包文件，而是在全局存储中保留一份实际文件，然后在各个项目的node_modules中创建指向这个全局文件的硬链接。
2. 硬链接的特点：
   - 所有链接都指向磁盘上的同一物理文件
   - 修改任何一个链接都会影响原始文件
   - 删除一个链接不会影响其他链接，只有当所有链接都被删除时文件才会真正从磁盘删除
3. 优势：
   - 显著减少磁盘空间占用
   - 加快安装速度（不需要重复下载和复制文件）
   - 保持node_modules结构清晰

这种方式相比传统的复制方式更高效，特别是在大型项目或多项目开发环境中优势明显。



### 小程序里面的 this 和前端 web 里面的 this 有什么不同？

  1. 小程序中的 this 和 Web 前端中的 this 主要区别在于上下文环境和作用域规则：小程序里的 this 通常指向当前页面或组件实例，便于访问数据和方法，在 Page 对象的方法或生命周期函数内部（如 onLoad、onShow、onReady 等），this 指向当前的 Page 对象，可以访问页面定义的 data、methods、properties 等。在自定义组件中，this 指向组件实例，可以访问组件的属性、方法等。
  2. Web 前端中的 this 行为更依赖于 JavaScript 的执行上下文，如在对象方法中指向对象，在事件处理器或构造函数中可能指向不同的实体



**merge vs rebase**

1. merge

   - 会创建一个新的合并提交(merge commit)

   - 保留完整的历史记录，包括分支结构

   - 是非破坏性操作，不会修改现有提交历史

   - 适合公共分支(如master/main)的合并

2. rebase

   - 会将当前分支的提交"重放"到目标分支上

   - 会产生线性的提交历史，没有合并提交

   - 会重写提交历史，可能影响协作

   - 适合本地分支整理提交记录

主要区别：

- merge保留分支拓扑结构，rebase创建线性历史
- merge产生合并提交，rebase不产生额外提交
- merge更安全，rebase需要谨慎使用(特别是公共分支)



E2E 测试 端到端

模拟用户与应用程序的交互,验证整个应用程序从开始到结束的流程是否按预期工作



**微前端实现原理**

1. **微前端原理**：
   微前端是一种将前端应用拆分为多个独立子应用的架构模式。核心思想是：

- 将大型前端应用拆分为多个小型、独立的前端应用
- 每个子应用可以独立开发、测试、部署
- 通过主应用(容器应用)来集成各个子应用

2. **应用切换**：

- 基于路由的切换：主应用根据URL路由决定加载哪个子应用
- 基于条件的切换：根据用户权限、设备类型等条件动态加载子应用
- 使用iframe：每个子应用运行在独立的iframe中(简单但隔离性强)

3. **应用通信**：
   子应用间通信的常见方式：

- 使用CustomEvent或window.postMessage进行跨应用通信
- 通过主应用作为中介进行通信
- 使用状态管理库(如Redux)的共享store
- 通过URL参数或localStorage等浏览器存储进行通信



### Server-Sent Events（SSE）

服务器推送技术，允许服务器向浏览器发送事件。

SSE 是一种单向通信机制，意味着数据只能从服务器流向客户端，而客户端不能向服务器发送数据。

SSE 适用于实时更新场景，如实时聊天、股票报价、新闻更新等。

#### 注意事项

- SSE 仅支持文本数据
- SSE 的连接是持久的，但服务器可以随时关闭连接。如果连接关闭，客户端需要重新建立连接。
- SSE 适用于单向数据流

#### SSE 的工作原理

1. **建立连接**：客户端通过 HTTP 请求与服务器建立连接。这个请求的 `Accept` 头包含 `text/event-stream`，表明客户端希望接收事件流。
2. **保持连接**：一旦连接建立，服务器可以开始发送事件。这些事件以纯文本格式发送，每条消息以两个换行符（`\n\n`）分隔。
3. **事件处理**：客户端接收到事件后，会触发一个 `onmessage` 事件处理器，该处理器可以处理接收到的数据。



#### websocket vs sse

1. **通信方向**：

- WebSocket是全双工通信，客户端和服务器可以同时互相发送消息
- SSE是单向通信，只能由服务器向客户端推送消息

2. **协议支持**：

- WebSocket是独立的协议(ws://或wss://)
- SSE基于HTTP协议，使用标准HTTP连接

3. **数据格式**：

- WebSocket可以发送二进制和文本数据
- SSE只能发送文本数据(通常是UTF-8编码)

4. **连接管理**：

- WebSocket连接建立后一直保持
- SSE在HTTP基础上实现，浏览器会自动处理重连

5. **适用场景**：

- WebSocket适合需要双向实时通信的场景(如聊天应用、游戏)
- SSE适合服务器向客户端推送数据的场景(如股票行情、新闻推送)

6. **浏览器兼容性**：

- WebSocket兼容性较好，主流浏览器都支持
- SSE在IE/Edge旧版本中支持有限

7. **实现复杂度**：

- WebSocket需要处理更多底层细节(如心跳检测)
- SSE实现更简单，直接使用EventSource API即可



**SSE （Server-Sent Events）消息体结构**

每条消息由若干字段组成，每个字段以`field: value`的形式出现，并以换行符（`\n`）分隔

1. **`data`**

   - 格式：`data: <message_content>`

   - 作用：承载消息的实际内容。如果内容跨多行，每行需以`data:`开头。

   - 示例：

     ```
     data: This is a message
     data: spanning two lines
     ```

2. **`event`**

   - 格式：`event: <event_type>`

   - 作用：定义消息的事件类型，客户端可通过监听特定事件类型（如`addEventListener('event_type', ...)`）处理消息。

   - 示例：

     ```
     event: update
     data: {"price": 150}
     ```

3. **`id`**

   - 格式：`id: <message_id>`

   - 作用：为消息分配唯一标识符。若连接中断，客户端可通过`Last-Event-ID`头恢复时告知服务器最后接收的消息ID。

   - 示例：

     ```
     id: 12345
     ```

4. **`retry`**

   - 格式：`retry: <milliseconds>`

   - 作用：建议客户端在连接断开后的重试间隔（毫秒）。默认通常为几秒。

   - 示例：

     ```
     retry: 3000
     ```

5. **注释**

   - 以冒号开头的行（`:comment`）会被忽略，常用于心跳保持或调试。

```
event: stock
id: 42
data: {"symbol": "AAPL", "price": 175.20}
retry: 5000
```

- 每条消息以**两个换行符（`\n\n`）**结尾，表示消息结束。
- 字段顺序无关，但需确保每个字段独占一行。
- 若未指定`event`，客户端默认触发`message`事件。



**websocket遇到网络波动等异常情况，有哪些方法解决？**

1. **心跳机制**（首选方案）

   - 实现：通过setInterval定期发送ping/pong帧

   - 原因：能主动检测连接状态，及时发现断连。相比被动等待错误事件更及时，且服务端可设置超时自动断开

2. **自动重连**

   - 实现：监听onclose事件，使用指数退避算法重连

   - 原因：指数退避(如1s,2s,4s...)能避免重连风暴，兼顾快速恢复和服务器压力

3. **消息缓存与确认**

   - 实现：为消息添加唯一ID，未收到ACK时重发

   - 原因：类似TCP可靠性机制，适合订单等关键业务场景

4. **降级方案**

   - 实现：断连时切换为SSE或轮询

   - 原因：保证基础功能可用性，适合对实时性要求不高的场景

选择依据：

1. 心跳机制是基础保障，所有项目都应实现
2. 根据业务重要性决定是否实现消息确认
3. 移动端项目需更侧重重连策略优化
4. 我们实际项目中通过组合心跳+指数退避，使连接稳定性提升60%
