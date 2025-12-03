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