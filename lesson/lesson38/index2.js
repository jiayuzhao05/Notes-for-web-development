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
//网络请求用到useRef
//AbortController如果不用 会造成静态竞争 用户快递切换userId 有一次请求速度慢 第二次请求速度快 可能会先得到第二个数据 再得到第一个数据 第一个数据会把第二个数据覆盖
//useRef vs useState：useRef不会触发重新渲染，useState会触发重新渲染
//数据是用来save，提取，修改的
// inputRef.current 在组件挂载后指向 <input> 的真实 DOM 节点，可直接调用 focus() 等浏览器 API
// 要出现在界面、改了就要重新渲染的值放 useState；只需跨 render 记住、改了也不刷新 UI 的值放 useRef（DOM、计时器、请求计数等）