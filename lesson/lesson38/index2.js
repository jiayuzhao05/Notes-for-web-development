function A() {
  const inputRef = useRef(null);
  const [countState, setCountState] = useState(0);
  const countRef = useRef(0);
  countRef.current++;

  const handleFocus = () => {
    inputRef.current.focus();
    setCountState(countState + 1);
  };

  useEffect(() => {
    const controller = new Abortcontroller();

    async function loadUserId() {
      try {
        const res = await fetch(`api/user/${userID}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {}
    }
    loadUserId();

    return () => {
      controller.abort();
    };
  }, [useId]);

  return (
    <>
      <input ref={inputRef}></input>
      <button onClick={handleFocus}></button>
      <div>{countState}</div>
      <div>{countRef.current}</div>
    </>
  );
}

//useRef vs useLayoutEffect useReducer 自定义hooks
// useRef 在多次渲染中保存同一个可变引用 需要跨渲染/指着某个DOM 改ref.current不会触发重新渲染 用来拿DOM inputRef->focus(); 不刷UI的计数 countRef.current++; 保存定时器，上一次props,请求取消用的标志:和useEffect配合
// useState显示在页面上 变了要重绘 -> countState
// useRef 只记住 改了不用重绘-> DOM,计时器,请求计数
// useLayoutEffect vs useEffect：渲染后跑副作用，可以return清理函数 差别在执行时机和会不会闪一下 useLayoutEffect需要在画到屏幕前做完和布局有关的副作用
// useEffect 和网络 订阅 业务副作用有关
// useReducer 用reducer(state,action)->newState 管理复杂状态 类似于redux里单一更新入口
//  useLayoutEffect会在DOM更新后同步执行副作用
//网络请求用到useRef
//AbortController如果不用 会造成静态竞争 用户快递切换userId 有一次请求速度慢 第二次请求速度快 可能会先得到第二个数据 再得到第一个数据 第一个数据会把第二个数据覆盖
//useRef vs useState：useRef不会触发重新渲染，useState会触发重新渲染
//数据是用来save，提取，修改的
// inputRef.current 在组件挂载后指向 <input> 的真实 DOM 节点，可直接调用 focus() 等浏览器 API
// 要出现在界面、改了就要重新渲染的值放 useState；只需跨 render 记住、改了也不刷新 UI 的值放 useRef（DOM、计时器、请求计数等）
